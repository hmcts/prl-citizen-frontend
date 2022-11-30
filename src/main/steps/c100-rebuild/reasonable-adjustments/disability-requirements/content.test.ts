import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  caption: 'Reasonable adjustments',
  headingTitle:
    'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
  line1:
    'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change.',
  select_all_apply: 'Select all that apply to you - specific requirements can be given next',
  documentsHelp: 'I need documents in an alternative format',
  documentsHelpHint: 'for example, braille or different colours and text sizes',
  communicationHelp: 'I need help communicating and understanding',
  communicationHelpHint: 'for example, hearing, speaking or interpretation',
  extraSupport: 'I need to bring support with me to a hearing',
  extraSupportHint: 'for example, someone you know or an assistance dog',
  feelComfortableSupport: 'I need something to feel comfortable during a hearing',
  feelComfortableSupportHint: 'for example, extra breaks or extra space',
  helpTravellingMovingBuildingSupport: 'I need help travelling to, or moving around court buildings',
  helpTravellingMovingBuildingSupportHint:
    'for example, access and mobility support if a hearing takes place in person',
  noSupportRequired: 'No, I do not need any support at this time',
  errors: {
    ra_disabilityRequirements: {
      required:
        'Select whether or not you have a physical, mental or learning disability or health condition that means you need support during your case',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  caption: 'Addasiadau rhesymol',
  headingTitle:
    'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
  line1:
    'Gwyddom fod rhai pobl angen cymorth i gael mynediad at wybodaeth ac i ddefnyddio ein gwasanaethau. Gelwir hyn yn aml yn addasiad rhesymol. Rhaid i rai addasiadau rhesymol gael eu cytuno gan farnwr neu GLlTEF. Gallwch drafod gyda’r llys os bydd eich anghenion yn newid.',
  select_all_apply: 'Dewiswch bob un sy’n berthnasol - gellir nodi gofynion penodol nesaf',
  documentsHelp: 'Rwyf angen dogfennau mewn fformat arall',
  documentsHelpHint: 'er enghraifft, Braille neu wahanol liwiau a maint testun ',
  communicationHelp: 'Rwyf angen cymorth gyda chyfathrebu a deall pethau',
  communicationHelpHint: 'er enghraifft, gwrando, siarad neu gymorth gan gyfieithydd/dehonglydd',
  extraSupport: 'Rwyf angen dod â rhywun efo fi i fy nghefnogi mewn gwrandawiad',
  extraSupportHint: "er enghraifft, rhywun rydych chi'n ei adnabod neu gi cymorth",
  feelComfortableSupport: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad',
  feelComfortableSupportHint: 'er enghraifft, seibiannau ychwanegol neu mwy o le',
  helpTravellingMovingBuildingSupport: 'Rwyf angen cymorth i deithio i, neu symud o gwmpas adeiladau’r llys',
  helpTravellingMovingBuildingSupportHint:
    'er enghraifft, cymorth gyda mynediad a symudedd os bydd gwrandawiad yn cael ei gynnal wyneb yn wyneb',
  noSupportRequired: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  errors: {
    ra_disabilityRequirements: {
      required:
        'Select whether or not you have a physical, mental or learning disability or health condition that means you need support during your case - welsh',
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

  test('should contain disabilityRequirements field', () => {
    const disabilityRequirementsField = fields.ra_disabilityRequirements as FormOptions;

    expect(disabilityRequirementsField.type).toBe('checkboxes');

    expect((disabilityRequirementsField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((disabilityRequirementsField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.documentsHelp);
    expect((disabilityRequirementsField.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.communicationHelp
    );
    expect((disabilityRequirementsField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.extraSupport);
    expect((disabilityRequirementsField.values[3].label as LanguageLookup)(generatedContent)).toBe(
      en.feelComfortableSupport
    );
    expect((disabilityRequirementsField.values[4].label as LanguageLookup)(generatedContent)).toBe(
      en.helpTravellingMovingBuildingSupport
    );
    expect(disabilityRequirementsField.values[6].behaviour).toBe('exclusive');
    expect((disabilityRequirementsField.values[6].label as LanguageLookup)(generatedContent)).toBe(
      en.noSupportRequired
    );

    expect((disabilityRequirementsField.values[0].hint as LanguageLookup)(generatedContent)).toBe(en.documentsHelpHint);

    expect((disabilityRequirementsField.values[1].hint as LanguageLookup)(generatedContent)).toBe(
      en.communicationHelpHint
    );
    expect((disabilityRequirementsField.values[2].hint as LanguageLookup)(generatedContent)).toBe(en.extraSupportHint);
    expect((disabilityRequirementsField.values[3].hint as LanguageLookup)(generatedContent)).toBe(
      en.feelComfortableSupportHint
    );
    expect((disabilityRequirementsField.values[4].hint as LanguageLookup)(generatedContent)).toBe(
      en.helpTravellingMovingBuildingSupportHint
    );

    (disabilityRequirementsField.validator as Function)('documentsHelp');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('documentsHelp');
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
