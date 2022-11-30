import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  title: 'What are you asking the court to do?',
  select_all_apply: 'Select all that apply',
  whoChildLiveWith: 'Decide who the children live with and when',
  childTimeSpent: 'Decide how much time the children spend with each person',
  stopOtherPeopleDoingSomething: 'Stop the other people in the application doing something',
  stopOtherPeopleDoingSomethingHint: 'For example, moving abroad or abducting the children',
  resolveSpecificIssue: 'Resolve a specific issue you are concerned about',
  resolveSpecificIssueHint: 'For example, what school the children will go to',
  changeChildrenNameSurname: "Changing the children's names or surname",
  changeChildrenNameSurname1: "Changing the children's names or surname",
  allowMedicalTreatment: 'Allowing medical treatment to be carried out on the children',
  takingChildOnHoliday: 'Taking the children on holiday',
  relocateChildrenDifferentUkArea: 'Relocating the children to a different area in England and Wales',
  relocateChildrenOutsideUk:
    'Relocating the children outside of England and Wales (including Scotland and Northern Ireland)',
  relocateChildrenDifferentUkArea1: 'Relocating the children to a different area in England and Wales',
  relocateChildrenOutsideUk1:
    'Relocating the children outside of England and Wales (including Scotland and Northern Ireland)',
  specificHoliday: 'A specific holiday or arrangement',
  whatSchoolChildrenWillGoTo: 'What school the children will go to',
  religiousIssue: 'A religious issue',
  medicalTreatment: 'Medical treatment',
  returningChildrenToYourCare: 'Returning the children to your care',
  returningChildrenToYourCareHint: 'If the children have been abducted, unlawfully removed or unlawfully retained',
  whatAreYouAsking: 'What are you asking the court to do?',
  errors: {
    too_courtOrder: {
      required: 'Select  what you are asking the court to do',
    },
    too_stopOtherPeopleDoingSomethingSubField: {
      required: 'Specify what you want the court to stop the other people in the application doing',
    },
    too_resolveSpecificIssueSubField: {
      required: 'Specify what issue you want the court to resolve',
    },
  },
};

const cy = {
  title: "Beth ydych chi'n gofyn i'r llys ei wneud?",
  select_all_apply: "Dewiswch bob un sy'n berthnasol",
  whoChildLiveWith: 'Penderfynu gyda phwy y bydd y plant yn byw a phryd',
  childTimeSpent: 'Penderfynu faint o amser y bydd y plant yn ei dreulio gyda phob unigolyn',
  stopOtherPeopleDoingSomething: 'Atal y bobl eraill yn y cais rhag gwneud rhywbeth',
  stopOtherPeopleDoingSomethingHint: "Er enghraifft, symud y plant i fyw dramor neu gipio'r plant",
  resolveSpecificIssue: "Datrys mater penodol rydych chi'n poeni amdano",
  resolveSpecificIssueHint: 'Er enghraifft, i ba ysgol y bydd y plant yn mynd iddi',
  changeChildrenNameSurname: "Newid enwau neu gyfenwau'r plant",
  changeChildrenNameSurname1: "Newid enwau neu gyfenwau'r plant",
  allowMedicalTreatment: "Caniatáu i'r plant gael triniaedh feddygol",
  takingChildOnHoliday: "Mynd â'r plant ar wyliau",
  relocateChildrenDifferentUkArea: "Adleoli'r plant i ardal wahanol yng Nghymru a Lloegr",
  relocateChildrenOutsideUk: 'Adleoli’r plant y tu allan i Gymru a Lloegr (gan gynnwys Yr Alban a Gogledd Iwerddon)',
  relocateChildrenDifferentUkArea1: "Adleoli'r plant i ardal wahanol yng Nghymru a Lloegr",
  relocateChildrenOutsideUk1: 'Adleoli’r plant y tu allan i Gymru a Lloegr (gan gynnwys Yr Alban a Gogledd Iwerddon)',
  specificHoliday: 'Gwyliau neu drefniant penodol',
  whatSchoolChildrenWillGoTo: 'I ba ysgol y bydd y plant yn mynd iddi',
  religiousIssue: 'Mater crefyddol',
  medicalTreatment: 'Triniaeth feddygol',
  returningChildrenToYourCare: "Dychwelyd y plant i'ch gofal",
  returningChildrenToYourCareHint:
    "Os yw'r plant wedi'u cipio, eu tynnu o rywle yn anghyfreithlon neu eu cadw yn rhywle yn anghyfreithlon",
  whatAreYouAsking: "Beth ydych chi'n gofyn i'r llys ei wneud?",
  errors: {
    too_courtOrder: {
      required: "Dewiswch beth yr ydych yn gofyn i'r llys ei wneud",
    },
    too_stopOtherPeopleDoingSomethingSubField: {
      required: "Nodwch beth rydych chi eisiau i'r llys atal y bobl eraill yn y cais rhag ei wneud",
    },
    too_resolveSpecificIssueSubField: {
      required: "Nodwch pa fater rydych chi eisiau i'r llys ei ddatrys",
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > applying-with > content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain courtOrder field', () => {
    const courtOrderField = fields.too_courtOrder as FormOptions;
    expect(courtOrderField.type).toBe('checkboxes');
    expect((courtOrderField?.hint as Function)(generatedContent)).toBe(en.select_all_apply);
    expect((courtOrderField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.whoChildLiveWith);
    expect((courtOrderField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.childTimeSpent);
    expect((courtOrderField.values[2].label as LanguageLookup)(generatedContent)).toBe(
      en.stopOtherPeopleDoingSomething
    );
    expect((courtOrderField.values[2].hint as LanguageLookup)(generatedContent)).toBe(
      en.stopOtherPeopleDoingSomethingHint
    );
    expect((courtOrderField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.resolveSpecificIssue);
    expect((courtOrderField.values[3].hint as LanguageLookup)(generatedContent)).toBe(en.resolveSpecificIssueHint);

    (courtOrderField.validator as Function)('resolveSpecificIssue');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('resolveSpecificIssue');

    const stopOtherPeopleDoingSomethingSubField = courtOrderField.values[2].subFields
      ?.too_stopOtherPeopleDoingSomethingSubField as FormOptions;
    expect(stopOtherPeopleDoingSomethingSubField.type).toBe('checkboxes');
    expect((stopOtherPeopleDoingSomethingSubField.values[0].label as LanguageLookup)(generatedContent)).toBe(
      en.changeChildrenNameSurname
    );
    expect((stopOtherPeopleDoingSomethingSubField.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.allowMedicalTreatment
    );
    expect((stopOtherPeopleDoingSomethingSubField.values[2].label as LanguageLookup)(generatedContent)).toBe(
      en.takingChildOnHoliday
    );
    expect((stopOtherPeopleDoingSomethingSubField.values[3].label as LanguageLookup)(generatedContent)).toBe(
      en.relocateChildrenDifferentUkArea
    );
    expect((stopOtherPeopleDoingSomethingSubField.values[4].label as LanguageLookup)(generatedContent)).toBe(
      en.relocateChildrenOutsideUk
    );

    (stopOtherPeopleDoingSomethingSubField.validator as Function)('takingChildOnHoliday');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('takingChildOnHoliday');

    const resolveSpecificIssueSubField = courtOrderField.values[3].subFields
      ?.too_resolveSpecificIssueSubField as FormOptions;
    expect(resolveSpecificIssueSubField.type).toBe('checkboxes');
    expect((resolveSpecificIssueSubField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.specificHoliday);
    expect((resolveSpecificIssueSubField.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.whatSchoolChildrenWillGoTo
    );
    expect((resolveSpecificIssueSubField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.religiousIssue);
    expect((resolveSpecificIssueSubField.values[3].label as LanguageLookup)(generatedContent)).toBe(
      en.changeChildrenNameSurname1
    );
    expect((resolveSpecificIssueSubField.values[4].label as LanguageLookup)(generatedContent)).toBe(
      en.medicalTreatment
    );
    expect((resolveSpecificIssueSubField.values[5].label as LanguageLookup)(generatedContent)).toBe(
      en.relocateChildrenDifferentUkArea1
    );
    expect((resolveSpecificIssueSubField.values[6].label as LanguageLookup)(generatedContent)).toBe(
      en.relocateChildrenOutsideUk1
    );
    expect((resolveSpecificIssueSubField.values[7].label as LanguageLookup)(generatedContent)).toBe(
      en.returningChildrenToYourCare
    );
    expect((resolveSpecificIssueSubField.values[7].hint as LanguageLookup)(generatedContent)).toBe(
      en.returningChildrenToYourCareHint
    );

    (resolveSpecificIssueSubField.validator as Function)('returningChildrenToYourCare');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('returningChildrenToYourCare');
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
