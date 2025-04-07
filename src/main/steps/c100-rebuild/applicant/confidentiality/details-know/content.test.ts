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
  caption: 'Keeping your contact details private for',
  title: 'Do the other people named in this application (the roogs) know any of your contact details?',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
};

const cy = {
  caption: 'Cadw eich manylion cyswllt yn breifat ar gyfer',
  title: "A yw'r bobl eraill a enwir yn y cais hwn (yr atebwyr) yn gwybod beth yw eich manylion cyswllt?",
  one: 'Ydynt',
  two: 'Nac ydynt',
  three: 'Nid wyf yn gwybod ',
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
          detailsKnown: 'Yes',
          startAlternative: '',
          start: 'Yes',
          contactDetailsPrivate: ['email'],
          contactDetailsPrivateAlternative: [],
        },
        {
          id: 'd8d2d081-115e-49e6-add9-bd8b0e3e851a',
          applicantFirstName: 'Test2',
          applicantLastName: 'Test2',
          detailsKnown: 'Yes',
          startAlternative: '',
          start: 'Yes',
          contactDetailsPrivate: ['email'],
          contactDetailsPrivateAlternative: [],
        },
      ],
    },
    additionalData: {
      req: {
        query: {
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

  test('should contain detailsKnown field', () => {
    const detailsKnownField = fields.detailsKnown as FormOptions;
    expect(detailsKnownField.type).toBe('radios');
    expect(detailsKnownField.classes).toBe('govuk-radios');
    expect((detailsKnownField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.one);
    expect((detailsKnownField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.two);
    expect((detailsKnownField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.three);
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });

  test('should contain submit button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe(commonContent.onlycontinue);
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
            detailsKnown: 'Yes',
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
          detailsKnown: 'No',
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
    expect(generatedContentFields['form'].fields['detailsKnown'].values).toHaveLength(3);
    expect(generatedContentFields['form'].fields['detailsKnown'].values[1].attributes.checked).toBe(true);
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
          detailsKnown: 'Yes',
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
    expect(generatedContentFields['form'].fields['detailsKnown'].values).toHaveLength(3);
    expect(generatedContentFields['form'].fields['detailsKnown'].values[0].attributes.checked).toBe(true);
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
          detailsKnown: 'I dont know',
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
    expect(generatedContentFields['form'].fields['detailsKnown'].values).toHaveLength(3);
    expect(generatedContentFields['form'].fields['detailsKnown'].values[2].attributes.checked).toBe(true);
  });
});
