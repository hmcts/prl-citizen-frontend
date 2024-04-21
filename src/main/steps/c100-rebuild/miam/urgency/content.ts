import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = {
  caption: 'MIAM exemptions',
  title: 'Urgency',
  content1: 'You need to provide more details, so the court can decide if your application is urgent.',
  content2: 'If your application is urgent, this does not mean that your case will be over sooner.',
  whyIsApplicationUrgent: 'Why is your application urgent?',
  freedomPhysicalSafety: 'There is a risk to your life, freedom or physical safety',
  freedomPhysicalSafetyInFamily: 'There is a risk to your family’s life, freedom or physical safety',
  riskSafetyInHome: "There is a risk to the safety of your home or your family's home",
  riskOfHarmToChildren: 'Any delay caused by attending a MIAM would cause a risk of harm to the children',
  unlawfullyRemovedFromUK:
    'Any delay caused by attending a MIAM would cause a risk that the children will be unlawfully removed from the UK or unlawfully kept overseas',
  riskOfUnfairCourtDecision:
    'Any delay caused by attending a MIAM would cause a significant risk of an unfair court decision (miscarriage of justice)',
  riskUnreasonableFinancialHardship:
    'Any delay caused by attending a MIAM would cause a risk of significant financial hardship',
  riskOfIrretrievableProblems:
    'Any delay caused by attending a MIAM would cause a risk of irretrievable problems, including irretrievable loss of evidence in the case',
  riskOfCourtProceedingsDispute:
    'There is a significant risk of court proceedings related to the dispute starting or taking place in a country other than England or Wales',
  noneOfThese: 'None of these',
  errors: {
    miam_urgency: {
      required: 'Select a reason why your application is urgent',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy: typeof en = {
  caption: 'Esemptiadau MIAM',
  title: 'Cais brys',
  content1: 'Mae angen i chi ddarparu mwy o fanylion fel y gall y llys benderfynu os yw eich cais yn un brys.',
  content2: 'Os yw eich cais yn un brys, nid yw hyn yn golygu y bydd eich achos drosodd yn gynt.',
  whyIsApplicationUrgent: 'Pam bod eich cais yn un brys?',
  freedomPhysicalSafety: "Mae perygl i'ch bywyd, rhyddid neu ddiogelwch corfforol",
  freedomPhysicalSafetyInFamily: 'Mae perygl i’ch bywyd teuluol, rhyddid neu ddiogelwch corfforol',
  riskSafetyInHome: 'Mae yna risg i ddiogelwch eich cartref neu gartref eich teulu',
  riskOfHarmToChildren: 'Byddai unrhyw oedi a achosir trwy fynychu MIAM yn achosi risg o niwed i’r plant',
  unlawfullyRemovedFromUK:
    'Byddai unrhyw oedi a achosir trwy fynychu MIAM yn achosi risg y bydd y plant yn cael eu tynnu’n anghyfreithlon o’r DU neu eu cadw dramor yn anghyfreithlon',
  riskOfUnfairCourtDecision:
    'Byddai unrhyw oedi a achosir trwy fynychu MIAM yn achosi risg sylweddol o benderfyniad annheg gan y llys (camweinyddiad cyfiawnder)',
  riskUnreasonableFinancialHardship:
    'Byddai unrhyw oedi a achosir trwy fynychu MIAM yn achosi risg o galedi ariannol sylweddol',
  riskOfIrretrievableProblems:
    'Byddai unrhyw oedi a achosir trwy fynychu MIAM yn achosi risg o broblemau anadferadwy, gan gynnwys colli tystiolaeth yn yr achos',
  riskOfCourtProceedingsDispute:
    "Mae yna risg sylweddol bod achos llys sy'n gysylltiedig â’r anghydfod yn dechrau neu’n digwydd mewn gwlad heblaw Cymru neu Loegr",
  noneOfThese: 'Dim un o’r rhain',
  errors: {
    miam_urgency: {
      required: 'Dewiswch pam bod eich cais yn un brys',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_urgency: {
      id: 'miam_urgency',
      type: 'radios',
      label: l => l.whyIsApplicationUrgent,
      labelSize: 'm',
      validator: atLeastOneFieldIsChecked,
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
          label: l => l.riskUnreasonableFinancialHardship,
          value: 'riskUnreasonableFinancialHardship',
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
          divider: l => l.divider,
        },
        {
          name: 'miam_urgency',
          label: l => l.noneOfThese,
          value: 'none',
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
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
