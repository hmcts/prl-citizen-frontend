import { Response } from 'express';

import { LanguagePreference } from '../../../app/case/case';
import { Document } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getDocDownloadLangPrefrence } from '../../../steps/common/common.content';

export class ApplicationDownloadController {
  public async download(req: AppRequest, res: Response): Promise<void> {
    try {
      const applicationInfo =
        getDocDownloadLangPrefrence(req.session.userCase) === LanguagePreference.Welsh
          ? req.session.userCase?.finalWelshDocument || (req.session.userCase?.draftOrderDocWelsh as Document)
          : req.session.userCase?.finalDocument || (req.session.userCase?.draftOrderDoc as Document);
      if (!applicationInfo) {
        throw new Error('Could not download the copy of application');
      }

      const documentUrl = applicationInfo.document_url;
      const documentId = documentUrl.substring(documentUrl.lastIndexOf('/') + 1);

      const generatedDocument = await req.locals.C100Api.downloadDraftApplication(documentId);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=' + applicationInfo.document_filename);
      res.end(generatedDocument);
    } catch (e) {
      throw new Error('Could not download the copy of application');
    }
  }
}
