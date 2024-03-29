import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'What you are asking the court to do',
  singlechildTitle: 'You would like the court to:',
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
  title: "Beth ydych chi'n gofyn i'r llys ei wneud",
  singlechildTitle: 'Rydych am i’r llys:',
  childOption1: 'Penderfynu gyda phwy y bydd y plant yn byw a phryd',
  childOption2: 'Benderfynu faint o amser y bydd y plant yn ei dreulio gyda phob unigolyn',
  childSecondary: 'Gelwir hyn yn Orchymyn Trefniadau Plant.',
  stepsOrderTitle: "Rydych am i'r llys atal y bobl eraill yn y cais rhag:",
  issueOrderTitle: "Rydych am i'r llys ddatrys mater penodol ynglŷn â:",
  stepsOrderSecondary: 'Gelwir hyn yn Orchymyn Camau Gwaharddedig.',
  issueOrderSecondary: 'Gelwir hyn yn Orchymyn Materion Penodol.',
  stepsList: {
    changeChildrenNameSurname: "Newid enwau neu gyfenwau'r plant",
    allowMedicalTreatment: "Caniatáu i'r plant gael triniaeth feddygol",
    takingChildOnHoliday: "Mynd â'r plant ar wyliau",
    relocateChildrenDifferentUkArea: "Adleoli'r plant i ardal wahanol yng Nghymru a Lloegr",
    relocateChildrenOutsideUk: 'Adleoli’r plant y tu allan i Gymru a Lloegr (gan gynnwys Yr Alban a Gogledd Iwerddon)',
  },
  issueOrderList: {
    specificHoliday: 'Gwyliau neu drefniant penodol',
    whatSchoolChildrenWillGoTo: 'I ba ysgol y bydd y plant yn mynd iddi',
    religiousIssue: 'Mater crefyddol',
    changeChildrenNameSurnameA: "Newid enwau neu gyfenwau'r plant",
    medicalTreatment: 'Triniaeth feddygol',
    relocateChildrenDifferentUkAreaA: "Adleoli'r plant i ardal wahanol yng Nghymru a Lloegr",
    relocateChildrenOutsideUkA: 'Adleoli’r plant y tu allan i Gymru a Lloegr (gan gynnwys Yr Alban a Gogledd Iwerddon)',
    returningChildrenToYourCare: "Dychwelyd y plant i'ch gofal",
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
