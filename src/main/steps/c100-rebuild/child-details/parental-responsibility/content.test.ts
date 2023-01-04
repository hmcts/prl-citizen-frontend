import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { ChildrenDetails, PartyType } from '../../../../app/case/definition';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { getDataShape } from '../../people/util';

import { generateContent, generateFormFields } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Parental responsibility for',
  parentalResponsibility:
    'State everyone who has parental responsibility for [^^^]  and how they have parental responsibility.',
  subTitle: 'State everyone who has parental responsibility for  and how they have parental responsibility.',
  bodyHint: `<p>For example 'child's mother', or 'child's father who was married to the mother when the child was born'.</p>
 <p><a target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">See section E of leaflet CB1 for more information</a></p>`,
  errors: {
    statement: {
      required: 'Enter an answer',
    },
  },
};

const cy = {
  title: 'Cyfrifoldeb rhiant dros',
  parentalResponsibility: 'Datganwch bawb sydd â chyfrifoldeb rhiant a dros bwy, a sut ganddynt gyfrifoldeb rhiant.',
  subTitle: 'Nodwch bawb sydd â chyfrifoldeb rhiant a dros bwy, a sut ganddynt gyfrifoldeb rhiant.',
  bodyHint: `<p>Er enghraifft, ‘mam y plentyn’ neu ‘tad y plentyn oedd wedi priodi â’r fam pan gafodd y plentyn ei (g)eni’.</p>
  <p><a target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">Gweler Adran E o daflen CB1 am ragor o wybodaeth</a></p> `,
  errors: {
    statement: {
      required: 'Rhowch ateb',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('child details > parental responsibility', () => {
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
    const { errors } = generateFormFields(
      (getDataShape(PartyType.CHILDREN) as ChildrenDetails).parentialResponsibility
    );
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
    const { errors } = generateFormFields(
      (getDataShape(PartyType.CHILDREN) as ChildrenDetails).parentialResponsibility
    );
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

  test('should contain parental responsibility form fields', () => {
    const { statement } = fields as Record<string, FormFields>;

    expect(statement.type).toBe('text');
    (statement.validator as Function)('Parental responsibility for Bob Silly');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Parental responsibility for Bob Silly');
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
