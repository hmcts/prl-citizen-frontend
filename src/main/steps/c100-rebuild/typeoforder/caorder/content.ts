import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'What you are asking the court to do',
  singlechildTitle: 'You would like the court to:',
  multichildTitle: 'You would like the court to put in an arrangement about the children to:',
  childOption1: 'Decide who the children live with and when',
  childOption2: 'Decide how much time the children spend with each person',
  childSecondary: 'This is known as a Child Arrangements Order.',
  stepsOrderTitle: 'You would like the court to stop the other people in the application:',
  issueOrderTitle: 'You would like the court to resolve a specific issue about:',
  stepsOrderSecondary: 'This is known as a Prohibited Steps Order.',
  issueOrderSecondary: 'This is known as a Specific Issue Order.',
  stepsList: {
    changeChildrenNameSurname: "Changing the children's names or surname",
    allowMedicalTreatment: 'Allowing medical treatment to be carried out on the children',
    takingChildOnHoliday: 'Taking the children on holiday',
    relocateChildrenDifferentUkArea: 'Relocating the children to a different area in England and Wales',
    relocateChildrenOutsideUk: `Relocating the children outside of England and Wales
     (including Scotland and Northern Ireland)`,
  },
  issueOrderList: {
    specificHoliday: 'A specific holiday or arrangement',
    whatSchoolChildrenWillGoTo: 'What school the children will go to',
    religiousIssue: 'A religious issue',
    changeChildrenNameSurnameA: "Changing the children's names or surname",
    medicalTreatment: 'Medical treatment',
    relocateChildrenDifferentUkAreaA: 'Relocating the children to a different area in England and Wales',
    relocateChildrenOutsideUkA: `Relocating the children outside of England and Wales
     (including Scotland and Northern Ireland)`,
    returningChildrenToYourCare: 'Returning the children to your care',
  },
});

const cy = () => ({
  title: 'What you are asking the court to do - welsh',
  singlechildTitle: 'You would like the court to: - welsh',
  multichildTitle: 'You would like the court to put in an arrangement about the children to: - welsh',
  childOption1: 'Decide who the children live with and when - welsh',
  childOption2: 'Decide how much time the children spend with each person - welsh',
  childSecondary: 'This is known as a Child Arrangements Order. - welsh',
  stepsOrderTitle: 'You would like the court to stop the other people in the application: - welsh',
  issueOrderTitle: 'You would like the court to resolve a specific issue about: - welsh',
  stepsOrderSecondary: 'This is known as a Prohibited Steps Order. - welsh',
  issueOrderSecondary: 'This is known as a Specific Issue Order. - welsh',
  stepsList: {
    changeChildrenNameSurname: "Changing the children's names or surname - welsh",
    allowMedicalTreatment: 'Allowing medical treatment to be carried out on the children - welsh',
    takingChildOnHoliday: 'Taking the children on holiday - welsh',
    relocateChildrenDifferentUkArea: 'Relocating the children to a different area in England and Wales - welshs',
    relocateChildrenOutsideUk: `Relocating the children outside of England and Wales
     (including Scotland and Northern Ireland) - welsh`,
  },
  issueOrderList: {
    specificHoliday: 'A specific holiday or arrangement - welsh',
    whatSchoolChildrenWillGoTo: 'What school the children will go to - welsh',
    religiousIssue: 'A religious issue - welsh',
    changeChildrenNameSurnameA: "Changing the children's names or surname - welsh",
    medicalTreatment: 'Medical treatment - welsh',
    relocateChildrenDifferentUkAreaA: 'Relocating the children to a different area in England and Wales - welsh',
    relocateChildrenOutsideUkA: `Relocating the children outside of England and Wales
     (including Scotland and Northern Ireland) - welsh`,
    returningChildrenToYourCare: 'Returning the children to your care - welsh',
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
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
