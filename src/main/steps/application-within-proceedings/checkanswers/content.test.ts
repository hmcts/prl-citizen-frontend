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
  section: 'Gwirio eich atebion',
  caseNumber: 'Rhif yr achos ',
  application: 'Cais',
  sectionTitles: {},
  typeOfApplication: 'Beth ydych chi’n gwneud cais amdano?',
  whichHearing: 'Pa wrandawiad ydych chi’n gwneud cais i’w ohirio neu ei ganslo?',
  doHaveAgreementForRequest: 'A yw’r unigolyn arall yn yr achos yn cytuno i newid y dyddiad?',
  isOtherInformed: 'Can the respondent be informed about the application? -welsh',
  documentsUpload: 'Dogfen wedi’i huwchlwytho',
  doHaveSupportingDocuments: 'A oes gennych chi ddogfennau ategol i’w huwchlwytho?',
  isHwfRequired: 'A fyddwch chi’n defnyddio Help i Dalu Ffioedd i dalu am y cais hwn?',
  hwfReferenceNumber: 'Cyfeirnod Help i Dalu Ffioedd',
  change: 'Newid',
  cancel: 'Canslo',
  continue: 'Cyflwyno’r cais',
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
    expect(form?.link?.href).toBe('/applicant/application-within-proceedings/list-of-applications/1');
  });
});
