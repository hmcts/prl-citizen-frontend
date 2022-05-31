import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  section: 'Safety concerns',
  title: 'Have you suffered or are you at risk of suffering domestic violence or abuse?',
  line1: 'Only include abuse by the people in this application or someone connected to them.',
  line2: 'Domestic violence or abuse includes incidents or a pattern of incidents of abusive or violent behaviour.',
  line3: 'This may include:',
  line4: 'controlling, threatening or coercive behaviour',
  line5: 'violence',
  line6: 'abuse',
  line7:
    'The incidents must have taken place between people who are aged 16 or over, who are current (or former) intimate partners or family members.',
  line8: 'Domestic violence or abuse can occur no matter what their gender or sexuality of the people involved.',
  line9: 'Examples include:',
  line10: 'psychological abuse',
  line11: 'financial abuse',
  line12: 'emotional abuse',
  line13: 'physical abuse',
  line14: 'sexual abuse',
  line15:
    'It also includes culturally specific forms of abuse, including forced marriage, honour-based violence and dowry-related abuse.',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  saveAndContinue: 'Save and Continue',
};

const cy: typeof en = {
  section: 'Safety concerns',
  title: 'Have you suffered or are you at risk of suffering domestic violence or abuse?',
  line1: 'Only include abuse by the people in this application or someone connected to them.',
  line2: 'Domestic violence or abuse includes incidents or a pattern of incidents of abusive or violent behaviour.',
  line3: 'This may include:',
  line4: 'controlling, threatening or coercive behaviour',
  line5: 'violence',
  line6: 'abuse',
  line7:
    'The incidents must have taken place between people who are aged 16 or over, who are current (or former) intimate partners or family members.',
  line8: 'Domestic violence or abuse can occur no matter what their gender or sexuality of the people involved.',
  line9: 'Examples include:',
  line10: 'psychological abuse',
  line11: 'financial abuse',
  line12: 'emotional abuse',
  line13: 'physical abuse',
  line14: 'sexual abuse',
  line15:
    'It also includes culturally specific forms of abuse, including forced marriage, honour-based violence and dowry-related abuse.',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  saveAndContinue: 'Save and Continue',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    safetyConcerns: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: 'Yes',
        },
        {
          label: l => l.two,
          value: 'No',
        },
        {
          label: l => l.three,
          value: 'I',
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.saveAndContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
