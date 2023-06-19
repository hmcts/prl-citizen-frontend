/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { AWPApplicationType } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const en = (applicationType?: AWPApplicationType): object => ({
  title: 'Upload your application',
  fillForm: 'You will need to fill in the form',
  uploadIt: 'and upload it when submitting this request.',
  alreadyCompleted: 'Have you already completed the ' + applicationType + ' form?',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_completedForm: {
      required: 'You must select if you have the form ' + applicationType + ' ready to upload',
    },
  },
});

const cy: typeof en = (applicationType?: AWPApplicationType) => ({
  title: 'Upload your application (welsh)',
  fillForm: 'You will need to fill in the form (welsh)',
  uploadIt: 'and upload it when submitting this request. (welsh)',
  alreadyCompleted: 'Have you already completed the ' + applicationType + ' form? (welsh)',
  yes: 'Yes (welsh)',
  no: 'No (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_completedForm: {
      required: 'You must select if you have the form ' + applicationType + ' ready to upload (welsh)',
    },
  },
});

describe('help with fees content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          applicationType: 'C2',
          applicationReason: 'delay-or-cancel-hearing-date',
        },
        session: {
          userCase: {
            id: '1234',
            caseTypeOfApplication: 'FL401',
            caseInvites: [],
            respondents: '',
            respondentsFL401: '',
          },
          user: {
            id: '1234',
          },
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  let fields;
  let enContent;
  let cyContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
    enContent = en(commonContent.additionalData?.req.params.applicationType);
    cyContent = cy(commonContent.additionalData?.req.params.applicationType);
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain help with fees form fields', () => {
    const completedApplicationField = fields.awp_completedForm as FormOptions;

    expect(completedApplicationField.type).toBe('radios');
    expect((completedApplicationField.label as Function)(generatedContent)).toBe(enContent.alreadyCompleted);
    expect((completedApplicationField.values[0].label as Function)(generatedContent)).toBe(enContent.yes);
    expect((completedApplicationField.values[1].label as Function)(generatedContent)).toBe(enContent.no);
    expect(completedApplicationField.validator).toBe(isFieldFilledIn);
  });

  test('should contain continue button', () => {
    expect(form?.onlyContinue?.text(generatePageContent({ language: 'en' }))).toBe(enContent.onlyContinue);
  });

  test('should contain cancel link', () => {
    expect(form?.link?.text(generatePageContent({ language: 'en' }))).toBe(enContent.cancel);
  });
});
