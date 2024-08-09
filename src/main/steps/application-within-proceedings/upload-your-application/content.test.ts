/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const applicationType = 'C2';

const en = {
  title: 'Upload your application',
  fillForm: `You will need to fill in the form ${applicationType} and upload it when submitting this request.`,
  alreadyCompleted: `Have you already completed the ${applicationType} form?`,
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_completedForm: {
      required: `Select if you have the form ${applicationType} ready to upload`,
    },
  },
};

const cy: typeof en = {
  title: 'Uwchlwytho eich cais',
  fillForm: `Bydd angen i chi lenwi ffurflen ${applicationType} a’i huwchlwytho pan fyddwch yn cyflwyno’r cais hwn.`,
  alreadyCompleted: `Ydych chi wedi llenwi ffurflen ${applicationType} yn barod?`,
  yes: 'Do',
  no: 'Naddo',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_completedForm: {
      required: `Mae’n rhaid i chi ddewis os yw ffurflen ${applicationType} gennych yn barod i’w huwchlwytho`,
    },
  },
};

describe('help with fees content', () => {
  const commonContent = {
    language: 'en',
    additionalData: {
      req: {
        params: {
          partyType: 'applicant',
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

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain help with fees form fields', () => {
    const completedApplicationField = fields.awp_completedForm as FormOptions;

    expect(completedApplicationField.type).toBe('radios');
    expect((completedApplicationField.label as Function)(generatedContent)).toBe(en.alreadyCompleted);
    expect((completedApplicationField.values[0].label as Function)(generatedContent)).toBe(en.yes);
    expect((completedApplicationField.values[1].label as Function)(generatedContent)).toBe(en.no);
    expect(completedApplicationField.validator).toBe(isFieldFilledIn);
  });

  test('should contain continue button', () => {
    expect(form?.onlyContinue?.text(generatePageContent({ language: 'en' }))).toBe(en.onlyContinue);
  });

  test('should contain cancel link', () => {
    expect(form?.link?.text(generatePageContent({ language: 'en' }))).toBe(en.cancel);
    expect(form?.link?.href).toBe('/applicant/application-within-proceedings/list-of-applications/1');
  });
});
