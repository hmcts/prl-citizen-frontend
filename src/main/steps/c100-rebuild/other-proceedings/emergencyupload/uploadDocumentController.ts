import autobind from 'autobind-decorator';
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import config from 'config';
import { Response } from 'express';
import FormData from 'form-data';
import { isNull } from 'lodash';

// eslint-disable-next-line import/namespace
import { FormFieldsFn, FormFields } from '../../../../app/form/Form';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { AppRequest } from '../../../../app/controller/AppRequest';

@autobind
export default class UploadDocumentController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    
  }

 
}
