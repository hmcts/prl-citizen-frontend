import express, { Application, Request } from 'express';
import request from 'supertest';

import { MAX_UPLOAD_BYTES } from '../../app/case/definition';

import { FileUpload } from '.';

describe('fileupload', () => {
  const uploadFieldName = 'uploadDocumentFileUpload';
  let app: Application;

  beforeEach(() => {
    app = express();
    new FileUpload().enableFor(app);

    app.post('/upload', (req, res) => {
      const uploadedFile = (req as Request & { files?: Record<string, unknown> }).files?.[uploadFieldName];

      if (!uploadedFile) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      return res.status(200).json({ message: 'Upload successful' });
    });
  });

  test('should return 413 when filesize has been exceeded', async () => {
    const response = await request(app)
      .post('/upload')
      .attach(uploadFieldName, Buffer.alloc(MAX_UPLOAD_BYTES + 1), 'too-large.pdf');

    expect(response.status).toBe(413);
    expect(response.text).toBe(`File size limit of ${MAX_UPLOAD_BYTES} bytes has been exceeded.`);
  });

  test('should allow upload when filesize is within the limit', async () => {
    const response = await request(app)
      .post('/upload')
      .attach(uploadFieldName, Buffer.alloc(MAX_UPLOAD_BYTES), 'within-limit.pdf');

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ message: 'Upload successful' });
  });
});
