import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid, Validator } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title: 'I need documents in an alternative format',
  courtCommunication:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  docsColour: 'Documents in a specified colour',
  docsColourDetails: 'Describe what you need',
  docsReadFormat: 'Documents in an easy read format',
  docsReadFormatHint: 'information written in simple language with pictures',
  brailleDocs: 'Braille documents',
  largePrintDocs: 'Documents in large print',
  largePrintDocsDetails: 'Describe what you need',
  audioTranslation: 'Audio translation of documents',
  docsReadOut: 'Documents read out to me',
  emailInfo: 'Information emailed to me',
  other: 'Other',
  otherDetails: 'Describe what you need',
  noSupport: 'No, I do not need any of this support at this time',
  continue: 'Continue',
  errors: {
    docsSupport: {
      required: 'Please select an answer',
    },
    docsDetails: {
      required: 'Please provide the docs details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    largePrintDetails: {
      required: 'Please provide the large print details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    otherDetails: {
      required: 'Please provide the other details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf angen dogfennau mewn fformat amgen',
  courtCommunication:
    'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad. Ystyriwch wrandawiadau o bell a rhai wyneb yn wyneb, rhag ofn bod y math o wrandawiad o’ch dewis ddim yn bosibl.',
  optionHint: 'Dogfennau mewn lliw penodol',
  summaryText: 'Cysylltiadau am gymorth',
  docsColour: 'Dogfennau mewn lliw penodol',
  docsColourDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  docsReadFormat: 'Dogfennau mewn fformat hawdd i’w darllen',
  docsReadFormatHint: "Gwybodaeth wedi'i hysgrifennu mewn iaith syml â lluniau",
  brailleDocs: 'Dogfennau Braille',
  largePrintDocs: 'Dogfennau mewn print bras',
  largePrintDocsDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  audioTranslation: 'Cyfieithiad sain o ddogfennau',
  docsReadOut: 'Dogfennau yn cael eu darllen yn uchel i mi',
  emailInfo: 'Gwybodaeth yn cael ei hanfon ataf drwy e-bost',
  other: 'Arall',
  otherDetails: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  noSupport: 'Nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Parhau',
  errors: {
    docsSupport: {
      required: 'Please select an answer',
    },
    docsDetails: {
      required: 'Rhowch fanylion y dogfennau',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
    largePrintDetails: {
      required: 'Rhowch fanylion y print bras',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
    otherDetails: {
      required: 'Rhowch fanylion y print bras',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
  },
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('I need documents in an alternative format');
    expect(generatedContent.section).toEqual('Reasonable adjustments');
    expect(generatedContent.courtCommunication).toEqual(
      'Think about all communications with the court, as well as what you might need at a hearing. Consider remote and in-person hearings, in case your preferred hearing type is not possible.'
    );
    expect(generatedContent.optionHint).toEqual('Select all that apply to you');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.docsColour).toEqual('Documents in a specified colour');
    expect(generatedContent.docsReadFormat).toEqual('Documents in an easy read format');
    expect(generatedContent.brailleDocs).toEqual('Braille documents');
    expect(generatedContent.largePrintDocs).toEqual('Documents in large print');
    expect(generatedContent.audioTranslation).toEqual('Audio translation of documents');
    expect(generatedContent.docsReadOut).toEqual('Documents read out to me');
    expect(generatedContent.emailInfo).toEqual('Information emailed to me');
    expect(generatedContent.other).toEqual('Other');
    expect(generatedContent.noSupport).toEqual('No, I do not need any of this support at this time');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain docsSupport field', () => {
    const docsSupportField = fields.docsSupport as FormOptions;
    expect(docsSupportField.type).toBe('checkboxes');
    expect((docsSupportField.hint as Function)(generatedContent)).toBe(en.optionHint);
    expect((docsSupportField.section as Function)(generatedContent)).toBe(en.section);
    expect((docsSupportField.values[0].label as Function)(generatedContent)).toBe(en.docsColour);
    expect((docsSupportField.values[0].subFields?.docsDetails.label as Function)(generatedContent)).toBe(
      en.docsColourDetails
    );

    (docsSupportField.values[0].subFields?.docsDetails.validator as Validator)('docsDetails');
    expect(isFieldFilledIn).toHaveBeenCalledWith('docsDetails');
    expect(isTextAreaValid).toHaveBeenCalledWith('docsDetails');

    expect((docsSupportField.values[1].label as Function)(generatedContent)).toBe(en.docsReadFormat);
    expect((docsSupportField.values[1].hint as Function)(generatedContent)).toBe(en.docsReadFormatHint);
    expect((docsSupportField.values[2].label as Function)(generatedContent)).toBe(en.brailleDocs);
    expect((docsSupportField.values[3].label as Function)(generatedContent)).toBe(en.largePrintDocs);
    expect((docsSupportField.values[3].subFields?.largePrintDetails.label as Function)(generatedContent)).toBe(
      en.largePrintDocsDetails
    );

    (docsSupportField.values[3].subFields?.largePrintDetails.validator as Validator)('largePrintDetails');
    expect(isFieldFilledIn).toHaveBeenCalledWith('largePrintDetails');
    expect(isTextAreaValid).toHaveBeenCalledWith('largePrintDetails');

    expect((docsSupportField.values[4].label as Function)(generatedContent)).toBe(en.audioTranslation);
    expect((docsSupportField.values[5].label as Function)(generatedContent)).toBe(en.docsReadOut);
    expect((docsSupportField.values[6].label as Function)(generatedContent)).toBe(en.emailInfo);
    expect((docsSupportField.values[7].label as Function)(generatedContent)).toBe(en.other);
    expect((docsSupportField.values[7].subFields?.otherDetails.label as Function)(generatedContent)).toBe(
      en.otherDetails
    );

    (docsSupportField.values[7].subFields?.otherDetails.validator as Validator)('otherDetails');
    expect(isFieldFilledIn).toHaveBeenCalledWith('otherDetails');
    expect(isTextAreaValid).toHaveBeenCalledWith('otherDetails');

    expect((docsSupportField.values[9].label as Function)(generatedContent)).toBe(en.noSupport);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
