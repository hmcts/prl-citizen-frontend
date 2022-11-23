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
  title: 'What you are asking the court to do - welsh',
  singlechildTitle: 'You would like the court to: - welsh',
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
    relocateChildrenDifferentUkArea: 'Relocating the children to a different area in England and Wales - welsh',
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
