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
      allowMedicalTreatment: 'Allowing medical treatment to be carried out on the children - welsh',
      changeChildrenNameSurname: "Changing the children's names or surname - welsh",
      changeChildrenNameSurname1: "Changing the children's names or surname - welsh",
      childTimeSpent: 'Decide how much time the children spend with each person - welsh',
      errors: {
        too_courtOrder: {
          required: 'Select  what you are asking the court to do - welsh',
        },
        too_resolveSpecificIssueSubField: {
          required: 'Specify what issue you want the court to resolve - welsh',
        },
        too_stopOtherPeopleDoingSomethingSubField: {
          required: 'Specify what you want the court to stop the other people in the application doing - welsh',
        },
      },
      medicalTreatment: 'Medical treatment - welsh',
      religiousIssue: 'A religious issue - welsh',
      relocateChildrenDifferentUkArea: 'Relocating the children to a different area in England and Wales - welsh',
      relocateChildrenDifferentUkArea1: 'Relocating the children to a different area in England and Wales - welsh',
      relocateChildrenOutsideUk:
        'Relocating the children outside of England and Wales (including Scotland and Northern Ireland) - welsh',
      relocateChildrenOutsideUk1:
        'Relocating the children outside of England and Wales (including Scotland and Northern Ireland) - welsh',
      resolveSpecificIssue: 'Resolve a specific issue you are concerned about - welsh',
      resolveSpecificIssueHint: 'For example, what school the children will go to - welsh',
      returningChildrenToYourCare: 'Returning the children to your care - welsh',
      returningChildrenToYourCareHint:
        'If the children have been abducted, unlawfully removed or unlawfully retained - welsh',
      select_all_apply: 'Select all that apply - welsh',
      specificHoliday: 'A specific holiday or arrangement - welsh',
      stopOtherPeopleDoingSomething: 'Stop the other people in the application doing something - welsh',
      stopOtherPeopleDoingSomethingHint: 'For example, moving abroad or abducting the children - welsh',
      takingChildOnHoliday: 'Taking the children on holiday - welsh',
      title: 'What are you asking the court to do? - welsh',
      whatAreYouAsking: 'What are you asking the court to do?',
      whatSchoolChildrenWillGoTo: 'What school the children will go to - welsh',
      whoChildLiveWith: 'Decide who the children live with and when - welsh',
    });
  });
});
