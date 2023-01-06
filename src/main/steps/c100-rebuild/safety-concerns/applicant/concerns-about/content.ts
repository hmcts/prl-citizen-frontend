import { C1AAbuseTypes } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { generateContent as parentContent } from '../content';

const en = () => ({
  serviceName: 'Child arrangements',
  caption: 'Safety concerns',
  title: 'What type of behaviour have you experienced or are at risk of experiencing?',
  paragraph1:
    'Describe the abusive behaviour that you are concerned about. If you are not sure that the behaviour is abusive,',
  seeGuidanceHyperLink: 'https://supportnav.org.uk/what-is-domestic-abuse',
  seeGuidanceLabel: ' see the guidance.',
  select_all_relevant: 'Select any options that are relevant to your situation.',
  physicalAbuse: 'Physical abuse',
  physicalAbuseHint: 'Behaviour such as punching, choking, kicking or hitting with an object',
  psychologicalAbuse: 'Psychological abuse',
  psychologicalAbuseHint:
    'Being subjected to a situation that leads to anxiety, depression, or post-traumatic stress disorder',
  emotionalAbuse: 'Emotional abuse',
  emotionalAbuseHint:
    'Emotional abuse could be spoken (verbal) or not involving words or speech (non-verbal). Examples may include name calling, constant criticism, controlling behaviour, not letting you have an opinion',
  sexualAbuse: 'Sexual abuse',
  sexualAbuseHint:
    'Include being forced or pressured to have sex without consent, being threatened into an unwanted sexual activity, or unwanted touching or groping',
  financialAbuse: 'Financial abuse',
  financialAbuseHint:
    'Examples of financial abuse can be not allowing a person to work, stopping someone saving their own money, or withholding money or credit cards',
  somethingElse: 'Something else',
  somethingElseHint: 'Any concerns you have that do not fit into the above categories',
  errors: {
    c1A_concernAboutApplicant: {
      required: 'Specify the type of behaviour you have experienced or are at risk of experiencing',
    },
  },
});

const cy = () => ({
  serviceName: 'Trefniadau plant',
  caption: 'Pryderon diogelwch',
  title: 'Pa fath o ymddygiad ydych chi wedi ei brofi neu mewn perygl o’i brofi?',
  paragraph1:
    'Disgrifiwch yr ymddygiad camdriniol rydych yn bryderus amdano. Os ydych yn ansicr a yw’r ymddygiad yn ymddygiad camdriniol',
  seeGuidanceHyperLink: 'https://supportnav.org.uk/what-is-domestic-abuse',
  seeGuidanceLabel: 'gweler y canllawiau.',
  select_all_relevant: "Dewiswch unrhyw opsiynau sy'n berthnasol i'ch sefyllfa.",
  physicalAbuse: 'Cam-drin corfforol',
  physicalAbuseHint: 'Ymddygiad megis dyrnu, tagu, cicio neu daro gyda gwrthrych',
  psychologicalAbuse: 'Cam-drin seicolegol',
  psychologicalAbuseHint:
    "Cael eich rhoi mewn sefyllfa sy'n arwain at or-bryder, iselder, neu anhwylder straen ar ôl trawma",
  emotionalAbuse: 'Cam-drin emosiynol',
  emotionalAbuseHint:
    'Gall cam-drin emosiynol fod ar lafar (geiriol) neu ddim yn ymwneud â geiriau neu siarad (di-eiriau). Gall enghreifftiau o hyn gynnwys galw enwau, beirniadaeth gyson, ymddygiad rheolaethol, a pheidio â chaniatáu i chi roi barn',
  sexualAbuse: 'Cam-drin rhywiol',
  sexualAbuseHint:
    'Yn cynnwys cael eich gorfodi neu’ch rhoi dan bwysau i gael rhyw heb gydsyniad, cael eich bygwth i gyflawni gweithred rywiol ddigroeso, neu gael eich cyffwrdd neu eich ymbalfalu yn ddigroeso',
  financialAbuse: 'Cam-drin ariannol',
  financialAbuseHint:
    'Mae enghreifftiau o gam-drin ariannol yn cynnwys peidio â chaniatáu i rywun weithio, atal rhywun rhag cynilo arian ei hun, neu gadw arian neu gardiau credyd oddi wrthynt',
  somethingElse: 'Rhywbeth arall',
  somethingElseHint: "Unrhyw bryderon sydd gennych nad ydynt yn ffitio i'r categorïau uchod",
  errors: {
    c1A_concernAboutApplicant: {
      required: "Nodwch y math o ymddygiad y mae'r plant wedi ei brofi neu maent mewn perygl o’i brofi",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_concernAboutApplicant: {
      id: 'c1A_concernAboutApplicant',
      type: 'checkboxes',
      hint: l => l.select_all_relevant,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'c1A_concernAboutApplicant',
          label: l => l.physicalAbuse,
          hint: l => l.physicalAbuseHint,
          value: C1AAbuseTypes.PHYSICAL_ABUSE,
        },
        {
          name: 'c1A_concernAboutApplicant',
          label: l => l.psychologicalAbuse,
          hint: l => l.psychologicalAbuseHint,
          value: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
        },
        {
          name: 'c1A_concernAboutApplicant',
          label: l => l.emotionalAbuse,
          hint: l => l.emotionalAbuseHint,
          value: C1AAbuseTypes.EMOTIONAL_ABUSE,
        },
        {
          name: 'c1A_concernAboutApplicant',
          label: l => l.sexualAbuse,
          hint: l => l.sexualAbuseHint,
          value: C1AAbuseTypes.SEXUAL_ABUSE,
        },

        {
          name: 'c1A_concernAboutApplicant',
          label: l => l.financialAbuse,
          hint: l => l.financialAbuseHint,
          value: C1AAbuseTypes.FINANCIAL_ABUSE,
        },
        {
          name: 'c1A_concernAboutApplicant',
          label: l => l.somethingElse,
          hint: l => l.somethingElseHint,
          value: C1AAbuseTypes.SOMETHING_ELSE,
        },
      ],
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
