import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'Support you need during the case',
  title: 'Language requirements and special arrangements',
  content1: 'Language requirements',
  content2: 'Think about all communication with the court, as well as what you might need at a hearing.',
  content3: 'Tell us if you:',
  list: [
    {
      content: 'want to speak, read or write in Welsh',
    },
    {
      content: 'need an interpreter in a language that is not English',
    },
  ],
  content4: 'Support needs',
  content5:
    'Tell us if you or any other party involved in the case have a health condition or disability that means you need support to take part in the hearing or communicate with the court.',
  content6: 'Tell us if you need:',
  specialArrangementsList: [
    {
      content: 'a separate waiting room in the court building',
    },
    {
      content: 'a separate entrance and exit from the court building',
    },
    {
      content:
        'to be shielded by a privacy screen in the courtroom (a privacy screen would mean the respondent would not be able to see you while in the courtroom).',
    },
    {
      content:
        'to join the hearing by video link rather than in person (it is the judge’s decision whether to allow a hearing by video link).',
    },
  ],
  supportYouNeed: 'Tell us what support you need',
  supportYouNeedHint: 'Provide as much detail as possible to help us understand what you need.',
  errors: {
    ra_languageReqAndSpecialArrangements: {
      required: 'Enter what support you need.',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy = {
  caption: 'Cymorth y mae arnoch ei angen yn ystod yr achos',
  title: 'Gofynion ieithyddol a threfniadau arbennig',
  content1: 'Gofynion ieithyddol',
  content2: 'Meddyliwch am yr holl ohebiaeth â’r llys, ynghyd â’r hyn y gallwch fod ei angen mewn gwrandawiad.',
  content3: '--welsh-- Tell us if you need:',
  list: [
    {
      content: '--welsh-- want to speak, read or write in Welsh',
    },
    {
      content: '--welsh-- need an interpreter in a language that is not English',
    },
  ],
  content4: '--welsh-- Support needs',
  content5:
    '--welsh-- Tell us if you or any other party involved in the case have a health condition or disability that means you need support to take part in the hearing or communicate with the court.',
  content6: '--welsh-- Tell us if you need:',
  supportNeedsList: [
    {
      content: '--welsh-- an intermediary',
    },
    {
      content: '--welsh-- special assistance',
    },
    {
      content: '--welsh-- special facilities',
    },
  ],
  content7: '--welsh-- Special Measures',
  content8:
    '--welsh-- Please say whether there is a need for the court to make any special measures for you or any relevant children to attend court.',
  content9:
    '--welsh-- Special measures can be put in place to keep you separate from the respondent when you attend court.',
  content10: '--welsh-- Select any of the following measures you would like to request.',
  specialArrangementsList: [
    {
      content: '--welsh-- a separate waiting room in the court building',
    },
    {
      content: '--welsh-- a separate entrance and exit from the court building',
    },
    {
      content:
        '--welsh-- to be shielded by a privacy screen in the courtroom (a privacy screen would mean the respondent would not be able to see you while in the courtroom).',
    },
    {
      content:
        '--welsh-- to join the hearing by video link rather than in person (it is the judge’s decision whether to allow a hearing by video link).',
    },
  ],
  supportYouNeed: 'Dywedwch wrthym pa gymorth sydd ei angen arnoch (dewisol)',
  supportYouNeedHint:
    "Rhowch gymaint o fanylion â phosibl, gan gynnwys pam fod angen y cymorth. Os ydych eisoes wedi gofyn am gymorth, anfonwyd eich cais i'r llys.",
  errors: {
    ra_languageReqAndSpecialArrangements: {
      required: '--welsh-- Enter what support you need.',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('RA > language-requirements-and-special-arrangements > content', () => {
  const commonContent = {
    language: 'en',
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

  test('should contain continue button', () => {
    expect(
      (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain cancel link', () => {
    expect((form?.link?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)).toBe(
      'Cancel'
    );
  });

  test('should contain ra_languageReqAndSpecialArrangements field', () => {
    const raSpecialArrangementsField = fields.ra_languageReqAndSpecialArrangements as FormOptions;
    expect(raSpecialArrangementsField.type).toBe('textarea');
    expect((raSpecialArrangementsField?.label as Function)(generatedContent)).toBe(en.supportYouNeed);
    expect((raSpecialArrangementsField?.hint as Function)(generatedContent)).toBe(en.supportYouNeedHint);

    (raSpecialArrangementsField.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text area');
  });
});
