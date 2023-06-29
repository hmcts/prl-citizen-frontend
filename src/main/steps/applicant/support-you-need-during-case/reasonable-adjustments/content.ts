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
  unabletotakecourtproceedings: 'Is there a reason you are unable to take part in the court proceedings?',
  unabletotakecourtproceedingshint:
    'For example, do you have a disability that would prevent you from attending court in person?',
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
  travellinghelphint: 'access and mobility support if a hearing takes place in person',
  unabletotakecourtproceedings: 'Is there a reason you are unable to take part in the court proceedings?',
  unabletotakecourtproceedingshint:
    'For example, do you have a disability that would prevent you from attending court in person?',
  nosupport: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
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
          label: l => l.docsformat,
          hint: l => l.docsformathint,
          value: 'docsformat',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.commhelp,
          hint: l => l.commhelphint,
          value: 'commhelp',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.hearingsupport,
          hint: l => l.hearingsupporthint,
          value: 'hearingsupport',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.hearingcomfort,
          hint: l => l.hearingcomforthint,
          value: 'hearingcomfort',
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.travellinghelp,
          hint: l => l.travellinghelphint,
          value: 'travellinghelp',
        },
        {
          divider: l => l.divider,
        },
        {
          name: 'reasonableAdjustments',
          label: l => l.nosupport,
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
