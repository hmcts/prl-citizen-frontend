import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { CosApiClient } from '../../../../../app/case/CosApiClient';
import { DocumentUploadResponse } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getCasePartyType } from '../../../../../steps/prl-cases/dashboard/utils';
import { getPartyName } from '../../../task-list/utils';
import { deleteDocument } from '../../common/deleteDocument';
import { submitDocuments } from '../../common/submitDocuments';
import { uploadDocument } from '../../common/uploadDocument';
import { UploadDocumentCategory } from '../../definitions';
import {
  ResponseHandlers,
  getDocumentCategory,
  getEmptyFileErrorType,
  getUploadedFilesDataReference,
  handleError,
  initializeData,
  removeUploadDocErrors,
  setRedirectUrl,
} from '../../upload/utils';

@autobind
export default class UploadDocumentPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  private async generateDocument(req: AppRequest, res: Response): Promise<void> {
    const { params, session, body } = req;
    const { user, userCase: caseData } = session;
    const docCategory = params.docCategory as UploadDocumentCategory;
    const partyType = getCasePartyType(caseData, user.id);
    const redirectUrl = setRedirectUrl(partyType, req);
    const statementText = _.get(body, 'statementText', '') as string;

    req.url = redirectUrl;
    initializeData(caseData);

    if (!statementText) {
      req.session.errors = handleError(req.session.errors, getEmptyFileErrorType(docCategory));
      return this.redirect(req, res, redirectUrl);
    }

    const client = new CosApiClient(user.accessToken, req.locals.logger);
    try {
      const response = await client.generateStatementDocument({
        caseId: caseData.id,
        categoryId: getDocumentCategory(docCategory, partyType),
        partyId: user.id,
        partyName: getPartyName(caseData, partyType, user),
        partyType,
        freeTextStatements: statementText,
      });

      if (this.hasNonSuccessStatus(response)) {
        req.session.errors = handleError(req.session.errors, 'uploadError', true);
        return;
      }
      response.forEach(documentUploadResponseElement => {
        req.session.userCase?.[getUploadedFilesDataReference(partyType)]?.push(documentUploadResponseElement.document);
      });

      req.session.applicationSettings = {
        ...req.session.applicationSettings,
        isDocumentGeneratedAndUplaoded: true,
      };
      req.session.errors = removeUploadDocErrors(req.session.errors);
    } catch (e) {
      console.log(e);
      req.session.errors = handleError(req.session.errors, 'uploadError', true);
    } finally {
      this.redirect(req, res, redirectUrl);
    }
  }

  private hasNonSuccessStatus(response: DocumentUploadResponse[]): boolean {
    return response.some(result => result.status !== 'Success');
  }

  private getResponseHandlers(req: AppRequest<AnyObject>, res: Response): ResponseHandlers {
    return {
      redirect: nextUrl => this.redirect(req, res, nextUrl),
      respondJson: (body, nextUrl) => this.respondJson(req, res, body, nextUrl),
    };
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { onlyContinue: submitDocument, generateDocument, uploadFile, delete: deleteDocumentId } = req.body || {};
    const handlers = this.getResponseHandlers(req, res);

    if (generateDocument) {
      await this.generateDocument(req, res);
    } else if (uploadFile || req.files) {
      await uploadDocument(req, handlers);
    } else if (deleteDocumentId) {
      await deleteDocument(req, handlers, String(deleteDocumentId));
    } else if (submitDocument) {
      await submitDocuments(req, this.fields, handlers);
    }
  }
}
