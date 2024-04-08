import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { FormError } from '../../../../app/form/Form';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS } from '../../../urls';
import { applyParms } from '../../url-parser';
import { cy, en } from '../common/content';
import { DocumentLabelCategory, DocumentSectionId, UploadDocumentCategory } from '../definitions';
import { uploadDocumentSections } from '../upload/config';

/** Upload documents related utilty */

export const getUploadDocumentCategoryDetails = (
  language: string,
  categoryId: UploadDocumentCategory
): { sectionTitle: string; categoryLabel: string } => {
  const isEn = language === 'en';
  const config = uploadDocumentSections.find(section =>
    section.documentCategoryList.find(category => category.categoryId === categoryId)
  );
  const documentSectionTitles = (isEn ? en : cy).uploadDocuments.documentSectionTitles as Record<
    DocumentSectionId,
    string
  >;
  const documentCategoryLabels = (isEn ? en : cy).uploadDocuments.documentCategoryLabels as Record<
    Partial<DocumentLabelCategory>,
    string
  >;

  return {
    sectionTitle: config ? config.sectionTitle(documentSectionTitles) : '',
    categoryLabel: config
      ? config.documentCategoryList
          .find(category => category.categoryId === categoryId)
          ?.documentCategoryLabel(documentCategoryLabels) ?? ''
      : '',
  };
};

export const deleteDocument = async (req: AppRequest, res: Response): Promise<void> => {
  const { query, session } = req;
  const { user: userDetails, userCase: caseData } = session;
  const partyType = getCasePartyType(caseData, userDetails.id);
  const client = new CosApiClient(userDetails.accessToken, req.locals.logger);
  const uploadedFilesDataReference = getUploadedFilesDataReference(partyType);

  try {
    await client.deleteCitizenStatementDocument(query.documentId as string);

    if (req.session.userCase && req.session.userCase.hasOwnProperty(uploadedFilesDataReference)) {
      req.session.userCase[uploadedFilesDataReference] = caseData?.[uploadedFilesDataReference]?.filter(
        document => query.documentId !== document.document_url.substring(document.document_url.lastIndexOf('/') + 1)
      );

      if (req.session.userCase?.[uploadedFilesDataReference]?.length === 0) {
        delete req.session.userCase[uploadedFilesDataReference];
      }
    }

    req.session.errors = removeUploadDocErrors(req.session.errors);
  } catch (e) {
    req.session.errors = handleError(req.session.errors, 'donwloadError', true);
  } finally {
    req.session.save(() => {
      res.redirect(
        applyParms(UPLOAD_DOCUMENT_UPLOAD_YOUR_DOCUMENTS, {
          partyType,
          docCategory: req.params.docCategory,
        })
      );
    });
  }
};

export const getUploadedFilesDataReference = (partyType: PartyType): string => {
  return partyType === PartyType.APPLICANT ? 'applicantUploadFiles' : 'respondentUploadFiles';
};

export const removeUploadDocErrors = (errors: FormError[] | undefined): FormError[] => {
  return errors?.length ? errors.filter(error => error.propertyName !== 'uploadDocumentFileUpload') : [];
};

export const handleError = (
  errors: FormError[] | undefined,
  errorType: string,
  omitOtherErrors?: boolean
): FormError[] => {
  let _errors: FormError[] = errors?.length ? errors : [];

  if (omitOtherErrors) {
    _errors = [...removeUploadDocErrors(_errors)];
  }

  return [..._errors, { errorType, propertyName: 'uploadDocumentFileUpload' }];
};

export const resetUploadDocumentSessionData = (req: AppRequest): void => {
  delete req.session.userCase.hasCourtAskedForThisDoc;
  delete req.session.userCase.reasonForDocumentCantBeShared;
  delete req.session.userCase.haveReasonForDocNotToBeShared;
  req.session.userCase.reasonsToNotSeeTheDocument = [];
  delete req.session.userCase.reasonsToRestrictDocument;
  req.session.userCase.applicantUploadFiles = [];
  req.session.userCase.respondentUploadFiles = [];
  delete req.session.userCase.declarationCheck;
};
