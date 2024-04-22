import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'Attending a Mediation Information and Assessment Meeting (MIAM)',
  miam: 'A MIAM is a one-off meeting that you must attend by law.',
  whatHappens: 'What happens at a MIAM',
  atMiam: 'At the MIAM, a trained professional known as a mediator will explain:',
  miamList: [
    'how mediation works',
    'the benefits of mediation',
    'whether mediation is right for you',
    'the likely costs of mediation',
    'if you might qualify for help with the costs of mediation and legal advice',
    'other options you could use to help you reach an agreement',
  ],
  findAMediator:
    '<a href="https://www.familymediationcouncil.org.uk/find-local-mediator/" class="govuk-link" target="_blank">Find a local mediator to book a MIAM (opens in a new tab)</a>.',
  whenDontHaveToAttend: 'When you do not have to attend a MIAM',
  dontHaveToAttend:
    'You do not have to attend a MIAM if you have a valid reason (an exemption). For example, you or the children are at risk of harm. Find a list of <a href ="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank">valid reasons for not attending a MIAM (opens in a new tab)</a>.',
  ifExempt: 'If you’re exempt from attending a MIAM, you may have to provide evidence to the court.',
  attendingMiam: 'Attending a MIAM',
  understandLabel: 'I understand that I have to attend a MIAM or provide a valid reason for not attending.',
  errors: {
    miam_consent: {
      required:
        'Confirm that you understand that you have to attend a MIAM or provide a valid reason for not attending',
    },
  },
};

const cy = {
  title: 'Mynychu Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)',
  miam: 'Cyfarfod un-tro y mae’r gyfraith yn datgan bod rhaid i chi fynychu yw MIAM.',
  whatHappens: 'Beth fydd yn digwydd mewn MIAM',
  atMiam: 'Yn y MIAM, bydd gweithiwr proffesiynol hyfforddedig a elwir yn gyfryngwr yn egluro:',
  miamList: [
    'sut mae cyfryngu yn gweithio',
    'manteision cyfryngu',
    'a yw cyfryngu yn iawn i chi',
    'costau tebygol cyfryngu',
    'os byddwch efallai yn gymwys i gael help i dalu costau cyfryngu a chyngor cyfreithiol',
    "opsiynau eraill y gallech eu defnyddio i'ch helpu i ddod i gytundeb",
  ],
  findAMediator:
    '<a href="https://www.familymediationcouncil.org.uk/find-local-mediator/" class="govuk-link" target="_blank">Dod o hyd i gyfryngwr lleol er mwyn trefnu MIAM (yn agor mewn tab newydd)</a>.',
  whenDontHaveToAttend: 'Amgylchiadau pam nad oes rhaid ichi fynychu MIAM',
  dontHaveToAttend:
    'Nid oes rhaid i chi fynychu MIAM os oes gennych reswm dilys (esemptiad). Er enghraifft, rydych chi neu\'r plant mewn perygl o niwed. Gweld rhestr o <a href ="https://apply-to-court-about-child-arrangements.service.justice.gov.uk/about/miam_exemptions" class="govuk-link" target="_blank">resymau dilys dros beidio â mynychu MIAM (yn agor mewn tab newydd)</a>.',
  ifExempt: 'If you’re exempt from attending a MIAM, you may have to provide evidence to the court. (welsh)',
  attendingMiam: 'Mynychu MIAM',
  understandLabel: "Rwy'n deall bod rhaid i mi fynychu MIAM neu ddarparu rheswm dilys dros beidio â mynychu.",
  errors: {
    miam_consent: {
      required:
        'Cadarnhewch eich bod yn deall bod rhaid i chi fynychu MIAM neu ddarparu rheswm dilys dros beidio â mynychu',
    },
  },
};

describe('miam should contain miam info', () => {
  let form;
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain miamConsent field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const miamConsentField = fields.miam_consent as FormOptions;
    expect(miamConsentField.type).toBe('checkboxes');
    expect(miamConsentField.classes).toBe('govuk-checkboxes');
    expect((miamConsentField.label as LanguageLookup)(generatedContent)).toBe(en.attendingMiam);
    expect((miamConsentField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.understandLabel);
    (miamConsentField.validator as Validator)('Yes');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Yes');
  });

  test('should contain Continue and save and comeback later button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
