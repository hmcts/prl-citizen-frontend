import Axios, { AxiosInstance, AxiosResponse } from 'axios';

import { UserRole } from '../../app/case/definition';
import type { UserDetails } from '../controller/AppRequest';

export class DocumentManagementClient {
  client: AxiosInstance;
  constructor(baseURL: string, authToken: string, private readonly user: UserDetails) {
    this.client = Axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        ServiceAuthorization: authToken,
      },
    });
  }

  async get({ url }: { url: string }): Promise<AxiosResponse> {
    return this.client.get(url, {
      responseType: 'arraybuffer',
      headers: { 'user-id': this.user.id, 'user-roles': UserRole.CITIZEN },
    });
  }
}

export interface DocumentManagementFile {
  size: number;
  mimeType: string;
  originalDocumentName: string;
  modifiedOn: string;
  createdOn: string;
  classification: Classification;
  _links: {
    self: {
      href: string;
    };
    binary: {
      href: string;
    };
    thumbnail: {
      href: string;
    };
  };
}

export type UploadedFiles =
  | {
      [fieldname: string]: Express.Multer.File[];
    }
  | Express.Multer.File[];

export enum Classification {
  Private = 'PRIVATE',
  Restricted = 'RESTRICTED',
  Public = 'PUBLIC',
}
