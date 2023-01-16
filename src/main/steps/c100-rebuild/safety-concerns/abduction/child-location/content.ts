/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { generateContent as parentContent } from '../content';

export const en = () => ({
  section: 'Safety concerns',
  title: 'Why do you think the children may be abducted or kept outside the UK without your consent?',
  warningText: {
    text: 'Contact the police or social services if a child you’re responsible for is at risk of being taken out of the UK without your consent.',
    iconFallbackText: 'Warning',
  },
  safetyConcernsText: 'Briefly explain your concerns, including:',
  safetyConcernsBullet1: 'Who might take them',
  safetyConcernsBullet2: 'Where they might be taken or kept',
  childsCurrentLocationText: 'Where are the children now?',
  childsCurrentLocationHint:
    'If they’re outside England or Wales, include what country they’re in and how long they’ve been there. You don’t need to include any addresses.',
  errors: {
    c1A_abductionReasonOutsideUk: {
      required: 'Explain why you think the children may be abducted or kept outside of the UK without your consent',
    },
    c1A_childsCurrentLocation: {
      required: 'Describe where the children are now',
    },
  },
});

export const cy = () => ({
  section: 'Pryderon diogelwch',
  title: "Pam rydych chi'n meddwl y gallai'r plant gael eu cipio neu eu cadw y tu allan i'r DU heb eich caniatâd?",
  warningText: {
    text: " Cysylltwch â'r heddlu neu'r gwasanaethau cymdeithasol os yw plentyn yr ydych yn gyfrifol amdano/amdani mewn perygl o gael ei dynnu/thynnu allan o'r DU heb eich caniatâd.",
    iconFallbackText: 'Warning',
  },
  safetyConcernsText: 'Esboniwch eich pryderon yn gryno, gan gynnwys:',
  safetyConcernsBullet1: 'pwy allai eu cymryd',
  safetyConcernsBullet2: 'lle y gellid mynd â nhw neu eu cadw',
  childsCurrentLocationText: "Lle mae'r plant nawr?",
  childsCurrentLocationHint:
    'Os ydyn nhw y tu allan i Gymru neu Loegr, dylech gynnwys pa wlad maen nhw ynddi a pha mor hir maen nhw wedi bod yno. Does dim angen i chi gynnwys unrhyw gyfeiriadau.',
  errors: {
    c1A_abductionReasonOutsideUk: {
      required:
        "Esboniwch pam rydych chi'n meddwl y gallai'r plant gael eu herwgydio neu eu cadw y tu allan i'r DU heb eich caniatâd",
    },
    c1A_childsCurrentLocation: {
      required: "Disgrifiwch lle mae'r plant erbyn hyn",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_abductionReasonOutsideUk: {
      type: 'textarea',
      labelSize: 's',
      attributes: {
        rows: 4,
      },
      validator: isFieldFilledIn,
    },
    c1A_childsCurrentLocation: {
      type: 'textarea',
      labelSize: 's',
      label: l => l.childsCurrentLocationText,
      hint: l => l.childsCurrentLocationHint,
      attributes: {
        rows: 4,
      },
      validator: isFieldFilledIn,
    },
  },
  onlycontinue: {
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
    ...parentContent(content),
    form,
  };
};
