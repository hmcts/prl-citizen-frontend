import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  caption: 'Safety concerns',
  title: 'What do you want the court to do to keep you and the children safe?',
  paragraph:
    'Describe what you want the court to do to keep you and the children safe. The court may be able to make a protective order.',
  detailsSummary: 'Actions the court can take',
  detailsParagraphs: [
    '<strong>Non-molestation order:</strong> The court may decide to make a non-molestation order. This requires the person served with the order not to be violent, or threaten violence. They must not harass or pester the person who applied for the order in any way. This includes harassing them over messaging apps or social media (Facebook, Twitter and so on).',
    '<strong>Prohibited Steps:</strong> this order prevents a person from taking certain actions without the permission of the court.',
    '<strong>Specific issue:</strong> this order sets out a decision on specific issues, which could include medical treatment, education or a foreign holiday.',
  ],
  errors: {
    PRL_c1A_keepingSafeStatement: {
      required: 'Describe what do you want the court to do to keep you and the children safe',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy = {
  caption: 'Pryderon diogelwch',
  title: "Beth ydych chi eisiau i'r llys ei wneud i'ch cadw chi a'r plant yn ddiogel?",
  paragraph:
    "Disgrifiwch yr hyn rydych chi eisiau i'r llys ei wneud i'ch cadw chi a'r plant yn ddiogel. Mae'n bosib y bydd y llys yn gallu gwneud gorchymyn amddiffyn.",
  detailsSummary: 'Camau y gall y llys eu cymryd',
  detailsParagraphs: [
    "<strong>Gorchymyn rhag molestu: </strong>  Gall y llys benderfynu gwneud gorchymyn rhag molestu. Mae hyn yn ei gwneud yn ofynnol i'r unigolyn a wasanaethwyd â’r gorchymyn hwn i beidio â bod yn dreisgar, neu fygwth rhywun gyda thrais. Ni ddylent aflonyddu na phlagio’r unigolyn a wnaeth gais am y gorchymyn mewn unrhyw ffordd. Mae hyn yn cynnwys aflonyddu ar rywun dros apiau anfon negeseuon neu gyfryngau cymdeithasol (Facebook, Twitter ac yn y blaen).",
    "<strong>Camau Gwaharddedig:</strong> mae'r gorchymyn hwn yn atal unigolyn rhag cymryd camau penodol heb ganiatâd y llys.",
    "<strong>Mater penodol:</strong> mae'r gorchymyn hwn yn nodi penderfyniad ar faterion penodol, a allai gynnwys triniaeth feddygol, addysg neu wyliau tramor.",
  ],
  errors: {
    PRL_c1A_keepingSafeStatement: {
      required: "Disgrifiwch beth ydych chi eisiau i'r llys ei wneud i'ch cadw chi a'r plant yn ddiogel",
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
  },
};
describe('safety-concerns > orders-required > orders-required content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  let generatedContent;
  let form;
  let fields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent) as Record<string, never>;
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

  test('should contain a c1A statement mandatory textarea', () => {
    const keepingSafeStatement = fields.PRL_c1A_keepingSafeStatement as FormOptions;
    expect(keepingSafeStatement.type).toBe('textarea');
  });

  test('should contain Continue button', () => {
    expect(
      (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
