import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'Child Arrangements',
  caption: 'MIAM exemptions',
  title: 'Do you require an urgent hearing because you or the children are at risk for any of the following reasons?',
  line1: 'If you are seeking a MIAM exemption, you will need to give more details.',
  line2: 'The court needs this information to decide if you need to attend a MIAM.',
  paragraph1:
    'If you get an urgent hearing, this does not mean that your case will be over sooner, and you will not receive a final decision on your case at this stage.',
  paragraph2:
    'The court will only agree to an urgent hearing if the situation is critical and any of the following reasons apply.',
  select_all_apply: 'Select all that apply to you',
  freedomPhysicalSafety: 'There is a risk to your life, freedom or physical safety',
  freedomPhysicalSafetyInFamily: 'There is a risk to the life, freedom or physical safety of someone in your family',
  riskSafetyInHome: 'There is a risk to the safety of your home',
  riskUnreasonableFinancialHardship:
    'Any delay caused by attending a MIAM would cause a risk of unreasonable financial hardship',
  riskOfHarmToChildren: 'Any delay caused by attending a MIAM would cause a risk of harm to the children',
  unlawfullyRemovedFromUK:
    'Any delay caused by attending a MIAM would cause a risk that the children will be unlawfully removed from the UK or unlawfully kept overseas',
  riskOfUnfairCourtDecision:
    'Any delay caused by attending a MIAM would cause a significant risk of an unfair court decision (miscarriage of justice)',
  riskOfIrretrievableProblems:
    'Any delay caused by attending a MIAM would cause a risk of irretrievable problems, including irretrievable loss of evidence in the case',
  riskOfCourtProceedingsDispute:
    'There is a risk of court proceedings related to the dispute starting or taking place in a country other than England or Wales',
  noneOfTheAbove: 'None of the above',
  errors: {
    miam_urgency: {
      required: 'Select what reason you have to require an urgent hearing',
    },
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Esemptiadau MIAM',
  title:
    "A oes angen gwrandawiad brys arnoch chi am eich bod chi neu'r plant mewn perygl am unrhyw un o'r rhesymau canlynol?",
  line1: 'Os ydych chi’n ceisio esemptiad rhag mynychu MIAM, bydd angen i chi roi mwy o fanylion.',
  line2: 'Mae’r llys angen yr wybodaeth hon i benderfynu a oes angen i chi fynychu MIAM ai peidio.',
  paragraph1:
    'Os cewch wrandawiad brys, nid yw hyn yn golygu y bydd eich achos drosodd yn gynt, ac ni fyddwch yn cael penderfyniad terfynol ar eich achos ar yr adeg hon.',
  paragraph2:
    "Bydd y llys ond yn cytuno i wrandawiad brys os yw’r sefyllfa’n argyfyngus a bod unrhyw un o'r rhesymau canlynol yn berthnasol.",
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  freedomPhysicalSafety: "Mae risg i'ch bywyd, rhyddid neu ddiogelwch corfforol",
  freedomPhysicalSafetyInFamily: 'Mae risg i fywyd, rhyddid neu ddiogelwch corfforol rhywun yn eich teulu',
  riskSafetyInHome: 'Mae yna risg i ddiogelwch eich cartref',
  riskUnreasonableFinancialHardship:
    'Byddai unrhyw oedi a achosir trwy fynychu MIAM yn achosi risg o galedi ariannol afresymol',
  riskOfHarmToChildren: 'Byddai unrhyw oedi a achosir trwy fynychu MIAM yn achosi risg o niwed i’r plant',
  unlawfullyRemovedFromUK:
    'Byddai unrhyw oedi a achosir trwy fynychu MIAM yn achosi risg y bydd y plant yn cael eu tynnu’n anghyfreithlon o’r DU neu eu cadw dramor yn anghyfreithlon',
  riskOfUnfairCourtDecision:
    'Byddai unrhyw oedi a achosir trwy fynychu MIAM yn achosi risg sylweddol o benderfyniad annheg gan y llys (camweinyddu cyfiawnder)',
  riskOfIrretrievableProblems:
    'Byddai unrhyw oedi a achosir trwy fynychu MIAM yn achosi risg o broblemau anadferadwy, gan gynnwys colli tystiolaeth yn yr achos',
  riskOfCourtProceedingsDispute:
    'Mae risg bod achosion llys yn gysylltiedig â’r anghydfod yn dechrau neu’n digwydd mewn gwlad heblaw Cymru neu Loegr',
  noneOfTheAbove: "Dim un o'r uchod",
  errors: {
    miam_urgency: {
      required: 'Select what reason you have to require an urgent hearing - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_urgency: {
      id: 'miam_urgency',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'miam_urgency',
          label: l => l.freedomPhysicalSafety,
          value: 'freedomPhysicalSafety',
        },
        {
          name: 'miam_urgency',
          label: l => l.freedomPhysicalSafetyInFamily,
          value: 'freedomPhysicalSafetyInFamily',
        },
        {
          name: 'miam_urgency',
          label: l => l.riskSafetyInHome,
          value: 'riskSafetyInHome',
        },
        {
          name: 'miam_urgency',
          label: l => l.riskUnreasonableFinancialHardship,
          value: 'riskUnreasonableFinancialHardship',
        },
        {
          name: 'miam_urgency',
          label: l => l.riskOfHarmToChildren,
          value: 'riskOfHarmToChildren',
        },
        {
          name: 'miam_urgency',
          label: l => l.unlawfullyRemovedFromUK,
          value: 'unlawfullyRemovedFromUK',
        },
        {
          name: 'miam_urgency',
          label: l => l.riskOfUnfairCourtDecision,
          value: 'riskOfUnfairCourtDecision',
        },
        {
          name: 'miam_urgency',
          label: l => l.riskOfIrretrievableProblems,
          value: 'riskOfIrretrievableProblems',
        },
        {
          name: 'miam_urgency',
          label: l => l.riskOfCourtProceedingsDispute,
          value: 'riskOfCourtProceedingsDispute',
        },
        {
          divider: 'or',
        },
        {
          name: 'miam_urgency',
          label: l => l.noneOfTheAbove,
          value: 'none',
          behaviour: 'exclusive',
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
    form,
  };
};
