/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-unresolved */
import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { CaseWithId } from '../../../../../app/case/case';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';
import { ANYTYPE } from '../common/index';

import { form as contentForms, generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  headingTitle: 'Staying in a refuge',
  paragraph1:
    'A refuge is a secure place for people and their children to stay when they are escaping domestic abuse. It provides a space to feel safe and supported.',
  paragraph2:
    'Find out more about refuges at <a href=" https://www.citizensadvice.org.uk/family/gender-violence/domestic-violence-and-abuse/#:~:text=Finding%20a%20refuge">Citizen’s Advice (opens in a new tab).</a>',
  title: 'Does ',
  title1: 'currently live in a refuge?',
  one: 'Yes',
  two: 'No',
  errors: {
    stayingInRefuge: {
      required: 'Select yes if the person currently lives in a refuge',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const cy = {
  headingTitle: 'Staying in a refuge -welsh',
  paragraph1:
    'A refuge is a secure place for people and their children to stay when they are escaping domestic abuse. It provides a space to feel safe and supported. -welsh',
  paragraph2:
    'Find out more about refuges at <a href=" https://www.citizensadvice.org.uk/family/gender-violence/domestic-violence-and-abuse/#:~:text=Finding%20a%20refuge">Citizen’s Advice (opens in a new tab).</a> -welsh',
  title: 'Does  -welsh',
  title1: 'currently live in a refuge? -welsh',
  one: 'Yes -welsh',
  two: 'No -welsh',
  errors: {
    stayingInRefuge: {
      required: 'Select yes if the person currently lives in a refuge -welsh',
    },
  },
};

describe('applicant personal details > applying-with > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      appl_allApplicants: [
        {
          id: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
          applicantFirstName: 'Test1',
          applicantLastName: 'Test2',
          stayingInRefuge: 'Yes',
          startAlternative: '',
          start: 'Yes',
          contactDetailsPrivate: ['email'],
          contactDetailsPrivateAlternative: [],
        },
        {
          id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
          applicantFirstName: 'Test2',
          applicantLastName: 'Test2',
          stayingInRefuge: 'Yes',
          startAlternative: '',
          start: 'Yes',
          contactDetailsPrivate: ['email'],
          contactDetailsPrivateAlternative: [],
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          applicantId: '480e8295-4c5b-4b9b-827f-f9be423ec1c5',
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

  test('should contain stayingInRefuge field', () => {
    const stayingInRefugeField = fields.stayingInRefuge as FormOptions;
    expect(stayingInRefugeField.type).toBe('radios');
    expect(stayingInRefugeField.classes).toBe('govuk-radios');
    expect((stayingInRefugeField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((stayingInRefugeField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });

  test('should contain onlyContinue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe(commonContent.onlycontinue);
  });

  test('rendering form fields', () => {
    const additionalData = {
      req: {
        params: {
          applicantId: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
        },
      },
      userCase: {
        appl_allApplicants: [
          {
            id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
            applicantFirstName: 'Test2',
            applicantLastName: 'Test2',
            stayingInRefuge: 'Yes',
            startAlternative: '',
            start: '',
            contactDetailsPrivate: [],
            contactDetailsPrivateAlternative: [],
          },
        ],
      },
    };
    type PageContent = Record<string, unknown>;
    const generatedContentFields: PageContent = generateContent({ ...commonContent, additionalData });
    expect(generatedContentFields.form).not.toBe(0);
  });
  test('testing form content', () => {
    expect(contentForms.saveAndComeLater?.text).not.toBe('come back later');
  });

  test('rendering form fields - NO', () => {
    const additionalData = {
      req: {
        params: {
          applicantId: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
        },
      },
    };
    const userCase = {
      appl_allApplicants: [
        {
          id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
          applicantFirstName: 'Test2',
          applicantLastName: 'Test2',
          stayingInRefuge: 'No',
          startAlternative: '',
          start: '',
          contactDetailsPrivate: [],
          contactDetailsPrivateAlternative: [],
        },
      ],
    } as unknown as CaseWithId;
    const generatedContentFields: ANYTYPE = generateContent({
      ...commonContent,
      additionalData,
      userCase,
    });
    expect(generatedContentFields['form'].fields['stayingInRefuge'].values).toHaveLength(2);
  });

  test('rendering form fields - Yes', () => {
    const additionalData = {
      req: {
        params: {
          applicantId: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
        },
      },
    };
    const userCase = {
      appl_allApplicants: [
        {
          id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
          applicantFirstName: 'Test2',
          applicantLastName: 'Test2',
          stayingInRefuge: 'Yes',
          startAlternative: '',
          start: '',
          contactDetailsPrivate: [],
          contactDetailsPrivateAlternative: [],
        },
      ],
    } as unknown as CaseWithId;
    const generatedContentFields: ANYTYPE = generateContent({
      ...commonContent,
      additionalData,
      userCase,
    });
    expect(generatedContentFields['form'].fields['stayingInRefuge'].values).toHaveLength(2);
  });
  test('rendering form fields - I dont know', () => {
    const additionalData = {
      req: {
        params: {
          applicantId: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
        },
      },
    };
    const userCase = {
      appl_allApplicants: [
        {
          id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
          applicantFirstName: 'Test2',
          applicantLastName: 'Test2',
          stayingInRefuge: 'I dont know',
          startAlternative: '',
          start: '',
          contactDetailsPrivate: [],
          contactDetailsPrivateAlternative: [],
        },
      ],
    } as unknown as CaseWithId;
    const generatedContentFields: ANYTYPE = generateContent({
      ...commonContent,
      additionalData,
      userCase,
    });
    expect(generatedContentFields['form'].fields['stayingInRefuge'].values).toHaveLength(2);
  });
});
