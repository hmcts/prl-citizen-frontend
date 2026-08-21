import { Application } from 'express';
import fileUpload from 'express-fileupload';
import { MAX_UPLOAD_BYTES } from '../../app/case/definition';

/**
 * @FileUpload
 * sets up the fileUpload
 */
export class FileUpload {
  public enableFor(app: Application): void {
    app.use(fileUpload({
      limits: { fileSize: MAX_UPLOAD_BYTES }, // 20 MB file size limit
      abortOnLimit: true,
      responseOnLimit: `File size limit of ${MAX_UPLOAD_BYTES} bytes has been reached.`,
    }));
  }
}
