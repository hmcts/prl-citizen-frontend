import _ from 'lodash';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseWithId } from '../../../../app/case/case';
import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { getPartyName } from '../../task-list/utils';
import { UploadDocumentAPICategory, UploadDocumentCategory } from '../definitions';
import {
  ResponseHandlers,
  getDocumentCategory,
  getEmptyFileErrorType,
  getUploadedFilesDataReference,
  handleError,
  removeUploadDocErrors,
} from '../upload/utils';

const isConfidentialDoc = (caseData: Partial<CaseWithId>, categoryId: UploadDocumentAPICategory): YesOrNo => {
  if (categoryId === UploadDocumentAPICategory.FM5_DOCUMENT) {
    return YesOrNo.NO;
  }

  return caseData?.haveReasonForDocNotToBeShared === YesOrNo.YES &&
    caseData?.reasonsToNotSeeTheDocument?.includes('hasConfidentailDetails')
    ? YesOrNo.YES
    : YesOrNo.NO;
};

const isRestrictedDoc = (caseData: Partial<CaseWithId>, categoryId: UploadDocumentAPICategory): YesOrNo => {
  if (categoryId === UploadDocumentAPICategory.FM5_DOCUMENT) {
    return YesOrNo.NO;
  }

  return caseData?.haveReasonForDocNotToBeShared === YesOrNo.YES &&
    caseData?.reasonsToNotSeeTheDocument?.includes('containsSentsitiveInformation')
    ? YesOrNo.YES
    : YesOrNo.NO;
};

export const submitDocuments = async (
  req: AppRequest,
  formFields: FormFields | FormFieldsFn,
  handlers: ResponseHandlers
): Promise<void> => {
  const { user, userCase: caseData } = req.session;
  const docCategory = req.params.docCategory as UploadDocumentCategory;
  const fields = typeof formFields === 'function' ? formFields(caseData, req) : formFields;
  const form = new Form(fields);
  const parsedBody = form.getParsedBody(req.body);
  const partyType = getCasePartyType(caseData, user.id);
  const uploadedDocuments = caseData?.[getUploadedFilesDataReference(partyType)] ?? [];
  const allowedFormData = {
    declarationCheck: parsedBody.declarationCheck,
  };
  Object.assign(req.session.userCase, allowedFormData);
  req.session.errors = form.getErrors(allowedFormData);

  if (!uploadedDocuments?.length) {
    req.session.errors = handleError(req.session.errors, getEmptyFileErrorType(docCategory), true);
  }

  if (req.session.errors.length) {
    return handlers.redirect();
  }

  const categoryId = getDocumentCategory(docCategory, partyType);
  const trustedCaseId = req.session.userCase.id;
  console.log(
    'Submitting the following documents:',
    uploadedDocuments.map(d => d.document_filename)
  );
  try {
    const client = new CosApiClient(user.accessToken, req.locals.logger);
    const response = await client.submitUploadedDocuments(user, {
      caseId: trustedCaseId,
      categoryId,
      partyId: user.id,
      partyName: getPartyName(caseData, partyType, user),
      partyType,
      isConfidential: isConfidentialDoc(caseData, categoryId),
      isRestricted: isRestrictedDoc(caseData, categoryId),
      restrictDocumentDetails: _.get(caseData, 'reasonsToRestrictDocument', ''),
      documents: uploadedDocuments,
    });

    if (response.data !== 'Success') {
      req.session.errors = handleError(req.session.errors, 'uploadError', true);
      return;
    }

    req.session.errors = removeUploadDocErrors(req.session.errors);
    delete req.session?.applicationSettings?.isDocumentGeneratedAndUplaoded;
  } catch (error) {
    console.log(error);
    req.session.errors = handleError(req.session.errors, 'uploadError', true);
  } finally {
    handlers.redirect();
  }
};
