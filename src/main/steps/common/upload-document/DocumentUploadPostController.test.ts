//import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
//import { State } from '../../../app/case/definition';
import { FormContent, 
} from '../../../app/form/Form';

import DocumentUploadPostController from './DocumentUploadPostController';
import { CosApiClient } from '../../../app/case/CosApiClient';
//import { CommonContent } from '../common.content';

jest.mock('axios');
let req, res;

describe('DocumentUploadPostController', () => {
  //const mockedAxios = axios as jest.Mocked<typeof axios>;
  const submitUploadedDocumentsMock = jest.spyOn(CosApiClient.prototype, 'submitUploadedDocuments');
//   const formGetParsedBodyMock = jest.spyOn(Form.prototype, 'getParsedBody');
// const formGetErrorsMock = jest.spyOn(Form.prototype, 'getErrors');
  //const commonContent = { language: 'en', userCase: {} } as CommonContent;
//   let generatedContent;
//   let form;
//   let fields;
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
//     generatedContent = generateContent(commonContent);
//     form = generatedContent.form as FormContent;
//     fields = form.fields as FormFields;
   });

  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('continue is true with uploadedDocuments', async () => {
    req = mockRequest({
      body: {
        onlyContinue: 'true',
        _ctx: '',
        formFields:{

        }
      },
      session: {
        userCase: {
          caseId: '1234',
          applicantUploadFiles:[
            {document_url: "string;",
                document_binary_url: "",
                document_filename: "",
                document_hash: "",
                document_creation_date: "string;"
            }
          ]
        },
      },
    });
    const controller = new DocumentUploadPostController(mockFormContent.fields);
    submitUploadedDocumentsMock.mockResolvedValueOnce({
        response: {
          status: 500,
        },
        config: {
          method: 'POST',}})
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.errors).toStrictEqual([{ errorType: 'Document could not be uploaded', propertyName: 'uploadFiles' }]);
  });
  test('continue is true with api error', async () => {
    req = mockRequest({
      body: {
        onlyContinue: 'true',
        _ctx: '',
        formFields:{

        }
      },
      session: {
        userCase: {
          caseId: '1234',
          applicantUploadFiles:[
            {document_url: "string;",
                document_binary_url: "",
                document_filename: "",
                document_hash: "",
                document_creation_date: "string;"
            }
          ]
        },
      },
    });
    const controller = new DocumentUploadPostController(mockFormContent.fields);
    submitUploadedDocumentsMock.mockRejectedValue
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.errors).toStrictEqual([{ errorType: 'Document could not be uploaded', propertyName: 'uploadFiles' }]);
  });
  test('continue is true with out uploadedDocuments', async () => {
    req = mockRequest({
      body: {
        onlyContinue: 'true',
        _ctx: '',
        formFields:{

        }
      },
      session: {
        userCase: {
          caseId: '1234',
        errors:[]
        }
      },
    });
    const controller = new DocumentUploadPostController(mockFormContent.fields);
    submitUploadedDocumentsMock.mockResolvedValueOnce
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalled();
  });
});