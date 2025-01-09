/* eslint-disable @typescript-eslint/no-explicit-any */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CaseWithId } from '../../../../app/case/case';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { interpolate } from '../../string-parser';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Staying in a refuge',
  refuge:
    'A refuge is a secure place for people and their children to stay when they are escaping domestic abuse. It provides a space to feel safe and supported.',
  citizensAdvice:
    'Find out more about refuges at <a href="https://www.citizensadvice.org.uk/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Citizen\'s Advice">Citizen\'s Advice (opens in a new tab).</a>',
  refugeLabel: 'Do you currently live in a refuge?',
  C100RefugeLabel: 'Does {firstName} {lastName} currently live in a refuge?',
  one: 'Yes',
  two: 'No',
  you: 'you',
  they: 'they',
  continue: 'Continue',
  errors: {
    isCitizenLivingInRefuge: {
      required: 'Select yes if you currently live in a refuge',
    },
  },
};

const cy = {
  title: 'Aros mewn lloches',
  refuge:
    'Mae lloches yn lle diogel i bobl a’u plant aros pan fyddant yn dianc rhag cam-drin domestig. Mae’n darparu lle i deimlo’n ddiogel a chael cefnogaeth.',
  citizensAdvice:
    'Dysgwch fwy am lochesau yn <a href="https://www.citizensadvice.org.uk/" class="govuk-link" target="_blank" aria-label="Dysgwch fwy am lochesau yn Cyngor ar Bopeth (yn agor mewn tab newydd).">Cyngor ar Bopeth (yn agor mewn tab newydd).</a>',
  refugeLabel: 'Ydych chi’n byw mewn lloches ar hyn o bryd?',
  C100RefugeLabel: 'A yw {firstName} {lastName} yn byw mewn lloches ar hyn o bryd?',
  one: 'Ydw',
  two: 'Nac ydw',
  you: "ydych chi'n",
  they: 'ydynt yn',
  continue: 'Parhau',
  errors: {
    isCitizenLivingInRefuge: {
      required: "Dewiswch ydw os ydych chi'n byw mewn lloches ar hyn o bryd",
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('C8 Refuge > staying in refuge > content', () => {
  const commonContent = {
    language: 'en',
  } as CommonContent;
  const userCase = {
    appl_allApplicants: [
      {
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
        applicantFirstName: 'Test',
        applicantLastName: 'Test',
      },
    ],
  } as unknown as CaseWithId;
  const additionalData = {
    req: {
      originalUrl: '/c100-rebuild/',
      params: {
        root: 'c100-rebuild',
        id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
      },
      session: {
        userCase,
        user: {
          id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
        },
      },
    },
  };
  let generatedContent;
  let form;
  let fields;

  describe('c100-rebuild journey', () => {
    beforeEach(() => {
      generatedContent = generateContent({ ...commonContent, additionalData, userCase });
      form = generatedContent.form as FormContent;
      fields = form.fields as FormFields;
    });

    // eslint-disable-next-line jest/expect-expect
    test('should return correct english content', () => {
      languageAssertions('en', en, () => generatedContent);
    });

    // eslint-disable-next-line jest/expect-expect
    test('should return correct welsh content', () => {
      languageAssertions('cy', cy, () =>
        generateContent({ ...commonContent, additionalData, userCase, language: 'cy' })
      );
    });

    test('should contain continue button', () => {
      expect((form.onlyContinue?.text as Function)(generatedContent)).toBe(en.continue);
    });

    test('should have correct error text for otherPerson', () => {
      const generatedOtherPersonContent = generateContent({
        ...commonContent,
        additionalData: {
          req: {
            originalUrl: '/c100-rebuild/',
            params: {
              root: 'c100-rebuild',
              id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
            },
            session: {
              userCase: {
                oprs_otherPersons: [
                  {
                    id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
                    firstName: 'Test',
                    lastName: 'Test',
                  },
                ],
              },
              user: {
                id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
              },
            },
          },
        },
        userCase: {
          oprs_otherPersons: [
            {
              id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
              firstName: 'Test',
              lastName: 'Test',
            },
          ],
        } as unknown as CaseWithId,
      }) as any;

      expect(generatedOtherPersonContent.errors.isCitizenLivingInRefuge.required).toBe(
        'Select yes if they currently live in a refuge'
      );
    });

    test('should have correct welsh error text for otherPerson', () => {
      const generatedOtherPersonContent = generateContent({
        ...commonContent,
        additionalData: {
          req: {
            originalUrl: '/c100-rebuild/',
            params: {
              root: 'c100-rebuild',
              id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
            },
            session: {
              userCase: {
                oprs_otherPersons: [
                  {
                    id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
                    firstName: 'Test',
                    lastName: 'Test',
                  },
                ],
              },
              user: {
                id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
              },
            },
          },
        },
        userCase: {
          oprs_otherPersons: [
            {
              id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
              firstName: 'Test',
              lastName: 'Test',
            },
          ],
        } as unknown as CaseWithId,
        language: 'cy',
      }) as any;

      expect(generatedOtherPersonContent.errors.isCitizenLivingInRefuge.required).toBe(
        'Dewiswch ydw os ydynt yn byw mewn lloches ar hyn o bryd'
      );
    });

    test('should contain saveAndComeLater button', () => {
      expect(
        (form?.saveAndComeLater?.text as LanguageLookup)(
          generatePageContent({ language: 'en', additionalData, userCase }) as Record<string, never>
        )
      ).toBe('Save and come back later');
    });

    test('should contain correct fields', () => {
      const isCitizenLivingInRefugeField = fields.isCitizenLivingInRefuge as FormOptions;
      expect(isCitizenLivingInRefugeField.type).toBe('radios');
      expect(isCitizenLivingInRefugeField.classes).toBe('govuk-radios');
      expect((isCitizenLivingInRefugeField.label as Function)(generatedContent)).toBe(
        interpolate(en.C100RefugeLabel, { firstName: 'Test', lastName: 'Test' })
      );
      expect((isCitizenLivingInRefugeField.values[0].label as Function)(generatedContent)).toBe(en.one);
      expect(isCitizenLivingInRefugeField.values[0].value).toBe(YesOrNo.YES);
      expect((isCitizenLivingInRefugeField.values[1].label as Function)(generatedContent)).toBe(en.two);
      expect(isCitizenLivingInRefugeField.values[1].value).toBe(YesOrNo.NO);
      (isCitizenLivingInRefugeField.validator as Validator)('test value');
      expect(isCitizenLivingInRefugeField.validator).toBe(isFieldFilledIn);
    });
  });

  describe('applicant/respondent journey', () => {
    const applicantRespondentAdditionalData = {
      req: {
        params: {},
        session: {
          userCase: {},
          user: {
            id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
          },
        },
      },
    };
    beforeEach(() => {
      generatedContent = generateContent({
        ...commonContent,
        additionalData: applicantRespondentAdditionalData,
      });
      form = generatedContent.form as FormContent;
      fields = form.fields as FormFields;
    });

    // eslint-disable-next-line jest/expect-expect
    test('should return correct english content', () => {
      languageAssertions('en', en, () => generatedContent);
    });

    // eslint-disable-next-line jest/expect-expect
    test('should return correct welsh content', () => {
      languageAssertions('cy', cy, () =>
        generateContent({
          ...commonContent,
          additionalData: applicantRespondentAdditionalData,
          userCase: {},
          language: 'cy',
        })
      );
    });

    test('should contain correct fields', () => {
      const isCitizenLivingInRefugeField = fields.isCitizenLivingInRefuge as FormOptions;
      expect(isCitizenLivingInRefugeField.type).toBe('radios');
      expect(isCitizenLivingInRefugeField.classes).toBe('govuk-radios');
      expect((isCitizenLivingInRefugeField.label as Function)(generatedContent)).toBe(en.refugeLabel);
      expect((isCitizenLivingInRefugeField.values[0].label as Function)(generatedContent)).toBe(en.one);
      expect(isCitizenLivingInRefugeField.values[0].value).toBe(YesOrNo.YES);
      expect((isCitizenLivingInRefugeField.values[1].label as Function)(generatedContent)).toBe(en.two);
      expect(isCitizenLivingInRefugeField.values[1].value).toBe(YesOrNo.NO);
      (isCitizenLivingInRefugeField.validator as Validator)('test value');
      expect(isCitizenLivingInRefugeField.validator).toBe(isFieldFilledIn);
    });

    test('should contain continue button', () => {
      expect((form.onlyContinue?.text as Function)(generatedContent)).toBe(en.continue);
    });
  });
});
