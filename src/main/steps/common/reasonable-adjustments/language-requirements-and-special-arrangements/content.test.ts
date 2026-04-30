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
  content3: 'Dywedwch wrthym os oes arnoch angen:',
  list: [
    {
      content: 'eisiau siarad, darllen neu ysgrifennu yn Gymraeg',
    },
    {
      content: 'angen cyfieithydd mewn iaith ar wahan i Saesneg',
    },
  ],
  content4: 'Anghenion cefnogaeth',
  content5:
    "Dywedwch wrthym os oes gennych chi, neu unrhyw barti arall sy'n rhan o'r achos, gyflwr iechyd neu anabledd sy'n golygu bod arnoch angen cefnogaeth i gymryd rhan yn y gwrandawiad neu i gyfathrebu â'r llys.",
  content6: 'Dywedwch wrthym os oes arnoch angen:',
  supportNeedsList: [
    {
      content: 'cyfryngwr',
    },
    {
      content: 'efnogaeth arbennig',
    },
    {
      content: 'cyfleusterau arbennig',
    },
  ],
  content7: 'Mesurau Arbennig',
  content8:
    'Dywedwch a oes angen i’r llys wneud unrhyw fesurau arbennig ar eich cyfer chi neu i unrhyw blant perthnasol fynychu’r llys.',
  content9: 'Gallwn roi mesurau arbennig mewn lle i’ch cadw chi ar wahân i’r atebydd pan fyddwch yn mynychu’r llys.',
  content10: 'Dewiswch unrhyw un o’r mesurau canlynol yr hoffech wneud cais amdanynt:',
  specialArrangementsList: [
    {
      content: 'ystafell aros ar wahân yn yr adeilad llys',
    },
    {
      content: 'mynedfa ac allanfa ar wahân o adeilad y llys',
    },
    {
      content:
        'cael eich cysgodi gan sgrin breifatrwydd yn ystafell y llys (byddai sgrin preifatrwydd yn golygu na fyddai’r atebydd yn gallu eich gweld tra byddech yn yr ystafell llys).',
    },
    {
      content:
        'ymuno â’r gwrandawiad drwy gyswllt fideo yn hytrach na bod yno wyneb yn wyneb (penderfyniad y barnwr yw p’un a ddylid caniatáu gwrandawiad drwy gyswllt fideo ai peidio).',
    },
  ],
  supportYouNeed: 'Dywedwch wrthym pa gymorth sydd ei angen arnoch',
  supportYouNeedHint:
    "Rhowch gymaint o fanylion â phosibl, gan gynnwys pam fod angen y cymorth. Os ydych eisoes wedi gofyn am gymorth, anfonwyd eich cais i'r llys.",
  errors: {
    ra_languageReqAndSpecialArrangements: {
      required: 'Nodwch pa gymorth rydych ei angen.',
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
