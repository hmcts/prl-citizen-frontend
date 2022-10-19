import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { getDataShape } from '../util';

import { generateContent, generateFormFields } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Which of the decisions you’re asking the court to resolve relate to',
  bodyHint: 'Select all that apply',
  whoChildLiveWithLabel: 'Decide who the children live with and when',
  childTimeSpentLabel: 'Decide how much time the children spend with each person',
  errors: {
    needsResolution: {
      required: 'Select at least a decision',
    },
  },
};

const cy = {
  title: 'Which of the decisions you’re asking the court to resolve relate to - welsh',
  bodyHint: 'Select all that apply - welsh',
  whoChildLiveWithLabel: 'Decide who the children live with and when - welsh',
  childTimeSpentLabel: 'Decide how much time the children spend with each person - welsh',
  errors: {
    needsResolution: {
      required: 'Select at least a decision  - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('child details > child-matters', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          personalDetails: {
            dateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            isDateOfBirthUnknown: 'Yes',
            approxDateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            sex: 'Male',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'fgfdgfg',
          },
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
    const { errors } = generateFormFields(getDataShape().childMatters);
    languageAssertions(
      'en',
      {
        ...en,
        title: `${en.title} Bob Silly`,
        errors: {
          ...en.errors,
          ...errors.en,
        },
      },
      () => generateContent(commonContent)
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    const { errors } = generateFormFields(getDataShape().childMatters);
    languageAssertions(
      'cy',
      {
        ...cy,
        title: `${cy.title} Bob Silly`,
        errors: {
          ...cy.errors,
          ...errors.cy,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain child matters form fields', () => {
    const { needsResolution } = fields as Record<string, FormFields>;
    const whoChildLiveWith = needsResolution.values[0] as FormInput;
    const childTimeSpent = needsResolution.values[1] as FormInput;

    expect(needsResolution.type).toBe('checkboxes');
    expect((needsResolution.hint as Function)(generatedContent)).toBe(`${en.bodyHint}`);
    (needsResolution.validator as Function)('whoChildLiveWith');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('whoChildLiveWith');

    expect(whoChildLiveWith.name).toBe('needsResolution');
    expect(whoChildLiveWith.value).toBe('whoChildLiveWith');
    expect((whoChildLiveWith.label as Function)(generatedContent)).toBe(en.whoChildLiveWithLabel);

    expect(childTimeSpent.name).toBe('needsResolution');
    expect(childTimeSpent.value).toBe('childTimeSpent');
    expect((childTimeSpent.label as Function)(generatedContent)).toBe(en.childTimeSpentLabel);
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
