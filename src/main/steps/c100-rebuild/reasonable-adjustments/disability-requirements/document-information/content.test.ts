import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  caption: 'Reasonable adjustments',
  headingTitle: 'I need documents in an alternative format',
  line1:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible',
  select_all_apply: 'Select all that apply to you',
  specifiedColorDocuments: 'Documents in a specified colour',
  easyReadFormatDocuments: 'Documents in Easy Read format',
  easyReadFormatDocumentsHint: 'information written in simple language with pictures',
  brailleDocuments: 'Braille documents',
  largePrintDocuments: 'Documents in large print',
  audioTranslationDocuments: 'Audio translation of documents',
  readOutDocuments: 'Documents read out to me',
  emailInformation: 'Information emailed to me',
  documentHelpOther: 'Other',
  noSupportRequired: 'No, I do not need any support at this time',
  describeWhatNeeded: 'Describe what you need',
  errors: {
    ra_documentInformation: {
      required: 'Select which format you need your documents in',
    },
    ra_specifiedColorDocuments_subfield: {
      required: 'Describe which colour you need your documents in',
    },
    ra_largePrintDocuments_subfield: {
      required: 'Describe which large print you need your documents in',
    },
    ra_documentHelpOther_subfield: {
      required: 'Describe which alternative format you need your documents in',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  caption: 'Reasonable adjustments - welsh',
  headingTitle: 'I need documents in an alternative format - welsh',
  line1:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible - welsh',
  select_all_apply: 'Select all that apply to you - welsh',
  specifiedColorDocuments: 'Documents in a specified colour - welsh',
  easyReadFormatDocuments: 'Documents in Easy Read format - welsh',
  easyReadFormatDocumentsHint: 'information written in simple language with pictures - welsh',
  brailleDocuments: 'Braille documents - welsh',
  largePrintDocuments: 'Documents in large print - welsh',
  audioTranslationDocuments: 'Audio translation of documents - welsh',
  readOutDocuments: 'Documents read out to me - welsh',
  emailInformation: 'Information emailed to me - welsh',
  documentHelpOther: 'Other - welsh',
  noSupportRequired: 'No, I do not need any support at this time - welsh',
  describeWhatNeeded: 'Describe what you need - welsh',
  errors: {
    ra_documentInformation: {
      required: 'Select which format you need your documents in - welsh',
    },
    ra_specifiedColorDocuments_subfield: {
      required: 'Describe which colour you need your documents in - welsh',
    },
    ra_largePrintDocuments_subfield: {
      required: 'Describe which large print you need your documents in - welsh',
    },
    ra_documentHelpOther_subfield: {
      required: 'Describe which alternative format you need your documents in - welsh',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('Disability requirements content', () => {
  const commonContent = { language: 'en' } as CommonContent;
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

  test('should contain documentInformation field', () => {
    const documentInformationField = fields.ra_documentInformation as FormOptions;

    expect(documentInformationField.type).toBe('checkboxes');

    expect((documentInformationField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((documentInformationField.values[0].label as LanguageLookup)(generatedContent)).toBe(
      en.specifiedColorDocuments
    );
    expect((documentInformationField.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.easyReadFormatDocuments
    );
    expect((documentInformationField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.brailleDocuments);
    expect((documentInformationField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.largePrintDocuments);
    expect((documentInformationField.values[4].label as LanguageLookup)(generatedContent)).toBe(
      en.audioTranslationDocuments
    );
    expect((documentInformationField.values[5].label as LanguageLookup)(generatedContent)).toBe(en.readOutDocuments);
    expect((documentInformationField.values[6].label as LanguageLookup)(generatedContent)).toBe(en.emailInformation);
    expect((documentInformationField.values[7].label as LanguageLookup)(generatedContent)).toBe(
      en.documentHelpOther
    );
    expect(documentInformationField.values[9].behaviour).toBe('exclusive');
    expect((documentInformationField.values[9].label as LanguageLookup)(generatedContent)).toBe(en.noSupportRequired);

    expect((documentInformationField.values[1].hint as LanguageLookup)(generatedContent)).toBe(
      en.easyReadFormatDocumentsHint
    );

    (documentInformationField.validator as Function)('specifiedColorDocuments');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('specifiedColorDocuments');

    const specifiedColorDocumentsDetailsField = documentInformationField.values[0].subFields
      ?.ra_specifiedColorDocuments_subfield as FormOptions;
    expect(specifiedColorDocumentsDetailsField.type).toBe('textarea');
    expect((specifiedColorDocumentsDetailsField.label as LanguageLookup)(generatedContent)).toBe(en.describeWhatNeeded);
    (specifiedColorDocumentsDetailsField.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text area');

    const largePrintDocumentsDetailsField = documentInformationField.values[3].subFields
      ?.ra_largePrintDocuments_subfield as FormOptions;
    expect(largePrintDocumentsDetailsField.type).toBe('textarea');
    expect((largePrintDocumentsDetailsField.label as LanguageLookup)(generatedContent)).toBe(en.describeWhatNeeded);
    (largePrintDocumentsDetailsField.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text area');

    const otherDetailsField = documentInformationField.values[7].subFields
      ?.ra_documentHelpOther_subfield as FormOptions;
    expect(otherDetailsField.type).toBe('textarea');
    expect((otherDetailsField.label as LanguageLookup)(generatedContent)).toBe(en.describeWhatNeeded);
    (otherDetailsField.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text area');
  });

  test('should contain continue button', () => {
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
