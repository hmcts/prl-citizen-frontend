import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, LanguageLookup } from '../../../../app/form/Form';
import { Validator, atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Who does {{firstName}} {{lastName}} currently live with?',
  liveWithHint: 'Select all that apply',
  errors: {
    liveWith: {
      required: 'You must select at least one person',
    },
  },
};

const cy = {
  title: 'Gyda phwy mae {firstName} {lastName} yn byw ar hyn o bryd?',
  liveWithHint: 'Dewiswch bob un sy’n berthnasol',
  errors: {
    liveWith: {
      required: 'Rhaid i chi ddewis o leiaf un unigolyn',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('child > live with', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Child1-firstName',
          lastName: 'Child1-lastName',
          liveWith: [],
        },
      ],
      appl_allApplicants: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925678',
          applicantFirstName: 'Applicant1-firstName',
          applicantLastName: 'Applicant1-lastName',
        },
      ],
      resp_Respondents: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7945678',
          firstName: 'Respondent1-firstName',
          lastName: 'Respondent1-lastName',
        },
        {
          id: '7483640e-0817-4ddc-b709-6723f7345678',
          firstName: 'Respondent2-firstName',
          lastName: 'Respondent2-lastName',
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          childId: '7483640e-0817-4ddc-b709-6723f7925474',
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
    languageAssertions('en', { ...en, title: 'Who does Child1-firstName Child1-lastName currently live with?' }, () =>
      generateContent(commonContent)
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions(
      'cy',
      { ...cy, title: 'Gyda phwy mae Child1-firstName Child1-lastName yn byw ar hyn o bryd?' },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain personal details form fields', () => {
    const { liveWith } = fields as Record<string, FormFields>;
    const liveWithValues = liveWith.values as FormInput[];

    expect(liveWith.type).toBe('checkboxes');
    expect((liveWith.hint as Function)(generatedContent)).toBe(en.liveWithHint);
    (liveWith.validator as Validator)('');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('');
    expect(liveWithValues).toHaveLength(3);
    expect(liveWithValues[0].label).toBe('Applicant1-firstName Applicant1-lastName');
    expect(liveWithValues[1].label).toBe('Respondent1-firstName Respondent1-lastName');
    expect(liveWithValues[2].label).toBe('Respondent2-firstName Respondent2-lastName');
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
