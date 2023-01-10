import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Does your situation qualify for an urgent first hearing?',
  paragraphs: [
    'In many cases the first hearing will take place within 2 months. But the court may agree to an earlier first hearing (urgent hearing) if it is necessary.',
    'For example, there may be an immediate risk of harm to you or the children.',
    'If you get an urgent hearing, this may not mean that your case will be over sooner, and you may not receive a final decision on your case at this stage.',
  ],
  warningText: {
    text: 'Only ask for an urgent hearing if you have a good reason. The court will only agree to an urgent hearing if they think the situation is critical.',
    iconFallbackText: 'Warning',
  },
  label: 'Do you have a good reason to request an urgent hearing?',
  one: 'Yes',
  two: 'No',
  errors: {
    hu_urgentHearingReasons: {
      required: 'Select yes if you have a good reason to request an urgent hearing',
    },
  },
});

const cy = () => ({
  title: 'Ydy eich sefyllfa’n gymwys i gael gwrandawiad cyntaf brys?',
  paragraphs: [
    'Gyda nifer o achosion, cynhelir y gwrandawiad cyntaf o fewn 2 fis. Ond efallai y bydd y llys yn trefnu i gynnal y gwrandawiad cyntaf yn gynt na hyn (gwrandawiad brys) os bydd angen.',
    'Er enghraifft, efallai bod risg uniongyrchol o niwed i chi neu’r plant.',
    'Os cewch wrandawiad brys, nid yw hyn o reidrwydd yn golygu y bydd eich achos drosodd yn gynt, ac efallai ni fyddwch yn cael penderfyniad terfynol ar eich achos ar yr adeg hon.',
  ],
  warningText: {
    text: 'Dylech ond gofyn am wrandawiad brys os oes gennych reswm da dros wneud hynny. Bydd y llys ond yn cytuno i drefnu gwrandawiad brys os yw’n credu bod y sefyllfa’n argyfyngus.',
    iconFallbackText: 'Rhybudd',
  },
  label: 'A oes gennych chi reswm da dros wneud cais am gael gwrandawiad brys?',
  one: 'Oes',
  two: 'Nac oes',
  errors: {
    hu_urgentHearingReasons: {
      required: 'Dewiswch oes os oes gennych reswm da dros ofyn am wrandawiad brys',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    hu_urgentHearingReasons: {
      type: 'radios',
      classes: 'govuk-radios',
      labelSize: 'm',
      label: l => l.label,
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
