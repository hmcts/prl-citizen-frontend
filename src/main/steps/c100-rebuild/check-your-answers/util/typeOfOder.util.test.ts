import { typeOfCourtOrderContents } from './typeOfOrder.util';

describe('test cases for typeOfCourtOrderContents', () => {
  test('english', () => {
    expect(typeOfCourtOrderContents('en')).toStrictEqual({
      allowMedicalTreatment: 'Allowing medical treatment to be carried out on the children',
      changeChildrenNameSurname: "Changing the children's names or surname",
      changeChildrenNameSurname1: "Changing the children's names or surname",
      childTimeSpent: 'Decide how much time the children spend with each person',
      errors: {
        too_courtOrder: {
          required: 'Select  what you are asking the court to do',
        },
        too_resolveSpecificIssueSubField: {
          required: 'Specify what issue you want the court to resolve',
        },
        too_stopOtherPeopleDoingSomethingSubField: {
          required: 'Specify what you want the court to stop the other people in the application doing',
        },
      },
      medicalTreatment: 'Medical treatment',
      religiousIssue: 'A religious issue',
      relocateChildrenDifferentUkArea: 'Relocating the children to a different area in England and Wales',
      relocateChildrenDifferentUkArea1: 'Relocating the children to a different area in England and Wales',
      relocateChildrenOutsideUk:
        'Relocating the children outside of England and Wales (including Scotland and Northern Ireland)',
      relocateChildrenOutsideUk1:
        'Relocating the children outside of England and Wales (including Scotland and Northern Ireland)',
      resolveSpecificIssue: 'Resolve a specific issue you are concerned about',
      resolveSpecificIssueHint: 'For example, what school the children will go to',
      returningChildrenToYourCare: 'Returning the children to your care',
      returningChildrenToYourCareHint: 'If the children have been abducted, unlawfully removed or unlawfully retained',
      select_all_apply: 'Select all that apply',
      specificHoliday: 'A specific holiday or arrangement',
      stopOtherPeopleDoingSomething: 'Stop the other people in the application doing something',
      stopOtherPeopleDoingSomethingHint: 'For example, moving abroad or abducting the children',
      takingChildOnHoliday: 'Taking the children on holiday',
      title: 'What are you asking the court to do?',
      whatAreYouAsking: 'What are you asking the court to do?',
      whatSchoolChildrenWillGoTo: 'What school the children will go to',
      whoChildLiveWith: 'Decide who the children live with and when',
    });
  });
  test('notenglish', () => {
    expect(typeOfCourtOrderContents('cy')).toStrictEqual({
      allowMedicalTreatment: "Caniatáu i'r plant gael triniaedh feddygol",
      changeChildrenNameSurname: "Newid enwau neu gyfenwau'r plant",
      changeChildrenNameSurname1: "Newid enwau neu gyfenwau'r plant",
      childTimeSpent: 'Penderfynu faint o amser y bydd y plant yn ei dreulio gyda phob unigolyn',
      errors: {
        too_courtOrder: {
          required: "Dewiswch beth yr ydych yn gofyn i'r llys ei wneud",
        },
        too_resolveSpecificIssueSubField: {
          required: "Nodwch pa fater rydych chi eisiau i'r llys ei ddatrys",
        },
        too_stopOtherPeopleDoingSomethingSubField: {
          required: "Nodwch beth rydych chi eisiau i'r llys atal y bobl eraill yn y cais rhag ei wneud",
        },
      },
      medicalTreatment: 'Triniaeth feddygol',
      religiousIssue: 'Mater crefyddol',
      relocateChildrenDifferentUkArea: "Adleoli'r plant i ardal wahanol yng Nghymru a Lloegr",
      relocateChildrenDifferentUkArea1: "Adleoli'r plant i ardal wahanol yng Nghymru a Lloegr",
      relocateChildrenOutsideUk:
        'Adleoli’r plant y tu allan i Gymru a Lloegr (gan gynnwys Yr Alban a Gogledd Iwerddon)',
      relocateChildrenOutsideUk1:
        'Adleoli’r plant y tu allan i Gymru a Lloegr (gan gynnwys Yr Alban a Gogledd Iwerddon)',
      resolveSpecificIssue: "Datrys mater penodol rydych chi'n poeni amdano",
      resolveSpecificIssueHint: 'Er enghraifft, i ba ysgol y bydd y plant yn mynd iddi',
      returningChildrenToYourCare: "Dychwelyd y plant i'ch gofal",
      returningChildrenToYourCareHint:
        "Os yw'r plant wedi'u cipio, eu tynnu o rywle yn anghyfreithlon neu eu cadw yn rhywle yn anghyfreithlon",
      select_all_apply: "Dewiswch bob un sy'n berthnasol",
      specificHoliday: 'Gwyliau neu drefniant penodol',
      stopOtherPeopleDoingSomething: 'Atal y bobl eraill yn y cais rhag gwneud rhywbeth',
      stopOtherPeopleDoingSomethingHint: "Er enghraifft, symud y plant i fyw dramor neu gipio'r plant",
      takingChildOnHoliday: "Mynd â'r plant ar wyliau",
      title: "Beth ydych chi'n gofyn i'r llys ei wneud?",
      whatAreYouAsking: "Beth ydych chi'n gofyn i'r llys ei wneud?",
      whatSchoolChildrenWillGoTo: 'I ba ysgol y bydd y plant yn mynd iddi',
      whoChildLiveWith: 'Penderfynu gyda phwy y bydd y plant yn byw a phryd',
    });
  });
});
