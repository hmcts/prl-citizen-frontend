/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import FormData from 'form-data';
import { isNull } from 'lodash';

import { caseApi } from '../../../app/case/CaseApi';
import { DocumentUploadResponse } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { AnyType, isFileSizeGreaterThanMaxAllowed, isValidFileFormat } from '../../../app/form/validation';
import { applyParms } from '../../../steps/common/url-parser';
import { APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENT_UPLOAD } from '../../../steps/urls';

@autobind
export default class UploadDocumentController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { awp_application_form } = (req?.files as Record<string, any>) ?? {};
    const { applicationType, applicationReason } = req.params;

    const isSupportingDocuments = req.route.path === APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENT_UPLOAD;
    const areFilesUploaded = isSupportingDocuments
      ? (req.session.userCase.awp_supportingDocuments?.length ?? 0) > 0
      : (req.session.userCase.awp_uploadedApplicationForms?.length ?? 0) > 0;

    if (req.body.onlyContinue && areFilesUploaded) {
      super.redirect(req, res);
    } else {
      if (!this.isError(awp_application_form, req, res, isSupportingDocuments)) {
        req.session.errors = [];
        const formData: FormData = new FormData();

        formData.append('file', awp_application_form.data, {
          contentType: awp_application_form.mimetype,
          filename: awp_application_form.name,
        });

        try {
          const userDetails = req?.session?.user;
          const responseBody: DocumentUploadResponse = await caseApi(userDetails, req.locals.logger).uploadDocument(
            formData
          );
          const {
            document_url,
            document_filename,
            document_binary_url,
            document_hash,
            category_id,
            document_creation_date,
          } = responseBody['document'];
          const documentInfo = {
            id: document_url.split('/')[document_url.split('/').length - 1],
            url: document_url,
            filename: document_filename,
            binaryUrl: document_binary_url,
            hash: document_hash,
            categoryId: category_id,
            createdDate: document_creation_date,
          };

          this.addDocsToSession(isSupportingDocuments, req, documentInfo);

          req.session.save(() => {
            res.redirect(applyParms(req.route.path, { applicationType, applicationReason }));
          });
        } catch (error) {
          res.json(error);
        }
      }
    }
  }

  private addDocsToSession(isSupportingDocuments, req, documentInfo) {
    if (isSupportingDocuments) {
      req.session.userCase.awp_supportingDocuments = this.addDocument(
        req.session.userCase.awp_supportingDocuments,
        documentInfo
      );
    } else {
      req.session.userCase.awp_uploadedApplicationForms = this.addDocument(
        req.session.userCase.awp_uploadedApplicationForms,
        documentInfo
      );
    }
  }

  private addDocument = (sessionDocs, document) => {
    if (sessionDocs && sessionDocs.length > 0) {
      sessionDocs.push(document);
    } else {
      sessionDocs = [document];
    }

    return sessionDocs;
  };

  private isError(uploadedDocuments, req, res, isSupportingDocuments) {
    if (isNull(uploadedDocuments) || uploadedDocuments === undefined) {
      this.handleError(req, res, {
        propertyName: isSupportingDocuments ? 'awpUploadSupportingDocuments' : 'awpUploadApplicationForm',
        errorType: 'required',
      });
    } else if (!isValidFileFormat({ documents: uploadedDocuments })) {
      this.handleError(req, res, {
        propertyName: isSupportingDocuments ? 'awpUploadSupportingDocuments' : 'awpUploadApplicationForm',
        errorType: 'fileFormat',
      });
    } else if (isFileSizeGreaterThanMaxAllowed({ documents: uploadedDocuments })) {
      this.handleError(req, res, {
        propertyName: isSupportingDocuments ? 'awpUploadSupportingDocuments' : 'awpUploadApplicationForm',
        errorType: 'fileSize',
      });
    } else {
      return false;
    }
    return true;
  }

  private handleError(
    req: AppRequest<AnyObject>,
    res: Response<AnyType, Record<string, AnyType>>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errObj: any
  ) {
    req.session.errors = [errObj];
    req.session.save(err => {
      if (err) {
        throw err;
      }
      super.redirect(req, res);
    });
  }
}
