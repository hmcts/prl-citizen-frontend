/* eslint-disable @typescript-eslint/ban-types */

import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Check your answers',
  caseNumber: 'Case number',
  application: 'application',
  sectionTitles: {},
  typeOfApplication: 'What are you applying for?',
  whichHearing: 'Which hearing are you applying to delay or cancel?',
  doHaveAgreementForRequest: 'Does the other person in the case agree with the date change?',
  isOtherInformed: 'Can the respondent be informed about the application?',
  documentsUpload: 'Document uploaded',
  doHaveSupportingDocuments: 'Do you have supporting documents to upload?',
  isHwfRequired: 'Will you be using help with fees to pay for this application?',
  hwfReferenceNumber: 'Help with fees reference number',
  change: 'Change',
  cancel: 'Cancel',
  continue: 'Submit Application',
  errors: {
    paymentError: {
      title: 'There is a problem',
      content: 'Your application is not submitted. Please try again',
    },
  },
};

const cy = {
  section: 'Check your answers -welsh',
  caseNumber: 'Rhif yr achos ',
  application: 'application -welsh',
  sectionTitles: {},
  typeOfApplication: 'What are you applying for? -welsh',
  whichHearing: 'Which hearing are you applying to delay or cancel? -welsh',
  doHaveAgreementForRequest: 'Does the other person in the case agree with the date change? -welsh',
  isOtherInformed: 'Can the respondent be informed about the application? -welsh',
  documentsUpload: 'Document uploaded -welsh',
  doHaveSupportingDocuments: 'Do you have supporting documents to upload? -welsh',
  isHwfRequired: 'Will you be using help with fees to pay for this application? -welsh',
  hwfReferenceNumber: 'Help with fees reference number -welsh',
  change: 'Change -welsh',
  cancel: 'Cancel -welsh',
  continue: 'Submit Application -welsh',
  errors: {
    paymentError: {
      title: 'Mae yna broblem',
      content: 'Nid yw eich cais wedi’i gyflwyno. Rhowch gynnig arall arni',
    },
  },
};

describe('checkYourAnwers', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
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
      awp_have_hwfReference: YesOrNo.YES,
      awp_need_hwf: YesOrNo.YES,
      awp_hwf_referenceNumber: 'abcd',
      user: {
        id: '1234',
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain continue button', () => {
    expect(form?.submit?.text(generateContent({ ...commonContent, language: 'en' }))).toBe(en.continue);
  });

  test('should contain cancel link', () => {
    expect(form?.link?.text(generatePageContent({ language: 'en' }))).toBe(en.cancel);
    expect(form?.link?.href).toBe('/application-within-proceedings/list-of-applications/1');
  });
});
