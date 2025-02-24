/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CaseWithId } from '../../../../../app/case/case';
import { C1AAbuseTypes } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { generateContentForLocalComponent } from '../../util';
import { generateContent as parentContent } from '../content';

export * from './routeGuard';

export const en = () => ({
  caption: 'Safety concerns',
  headingTitle: 'What type of behaviour have the children experienced or are at risk of experiencing?',
  paragraph1: 'See the National Society for Prevention of Cruelty to Children (NSPCC) guidance on ',
  spottingSignsOfChildHyperLink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse',
  spottingSignsOfChildAbuseLabel: ' spotting the signs of child abuse.',
  select_all_relevant: 'Select any options that are relevant to your situation.',
  physicalAbuse: 'Physical abuse',
  physicalAbuseHint: 'Behaviour such as punching, choking, kicking or hitting with an object',
  psychologicalAbuse: 'Psychological abuse',
  psychologicalAbuseHint:
    'Being subjected to a situation that leads to anxiety, depression, or post-traumatic stress disorder',
  emotionalAbuse: 'Emotional abuse',
  emotionalAbuseHint: 'Making a child feel unloved, worthless, humiliated or ignored',
  sexualAbuse: 'Sexual abuse',
  sexualAbuseHint:
    'A child being forced or persuaded to take part in sexual activities, including online. It can be without contact, for example grooming or exploitation',
  financialAbuse: 'Financial abuse',
  financialAbuseHint: "Stealing and exploiting a child's money, or using their personal information to obtain funds",
  witnessingDomesticAbuse: 'Witnessing domestic abuse',
  witnessingDomesticAbuseHint:
    "The child's emotional and mental wellbeing being impacted by domestic abuse in the home",
  abductionAbuse: 'Abduction',
  abductionAbuseHint:
    'A risk of the children being taken away from their caregivers, especially if they are kept abroad',
  somethingElse: 'Something else',
  somethingElseHint: 'Any concerns you have that do not fit into the above categories',
  errors: {
    c1A_concernAboutChild: {
      required: 'Specify the type of behaviour the children have experienced or are at risk of experiencing',
    },
  },
});

export const cy = () => ({
  caption: 'Pryderon diogelwch',
  headingTitle: "Pa fath o ymddygiad y mae'r plant wedi ei brofi neu mewn perygl o’i brofi?",
  paragraph1: "Gweler canllawiau'r Gymdeithas Genedlaethol er Atal Creulondeb i Blant (NSPCC) ar ",
  spottingSignsOfChildHyperLink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse',
  spottingSignsOfChildAbuseLabel: 'adnabod arwyddion o gam-drin plant.',
  select_all_relevant: "Dewiswch unrhyw opsiynau sy'n berthnasol i'ch sefyllfa chi. ",
  physicalAbuse: 'Cam-drin corfforol',
  physicalAbuseHint: 'Ymddygiad megis dyrnu, tagu, cicio neu daro gyda gwrthrych',
  psychologicalAbuse: 'Cam-drin seicolegol',
  psychologicalAbuseHint:
    "Cael eu rhoi mewn sefyllfa sy'n arwain at or-bryder, iselder, neu anhwylder straen ar ôl trawma",
  emotionalAbuse: 'Cam-drin emosiynol',
  emotionalAbuseHint:
    'Gwneud i blentyn deimlo fel nad oes neb yn ei garu, ei fod yn ddiwerth, yn cael ei fychanu neu ei anwybyddu',
  sexualAbuse: 'Cam-drin rhywiol',
  sexualAbuseHint:
    'Plentyn yn cael ei orfodi neu ei berswadio i gymryd rhan mewn gweithgareddau rhywiol, gan gynnwys ar-lein. Gall fod heb gyswllt, er enghraifft meithrin perthynas amhriodol neu ecsploetiaeth',
  financialAbuse: 'Cam-drin ariannol',
  financialAbuseHint: 'Dwyn a defnyddio arian plentyn, neu ddefnyddio ei wybodaeth bersonol er mwyn cael arian',
  witnessingDomesticAbuse: 'Gweld cam-drin domestig',
  witnessingDomesticAbuseHint:
    'Lles emosiynol a meddyliol y plentyn yn cael ei effeithio gan gam-drin domestig yn y cartref',
  abductionAbuse: 'Cipio',
  abductionAbuseHint:
    'Risg y bydd plant yn cael eu cymryd oddi wrth eu gofalwyr, yn enwedig os ydynt yn cael eu cadw dramor',
  somethingElse: 'Rhywbeth arall',
  somethingElseHint: "Unrhyw bryderon sydd gennych nad ydynt yn ffitio i'r categorïau uchod",
  errors: {
    c1A_concernAboutChild: {
      required: 'Nodwch y math o ymddygiad ydych chi wedi ei brofi neu mewn perygl o’i brofi',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: (userCase: Partial<CaseWithId>, req: AppRequest): FormFields => {
    return {
      c1A_concernAboutChild: {
        id: 'c1A_concernAboutChild',
        type: 'checkboxes',
        hint: l => l.select_all_relevant,
        validator: atLeastOneFieldIsChecked,
        values: [
          {
            name: 'c1A_concernAboutChild',
            label: l => l.physicalAbuse,
            hint: l => l.physicalAbuseHint,
            value: C1AAbuseTypes.PHYSICAL_ABUSE,
          },
          {
            name: 'c1A_concernAboutChild',
            label: l => l.psychologicalAbuse,
            hint: l => l.psychologicalAbuseHint,
            value: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
          },
          {
            name: 'c1A_concernAboutChild',
            label: l => l.emotionalAbuse,
            hint: l => l.emotionalAbuseHint,
            value: C1AAbuseTypes.EMOTIONAL_ABUSE,
          },
          {
            name: 'c1A_concernAboutChild',
            label: l => l.sexualAbuse,
            hint: l => l.sexualAbuseHint,
            value: C1AAbuseTypes.SEXUAL_ABUSE,
          },

          {
            name: 'c1A_concernAboutChild',
            label: l => l.financialAbuse,
            hint: l => l.financialAbuseHint,
            value: C1AAbuseTypes.FINANCIAL_ABUSE,
          },
          {
            name: 'c1A_concernAboutChild',
            label: l => l.abductionAbuse,
            hint: l => l.abductionAbuseHint,
            value: C1AAbuseTypes.ABDUCTION,
          },
          {
            name: 'c1A_concernAboutChild',
            label: l => l.witnessingDomesticAbuse,
            hint: l => l.witnessingDomesticAbuseHint,
            value: C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE,
          },
          {
            name: 'c1A_concernAboutChild',
            label: l => l.somethingElse,
            hint: l => l.somethingElseHint,
            value: C1AAbuseTypes.SOMETHING_ELSE,
          },
        ],
      },
    };
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  return generateContentForLocalComponent(content, languages, form, parentContent);
};
