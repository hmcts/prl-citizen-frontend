//import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { YesOrNo } from '../../../app/case/definition';
import {
  CommonContent,
  // generatePageContent
} from '../../common/common.content';

import { en } from './content';
import { prepareSummaryList } from './utils';

describe('awp> checkAnswer > utils', () => {
  describe('prepareSummaryList', () => {
    const commonContent = {
      language: 'en',
      additionalData: {
        req: {
          params: {
            partyType: 'applicant',
            applicationType: 'C2',
            applicationReason: 'delay-or-cancel-hearing-date',
          },
        },
      },
      userCase: {
        id: '1234',
        caseTypeOfApplication: 'FL401',
        caseInvites: [],
        respondents: '',
        respondentsFL401: '',

        awp_cancelDelayHearing: 'asfd',
        awp_agreementForRequest: YesOrNo.YES,
        awp_informOtherParties: YesOrNo.YES,
        awp_uploadedApplicationForms: [
          {
            id: '544ff7c4-5e3e-4f61-9d47-423321208d77',
            url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/544ff7c4-5e3e-4f61-9d47-423321208d77',
            filename: 'file_example_TIFF_1MB.tiff',
            binaryUrl:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/544ff7c4-5e3e-4f61-9d47-423321208d77/binary',
          },
        ],
        awp_hasSupportingDocuments: YesOrNo.YES,
        awp_supportingDocuments: [
          {
            id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
            url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
            filename: 'file_example_TIFF.tiff',
            binaryUrl:
              'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c/binary',
          },
        ],
        awp_have_hwfReference: YesOrNo.YES,
        awp_need_hwf: YesOrNo.YES,
        awp_hwf_referenceNumber: 'abcd',
        user: {
          id: '1234',
        },
      },
    } as unknown as CommonContent;
    test('Should return correct summary list', async () => {
      expect(prepareSummaryList(en, commonContent)).toStrictEqual({
        rows: [
          {
            actions: {
              items: [
                {
                  href: '/applicant/application-within-proceedings/list-of-applications/1',
                  text: 'Change',
                  visuallyHiddenText: 'What are you applying for?',
                },
              ],
            },
            key: {
              text: 'What are you applying for?',
            },
            value: {
              html: 'C2 application',
            },
          },
          {
            actions: {
              items: [
                {
                  href: '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/select-hearing',
                  text: 'Change',
                  visuallyHiddenText: 'Which hearing are you applying to delay or cancel?',
                },
              ],
            },
            key: {
              text: 'Which hearing are you applying to delay or cancel?',
            },
            value: {
              html: 'asfd',
            },
          },
          {
            actions: {
              items: [
                {
                  href: '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/agreement-for-request',
                  text: 'Change',
                  visuallyHiddenText: 'Does the other person in the case agree with the date change?',
                },
              ],
            },
            key: {
              text: 'Does the other person in the case agree with the date change?',
            },
            value: {
              html: 'Yes',
            },
          },
          {
            actions: {
              items: [
                {
                  href: '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/inform-other-parties',
                  text: 'Change',
                  visuallyHiddenText: 'Can the respondent be informed about the application?',
                },
              ],
            },
            key: {
              text: 'Can the respondent be informed about the application?',
            },
            value: {
              html: 'Yes',
            },
          },
          {
            actions: {
              items: [
                {
                  href: '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/document-upload',
                  text: 'Change',
                  visuallyHiddenText: 'Document uploaded',
                },
              ],
            },
            key: {
              text: 'Document uploaded',
            },
            value: {
              html: '<div class="govuk-form-group"><p><a href="" target="blank">file_example_TIFF_1MB.tiff</a></p></div>',
            },
          },
          {
            actions: {
              items: [
                {
                  href: '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/supporting-documents',
                  text: 'Change',
                  visuallyHiddenText: 'Do you have supporting documents to upload?',
                },
              ],
            },
            key: {
              text: 'Do you have supporting documents to upload?',
            },
            value: {
              html: '<div class="govuk-form-group"><p>Yes</p><hr class="govuk-section-break govuk-section-break--visible"><p><a href="" target="blank">file_example_TIFF.tiff</a></p></div>',
            },
          },
          {
            actions: {
              items: [
                {
                  href: '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees',
                  text: 'Change',
                  visuallyHiddenText: 'Will you be using help with fees to pay for this application?',
                },
              ],
            },
            key: {
              text: 'Will you be using help with fees to pay for this application?',
            },
            value: {
              html: 'Yes',
            },
          },
          {
            actions: {
              items: [
                {
                  href: '/applicant/application-within-proceedings/C2/delay-or-cancel-hearing-date/help-with-fees/reference',
                  text: 'Change',
                  visuallyHiddenText: 'Help with fees reference number',
                },
              ],
            },
            key: {
              text: 'Help with fees reference number',
            },
            value: {
              html: 'abcd',
            },
          },
        ],
        title: '',
      });
    });
  });
});
