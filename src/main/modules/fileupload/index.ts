import { Application } from 'express';
import fileUpload from 'express-fileupload';

/**
 * @FileUpload
 * sets up the fileUpload
 */
export class FileUpload {
  public enableFor(app: Application): void {
    // const DefaultFileUploadSize = config.get<number>('documentManagement.uploadSizeinMB');

    const DefaultFileUploadSize = 30;
    app.use(
      fileUpload({
        limits: { fileSize: 1024 * 1024 * DefaultFileUploadSize },
      })
    );
  }
}
