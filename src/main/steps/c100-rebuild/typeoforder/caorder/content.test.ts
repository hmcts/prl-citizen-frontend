import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
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
};

const cy = {
  title: "Beth ydych chi'n gofyn i'r llys ei wneud",
  singlechildTitle: 'Rydych am i’r llys:',
  childOption1: 'Benderfynu gyda phwy y bydd y plant yn byw a phryd',
  childOption2: 'Benderfynu faint o amser y bydd y plant yn ei dreulio gyda phob unigolyn',
  childSecondary: 'Gelwir hyn yn Orchymyn Trefniadau Plant.',
  stepsOrderTitle: 'You would like the court to stop the other people in the application: - welsh',
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
};
/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > applying-with > content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
