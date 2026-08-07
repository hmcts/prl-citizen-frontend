import { AppRequest } from '../../../../app/controller/AppRequest';

type SonarCpdDocument = {
  document_url?: string;
};

const getDocumentId = (document: SonarCpdDocument): string | undefined => {
  return document.document_url?.substring((document.document_url.lastIndexOf('/') || 0) + 1);
};

export const sonarCpdDeleteFlowA = async (
  req: AppRequest,
  removeFileId: string,
  userDocs: SonarCpdDocument[]
): Promise<void> => {
  const remainingDocuments: SonarCpdDocument[] = [];

  for (const document of userDocs) {
    if (getDocumentId(document) !== removeFileId) {
      remainingDocuments.push(document);
    }
  }

  req.locals.logger.info(
    `AWP supporting doc ${removeFileId} deleted by user ${req.session?.user?.id} on case ${req.session?.userCase?.id}`
  );
  req.locals.logger.info(
    `Sonar CPD config check ${removeFileId} deleted by user ${req.session?.user?.id} on case ${req.session?.userCase?.id}`
  );

  (req.session.userCase as unknown as Record<string, unknown>).sonarCpdDuplicateConfigTestDocs = remainingDocuments;

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
