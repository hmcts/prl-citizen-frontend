import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  section: 'Reasonable adjustments',
  title:
    'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
  courtcommunication:
    'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change.',
  optionHint: 'Select all that apply to you - specific requirements can be given next',
  docsFormat: 'I need documents in an alternative format',
  docsFormatHint: 'for example, braille or different colours and text sizes',
  commHelp: 'I need help communicating and understanding',
  commHelpHint: 'for example, hearing, speaking or interpretation',
  hearingSupport: 'I need to bring support with me to a hearing',
  hearingSupportHint: 'for example, someone you know or an assistance animal',
  hearingComfort: 'I need something to feel comfortable during a hearing',
  hearingComfortHint: 'for example, breaks or extra space',
  travellingHelp: 'I need help travelling to, or moving around court buildings',
  travellingHelpHint: 'for example, access and mobility support if a hearing takes place in person',
  noSupport: 'No, I do not need any extra support at this time',
  continue: 'Continue',
  errors: {
    reasonableAdjustments: {
      required: 'Please select an answer',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title:
    'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
  courtcommunication:
    'Gwyddom fod rhai pobl angen cymorth i gael mynediad at wybodaeth ac i ddefnyddio ein gwasanaethau. Gelwir hyn yn aml yn addasiad rhesymol. Rhaid i rai addasiadau rhesymol gael eu cytuno gan farnwr neu GLlTEM. Gallwch drafod gyda’r llys os bydd eich anghenion yn newid.',
  optionHint: 'Dewiswch bob un sy’n berthnasol - gellir nodi gofynion penodol nesaf',
  docsFormat: 'Rwyf angen dogfennau mewn fformat amgen',
  docsFormatHint: 'er enghraifft, print bras neu wahanol liwiau a meintiau testun',
  commHelp: 'Rwyf angen cymorth gyda chyfathrebu a deall pethau',
  commHelpHint: 'er enghraifft, gwrando, siarad neu gymorth gan gyfieithydd/dehonglydd',
  hearingSupport: 'Rwyf eisiau dod â rhywun efo fi i fy nghefnogi mewn gwrandawiad',
  hearingSupportHint: "er enghraifft, rhywun rydych chi'n ei adnabod neu gi cymorth",
  hearingComfort: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad',
  hearingComfortHint: 'er enghraifft, seibiannau ychwanegol neu fannau ychwanegol',
  travellingHelp: 'Rwyf angen cymorth i deithio i, neu symud o gwmpas adeiladau’r llys',
  travellingHelpHint:
    'er enghraifft, cymorth gyda mynediad a symudedd os bydd gwrandawiad yn cael ei gynnal wyneb yn wyneb',
  noSupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Continue',
  errors: {
    reasonableAdjustments: {
      required: 'Please select an answer',
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
    expect(generatedContent.title).toEqual(
      'Do you have a physical, mental or learning disability or health condition that means you need support during your case?'
    );
    expect(generatedContent.section).toEqual('Reasonable adjustments');
    expect(generatedContent.courtcommunication).toEqual(
      'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change.'
    );
    expect(generatedContent.optionHint).toEqual(
      'Select all that apply to you - specific requirements can be given next'
    );
    expect(generatedContent.docsFormat).toEqual('I need documents in an alternative format');
    expect(generatedContent.docsFormatHint).toEqual('for example, braille or different colours and text sizes');
    expect(generatedContent.commHelp).toEqual('I need help communicating and understanding');
    expect(generatedContent.commHelpHint).toEqual('for example, hearing, speaking or interpretation');
    expect(generatedContent.hearingSupport).toEqual('I need to bring support with me to a hearing');
    expect(generatedContent.hearingSupportHint).toEqual('for example, someone you know or an assistance animal');
    expect(generatedContent.hearingComfort).toEqual('I need something to feel comfortable during a hearing');
    expect(generatedContent.hearingComfortHint).toEqual('for example, breaks or extra space');
    expect(generatedContent.travellingHelp).toEqual('I need help travelling to, or moving around court buildings');
    expect(generatedContent.travellingHelpHint).toEqual(
      'for example, access and mobility support if a hearing takes place in person'
    );
    expect(generatedContent.noSupport).toEqual('No, I do not need any extra support at this time');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain reasonableAdjustments field', () => {
    const reasonableAdjustmentsField = fields.reasonableAdjustments as FormOptions;
    expect(reasonableAdjustmentsField.type).toBe('checkboxes');
    expect((reasonableAdjustmentsField.hint as Function)(generatedContent)).toBe(en.optionHint);
    expect((reasonableAdjustmentsField.section as Function)(generatedContent)).toBe(en.section);
    expect((reasonableAdjustmentsField.values[0].label as Function)(generatedContent)).toBe(en.docsFormat);
    expect((reasonableAdjustmentsField.values[0].hint as Function)(generatedContent)).toBe(en.docsFormatHint);
    expect((reasonableAdjustmentsField.values[1].label as Function)(generatedContent)).toBe(en.commHelp);
    expect((reasonableAdjustmentsField.values[1].hint as Function)(generatedContent)).toBe(en.commHelpHint);
    expect((reasonableAdjustmentsField.values[2].label as Function)(generatedContent)).toBe(en.hearingSupport);
    expect((reasonableAdjustmentsField.values[2].hint as Function)(generatedContent)).toBe(en.hearingSupportHint);
    expect((reasonableAdjustmentsField.values[3].label as Function)(generatedContent)).toBe(en.hearingComfort);
    expect((reasonableAdjustmentsField.values[3].hint as Function)(generatedContent)).toBe(en.hearingComfortHint);
    expect((reasonableAdjustmentsField.values[4].label as Function)(generatedContent)).toBe(en.travellingHelp);
    expect((reasonableAdjustmentsField.values[4].hint as Function)(generatedContent)).toBe(en.travellingHelpHint);
    expect((reasonableAdjustmentsField.values[5].divider as Function)(generatedContent)).toBe(undefined);
    expect((reasonableAdjustmentsField.values[6].label as Function)(generatedContent)).toBe(en.noSupport);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
