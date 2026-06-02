/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable jest/expect-expect */

import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  caption: "Keeping John Doe's contact details private",
  headingTitle: 'Keeping contact details private',
  paragraphOne:
    "The information you give us will be shared with the other people named in this application. This includes John Doe's contact details, unless you ask the court to keep them private.",
  paragraphTwo:
    'You can request this if, for example, you believe sharing these details may lead to unwanted contact or a risk of harm to John Doe or the children.',
  keepContactDetailsPrivate:
    "Do you want to request to keep John Doe's contact details private from the other people named in the application?",
  yes: 'Yes',
  no: 'No',
  whichDetailsPrivate: 'Select which contact details you want to keep private',
  address: 'Address',
  telephoneNumber: 'Telephone number',
  email: 'Email',
  errors: {
    startAlternative: {
      required: "Select yes if you want to keep John Doe's details private, or no if not.",
    },
    contactDetailsPrivateAlternative: {
      required: 'Select which contact details you want to keep private.',
    },
  },
};

const cy = {
  caption: 'Cadw manylion cyswllt John Doe yn breifat',
  headingTitle: 'Cadw manylion cyswllt yn breifat',
  paragraphOne:
    "Bydd yr wybodaeth a roddwch i ni yn cael ei rhannu gyda'r bobl eraill a enwir yn y cais hwn. Mae hyn yn cynnwys manylion cyswllt John Doe, oni bai eich bod yn gofyn i'r llys eu cadw'n breifat.",
  paragraphTwo:
    "Gallwch ofyn am hyn os, er enghraifft, rydych chi'n credu y gallai rhannu'r manylion hyn arwain at gyswllt diangen neu risg o niwed i John Doe neu'r plant.",
  keepContactDetailsPrivate:
    'Ydych chi eisiau gofyn am gadw manylion cyswllt John Doe yn breifat gan y bobl eraill a enwir yn y cais?',
  yes: 'Ydw',
  no: 'Nac ydw',
  whichDetailsPrivate: "Dewiswch pa fanylion cyswllt yr hoffech eu cadw'n breifat",
  address: 'Cyfeiriad',
  telephoneNumber: 'Rhif Ffôn',
  email: 'E-bost',
  errors: {
    startAlternative: {
      required:
        'Dewiswch ydw os ydych eisiau gofyn am gadw manylion John Doe yn breifat, neu nac ydw os nad ydych eisiau gofyn am hyn.',
    },
    contactDetailsPrivateAlternative: {
      required: "Dewiswch pa fanylion cyswllt yr hoffech eu cadw'n breifat.",
    },
  },
};

describe('Keeping Address Private Content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      resp_Respondents: [
        {
          id: '123',
          firstName: 'John',
          lastName: 'Doe',
          isRespondentAddressConfidential: 'Yes',
          isRespondentTelephoneNumberConfidential: 'Yes',
          isRespondentEmailAddressConfidential: 'Yes',
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          respondentId: '123',
        },
      },
    },
  } as unknown as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain correct form fields', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const startAlternativeField = fields.startAlternative as FormOptions;

    expect(startAlternativeField.type).toBe('radios');
    expect(startAlternativeField.classes).toBe('govuk-radios');
    expect((startAlternativeField.label as Function)(generatedContent)).toBe(en.keepContactDetailsPrivate);
    expect((startAlternativeField.values[0].label as Function)(generatedContent)).toBe(en.yes);
    expect((startAlternativeField.values[1].label as Function)(generatedContent)).toBe(en.no);
  });

  test('should handle missing Respondents data for branch coverage without using any', () => {
    const emptyContent = {
      language: 'en',
      userCase: {
        resp_Respondents: [],
      },
      additionalData: {
        req: {
          params: {},
        },
      },
    } as unknown as CommonContent;

    const generatedContent = generateContent(emptyContent) as Record<string, unknown>;

    expect(generatedContent.caption).toBeDefined();

    const form = generatedContent.form as FormContent;
    expect(form.fields).toBeDefined();
  });

  test('should render "Continue" and "Save and come back later" buttons', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.onlyContinue?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Continue');
    expect((form.saveAndComeLater?.text as Function)(generatePageContent({ language: 'en' }))).toBe(
      'Save and come back later'
    );
  });
});
