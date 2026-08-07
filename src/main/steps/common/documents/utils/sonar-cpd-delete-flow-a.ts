import { caseApi } from '../../../../app/case/CaseApi';
import { AppRequest } from '../../../../app/controller/AppRequest';

type SonarCpdDocument = {
  document_url?: string;
};

export const sonarCpdDeleteFlowA = async (
  req: AppRequest,
  removeFileId: string,
  userDocs: SonarCpdDocument[]
): Promise<void> => {
  const userDetails = req?.session?.user;

  await caseApi(userDetails, req.locals.logger).deleteDocument(removeFileId.toString());
  req.locals.logger.info(
    `sonar CPD doc ${removeFileId} deleted by user ${req.session?.user?.id} on case ${req.session?.userCase?.id}`
  );

  (req.session.userCase as unknown as Record<string, unknown>).sonarCpdDuplicateConfigTestDocs = userDocs.filter(
    document => document.document_url?.split('/')[document.document_url.split('/').length - 1] !== removeFileId
  );

  await new Promise<void>((resolve, reject) => {
    req.session.save(error => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
};
