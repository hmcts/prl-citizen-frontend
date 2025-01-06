import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common.content';

import { generateContent } from './content';

const en = {
  caption: 'Support you need during the case',
  title: 'Language requirements and special arrangements',
  content1: 'Language requirements',
  content2: 'Think about all communication with the court, as well as what you might need at a hearing.',
  content3: 'For example, tell us if you need:',
  list: [
    {
      content: 'to speak, read or write in Welsh',
    },
    {
      content: 'an interpreter in a language that is not English',
    },
  ],
  content4: 'Special arrangements',
  content5:
    'You may need special arrangements to feel safe at court. Some of these arrangements will need to be agreed by the judge or HMCTS staff. If your needs change, you can tell the court before your hearing date.',
  content6: 'Tell us if you need:',
  specialArrangementsList: [
    {
      content: 'separate entrances and exits',
    },
    {
      content: 'separate toilets',
    },
    {
      content: 'a separate waiting room',
    },
    {
      content: 'a visit to the court before the hearing',
    },
    {
      content: 'screens so you and the other people in the case cannot see each other',
    },
    {
      content: 'a hearing by phone or video',
    },
    {
      content: 'anything else to help make you feel safe during the hearing',
    },
  ],
  supportYouNeed: 'Tell us what support you need (optional)',
  supportYouNeedHint:
    'Provide as much detail as possible, including why the support is needed. If you have already asked for support, your request has been sent to the court.',
  errors: {
    ra_languageReqAndSpecialArrangements: {
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
  content3: 'Er enghraifft, dywedwch wrthym os oes arnoch angen:',
  list: [
    {
      content: 'siarad, darllen neu ysgrifennu yn Gymraeg',
    },
    {
      content: 'cyfieithydd mewn iaith ar wahan i Saesneg',
    },
  ],
  content4: 'Trefniadau arbennig',
  content5:
    "Efallai y bydd angen trefniadau arbennig arnoch i deimlo'n ddiogel yn y llys. Rhaid i rai o’r addasiadau hyn gael eu cytuno gan y barnwr neu staff GLlTEF. Os bydd eich anghenion yn newid, gallwch ddweud wrth y llys cyn dyddiad eich gwrandawiad.",
  content6: 'Dywedwch wrthym os oes arnoch angen:',
  specialArrangementsList: [
    {
      content: "drysau ar wahân i fynd i mewn ac allan o'r llys",
    },
    {
      content: 'toiledau ar wahân',
    },
    {
      content: 'ystafell aros ar wahân',
    },
    {
      content: "ymweld â'r llys cyn y gwrandawiad",
    },
    {
      content: 'sgriniau i atal chi a’r bobl eraill yn yr achos rhag gweld eich gilydd',
    },
    {
      content: 'gwrandawiad dros y ffôn neu drwy fideo',
    },
    {
      content: "unrhyw beth arall i'ch helpu i deimlo'n ddiogel yn ystod y gwrandawiad",
    },
  ],
  supportYouNeed: 'Dywedwch wrthym pa gymorth sydd ei angen arnoch (dewisol)',
  supportYouNeedHint:
    "Rhowch gymaint o fanylion â phosibl, gan gynnwys pam fod angen y cymorth. Os ydych eisoes wedi gofyn am gymorth, anfonwyd eich cais i'r llys.",
  errors: {
    ra_languageReqAndSpecialArrangements: {
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
    expect(raSpecialArrangementsField.validator).toBe(isTextAreaValid);
  });
});
