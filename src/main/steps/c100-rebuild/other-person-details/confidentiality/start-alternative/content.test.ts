/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable jest/expect-expect */

import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';
import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  caption: "Keeping John Doe's address private",
  headingTitle: 'Keeping address private',
  paragraph1:
    'The information you give us will be shared with the other people named in this application. This includes John Doe’s address, unless you ask the court to keep this private.',
  paragraph2:
    'You can request this if, for example, you believe that sharing this information may lead to unwanted contact or a risk of harm to John Doe or the children.',
  keepDetailsPrivate:
    'Do you want to request to keep John Doe’s address private from the other people named in this application?',
  one: 'Yes',
  two: 'No',
  errors: {
    confidentiality: {
      required: 'Select yes if you want to keep John Doe address private',
    },
  },
};

const cy = {
  caption: 'Cadw cyfeiriad John Doe yn breifat',
  headingTitle: 'Cadw cyfeiriad yn breifat',
  paragraph1:
    "Bydd yr wybodaeth a roddwch i ni yn cael ei rhannu gyda'r bobl eraill a enwir yn y cais hwn.  Mae hyn yn cynnwys cyfeiriad John Doe, oni bai eich bod yn gofyn i'r llys gadw hyn yn breifat. ",
  paragraph2:
    "Gallwch ofyn am hyn os, er enghraifft, rydych chi'n credu y gallai rhannu'r wybodaeth hon arwain at gyswllt diangen neu risg o niwed i John Doe neu'r plant",
  keepDetailsPrivate:
    'Ydych chi am ofyn am gadw cyfeiriad John Doe yn breifat oddi wrth y bobl eraill a enwir yn y cais hwn?',
  one: 'Ydw',
  two: 'Nac ydw',
  errors: {
    confidentiality: {
      required: 'Dewiswch ydw os ydych eisiau cadw eich manylion yn gyfrinachol',
    },
  },
};

describe('Keeping Address Private Content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      oprs_otherPersons: [
        {
          id: '123',
          firstName: 'John',
          lastName: 'Doe',
          isOtherPersonAddressConfidential: 'Yes',
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          otherPersonId: '123',
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

  test('should contain confidentiality form fields', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const confidentialityField = fields.confidentiality as FormOptions;

    expect(confidentialityField.type).toBe('radios');
    expect(confidentialityField.classes).toBe('govuk-radios');
    expect((confidentialityField.label as Function)(generatedContent)).toBe(en.keepDetailsPrivate);
    expect((confidentialityField.values[0].label as Function)(generatedContent)).toBe(en.one);
    expect((confidentialityField.values[1].label as Function)(generatedContent)).toBe(en.two);
  });

  test('should correctly set the selected value based on userCase', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const confidentialityField = fields.confidentiality as FormOptions;

    expect(confidentialityField.values[0].selected).toBe(true);
    expect(confidentialityField.values[1].selected).toBe(false);
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
