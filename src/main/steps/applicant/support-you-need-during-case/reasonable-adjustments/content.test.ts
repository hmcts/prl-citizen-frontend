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
  summaryText: 'Contacts for help',
  docsformat: 'I need documents in an alternative format',
  docsformathint: 'for example, braille or different colours and sizes',
  commhelp: 'I need help communicating and understanding',
  commhelphint: 'for example, sight, hearing, speaking or interpretation',
  hearingsupport: 'I need to bring support with me to a hearing',
  hearingsupporthint: 'for example, someone you know or an assistance animal',
  hearingcomfort: 'I need something to feel comfortable during a hearing',
  hearingcomforthint: 'for example, breaks or extra space',
  travellinghelp: 'I need help travelling to, or moving around court buildings',
  travellinghelphint: 'access and mobility support if a hearing takes place in person',
  nosupport: 'No, I do not need any extra support at this time',
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
  summaryText: 'Cysylltiadau am gymorth',
  docsformat: 'Rwyf angen dogfennau mewn fformat amgen',
  docsformathint: 'er enghraifft, print bras neu wahanol liwiau a meintiau testun',
  commhelp: 'Rwyf angen cymorth gyda chyfathrebu a deall pethau',
  commhelphint: "er enghraifft, rhywun rydych chi'n ei adnabod neu gi cymorth",
  hearingsupport: 'Rwyf eisiau dod â rhywun efo fi i fy nghefnogi mewn gwrandawiad',
  hearingsupporthint: "er enghraifft, rhywun rydych chi'n ei adnabod neu gi cymorth",
  hearingcomfort: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad',
  hearingcomforthint: 'er enghraifft, seibiannau ychwanegol neu fannau ychwanegol',
  travellinghelp: 'Rwyf angen cymorth i deithio i, neu symud o gwmpas adeiladau’r llys',
  travellinghelphint: 'cymorth gyda mynediad a symudedd os bydd gwrandawiad yn cael ei gynnal wyneb yn wyneb',
  nosupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  continue: 'Parhau',
  errors: {
    reasonableAdjustments: {
      required: 'Dewiswch ateb, os gwelwch yn dda',
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
    expect(generatedContent.summaryText).toEqual('Contacts for help');
    expect(generatedContent.docsformat).toEqual('I need documents in an alternative format');
    expect(generatedContent.docsformathint).toEqual('for example, braille or different colours and sizes');
    expect(generatedContent.commhelp).toEqual('I need help communicating and understanding');
    expect(generatedContent.commhelphint).toEqual('for example, sight, hearing, speaking or interpretation');
    expect(generatedContent.hearingsupport).toEqual('I need to bring support with me to a hearing');
    expect(generatedContent.hearingsupporthint).toEqual('for example, someone you know or an assistance animal');
    expect(generatedContent.hearingcomfort).toEqual('I need something to feel comfortable during a hearing');
    expect(generatedContent.hearingcomforthint).toEqual('for example, breaks or extra space');
    expect(generatedContent.travellinghelp).toEqual('I need help travelling to, or moving around court buildings');
    expect(generatedContent.travellinghelphint).toEqual(
      'access and mobility support if a hearing takes place in person'
    );
    expect(generatedContent.nosupport).toEqual('No, I do not need any extra support at this time');
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
    expect((reasonableAdjustmentsField.section as Function)(generatedContent)).toBe(en.section);
  });

  test('should contain Continue button', () => {
    expect((form.onlyContinue?.text as Function)(generatedContent)).toBe('Continue');
  });
});

/* eslint-enable @typescript-eslint/ban-types */
