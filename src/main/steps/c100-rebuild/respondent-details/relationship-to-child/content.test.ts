import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { RelationshipType } from '../../../../app/case/definition';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { getDataShape } from '../util';

import { generateContent, generateFormFields } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'What is ',
  title1: "'s relationship to ",
  mother: 'Mother',
  father: 'Father',
  guardian: 'Guardian',
  specialGuardian: 'Special Guardian',
  grandparent: 'Grandparent',
  other: 'Other',
  otherRelationshipDetails: 'Please specify',
  guardianHintText:
    'Someone who represents the rights of a child, may be appointed by a parent, special guardian or the court',
  specialGuardianHintText: 'Someone who represents the rights of a child, appointed by the court',

  errors: {
    relationshipType: {
      required: 'Enter the relationship',
    },
    otherRelationshipTypeDetails: {
      required: 'Enter the relationship',
    },
  },
};

const cy = {
  title: 'What is  - welsh',
  title1: "'s relationship to - welsh",
  mother: 'Mother - welsh',
  father: 'Father - welsh',
  guardian: 'Guardian - welsh',
  specialGuardian: 'Special Guardian - welsh',
  grandparent: 'Grandparent - welsh',
  other: 'They identify in another way - welsh',
  otherRelationshipDetails: 'Please specify - welsh',
  guardianHintText:
    'Someone who represents the rights of a child, may be appointed by a parent, special guardian or the court - welsh',
  specialGuardianHintText: 'Someone who represents the rights of a child, appointed by the court - welsh',
  errors: {
    relationshipType: {
      required: 'Enter the relationship - welsh',
    },
    otherRelationshipTypeDetails: {
      required: 'Enter the relationship - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('respondent details > relationshipDetails details', () => {
  const commonContent = {
    language: 'en',
    dateFormat: {
      day: 'Day',
      month: 'Month',
      year: 'Year',
    },
    userCase: {
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Bob',
          lastName: 'Silly',
          personalDetails: {
            dateOfBirth: {
              year: '1987',
              month: '12',
              day: '12',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              year: '',
              month: '',
              day: '',
            },
            gender: 'Male',
          },
          childMatters: {
            needsResolution: [],
          },
          parentialResponsibility: {
            statement: 'fgfdgfg',
          },
        },
      ],
      resp_Respondents: [
        {
          id: '2732dd53-2e6c-46f9-88cd-08230e735b08',
          firstName: 'Amy',
          lastName: 'Root',
          personalDetails: {
            dateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: '',
            otherGenderDetails: '',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                relationshipType: 'Mother',
                childId: '20bda557-4d03-49c1-a3a4-a313431dc96d',
                otherRelationshipTypeDetails: '',
              },
              {
                childId: 'eb609a11-a5f0-4cee-85ce-5670b58ca767',
                relationshipType: 'Father',
                otherRelationshipTypeDetails: '',
              },
              {
                childId: '00e40672-de9f-4361-8b83-f5104d9aa11a',
                relationshipType: 'Guardian',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          childId: '7483640e-0817-4ddc-b709-6723f7925474',
          respondentId: '2732dd53-2e6c-46f9-88cd-08230e735b08',
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
    const { errors } = generateFormFields(getDataShape().relationshipDetails.relationshipToChildren[0]);
    languageAssertions(
      'en',
      {
        ...en,
        title: `${en.title} Amy Root${en.title1} Bob Silly`,
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
    const { errors } = generateFormFields(getDataShape().relationshipDetails.relationshipToChildren[0]);
    languageAssertions(
      'cy',
      {
        ...cy,
        title: `${cy.title} Amy Root${cy.title1} Bob Silly`,
        errors: {
          ...cy.errors,
          ...errors.cy,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain relationshipDetails details form fields', () => {
    const { relationshipType } = fields as Record<string, FormFields>;

    expect(relationshipType.type).toBe('radios');
    expect(relationshipType.classes).toBe('govuk-radios');

    expect(relationshipType.type).toBe('radios');
    expect(relationshipType.classes).toBe('govuk-radios');
    expect((relationshipType.values[0].label as Function)(generatedContent)).toBe(en.mother);
    expect(relationshipType.values[0].value).toBe(RelationshipType.MOTHER);
    expect((relationshipType.values[1].label as Function)(generatedContent)).toBe(en.father);
    expect(relationshipType.values[1].value).toBe(RelationshipType.FATHER);
    expect((relationshipType.values[2].label as Function)(generatedContent)).toBe(en.guardian);
    expect(relationshipType.values[2].value).toBe(RelationshipType.GUARDIAN);
    expect((relationshipType.values[3].label as Function)(generatedContent)).toBe(en.specialGuardian);
    expect(relationshipType.values[3].value).toBe(RelationshipType.SPECIAL_GUARDIAN);
    expect((relationshipType.values[4].label as Function)(generatedContent)).toBe(en.grandparent);
    expect(relationshipType.values[4].value).toBe(RelationshipType.GRAND_PARENT);

    expect((relationshipType.values[5].label as Function)(generatedContent)).toBe(en.other);
    expect(relationshipType.values[5].value).toBe(RelationshipType.OTHER);
    expect(relationshipType.values[5].subFields.otherRelationshipTypeDetails.type).toBe('text');
    expect(
      (relationshipType.values[5].subFields.otherRelationshipTypeDetails.label as Function)(generatedContent)
    ).toBe(en.otherRelationshipDetails);
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
