import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

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
  continue: 'Parhau',
  errors: {
    reasonableAdjustments: {
      required: 'Please select an answer',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    reasonableAdjustments: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'reasonableAdjustments',
          label: l => l.docsFormat,
          hint: l => l.docsFormatHint,
          value: 'docsformat',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.commHelp,
          hint: l => l.commHelpHint,
          value: 'commhelp',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.hearingSupport,
          hint: l => l.hearingSupportHint,
          value: 'hearingsupport',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.hearingComfort,
          hint: l => l.hearingComfortHint,
          value: 'hearingcomfort',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.travellingHelp,
          hint: l => l.travellingHelpHint,
          value: 'travellinghelp',
        },
        {
          divider: l => l.divider,
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.noSupport,
          value: 'nosupport',
          exclusive: true,
        },
      ],
    },
  },
  onlyContinue: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
