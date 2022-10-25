/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  whatAreYouAsking: 'What are you asking the court to do?',
  select_all_apply: 'Select all that apply',
  whoChildLiveWith: 'Decide who the children live with and when',
  childTimeSpent: 'Decide how much time the children spend with each person',
  stopOtherPeopleDoingSomething: 'Stop the other people in the application doing something',
  stopOtherPeopleDoingSomethingHint: 'For example, moving abroad or abducting the children',
  resolveSpecificIssue: 'Resolve a specific issue you are concerned about',
  resolveSpecificIssueHint: 'For example, what school the children will go to',
  changeChildrenNameSurname: "Changing the children's names or surname",
  changeChildrenNameSurnameA: "Changing the children's names or surname",
  allowMedicalTreatment: 'Allowing medical treatment to be carried out on the children',
  takingChildOnHoliday: 'Taking the children on holiday',
  relocateChildrenDifferentUkArea: 'Relocating the children to a different area in England and Wales',
  relocateChildrenOutsideUkCo:
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
  errors: {
    too_courtOrder: {
      required: 'Select  what you are asking the court to do',
    },
    too_stopOtherPeopleDoingSomething_subfields: {
      required: 'Specify what you want the court to stop the other people in the application doing',
    },
    too_resolveSpecificIssue_subfields: {
      required: 'Specify what issue you want the court to resolve',
    },
  },
});

export const cy = () => ({
  whatAreYouAsking: 'What are you asking the court to do? - welsh',
  select_all_apply: 'Select all that apply - welsh',
  whoChildLiveWith: 'Decide who the children live with and when - welsh',
  childTimeSpent: 'Decide how much time the children spend with each person - welsh',
  stopOtherPeopleDoingSomething: 'Stop the other people in the application doing something - welsh',
  stopOtherPeopleDoingSomethingHint: 'For example, moving abroad or abducting the children - welsh',
  resolveSpecificIssue: 'Resolve a specific issue you are concerned about - welsh',
  resolveSpecificIssueHint: 'For example, what school the children will go to - welsh',
  changeChildrenNameSurname: "Changing the children's names or surname - welsh",
  changeChildrenNameSurnameA: "Changing the children's names or surname - welsh",
  allowMedicalTreatment: 'Allowing medical treatment to be carried out on the children - welsh',
  takingChildOnHoliday: 'Taking the children on holiday - welsh',
  relocateChildrenDifferentUkArea: 'Relocating the children to a different area in England and Wales - welsh',
  relocateChildrenOutsideUkCo:
    'Relocating the children outside of England and Wales (including Scotland and Northern Ireland) - welsh',
  relocateChildrenDifferentUkArea1: 'Relocating the children to a different area in England and Wales - welsh',
  relocateChildrenOutsideUk1:
    'Relocating the children outside of England and Wales (including Scotland and Northern Ireland) - welsh',
  specificHoliday: 'A specific holiday or arrangement - welsh',
  whatSchoolChildrenWillGoTo: 'What school the children will go to - welsh',
  religiousIssue: 'A religious issue - welsh',
  medicalTreatment: 'Medical treatment - welsh',
  returningChildrenToYourCare: 'Returning the children to your care - welsh',
  returningChildrenToYourCareHint:
    'If the children have been abducted, unlawfully removed or unlawfully retained - welsh',
  errors: {
    too_courtOrder: {
      required: 'Select  what you are asking the court to do - welsh',
    },
    too_stopOtherPeopleDoingSomething_subfields: {
      required: 'Specify what you want the court to stop the other people in the application doing - welsh',
    },
    too_resolveSpecificIssue_subfields: {
      required: 'Specify what issue you want the court to resolve - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    too_courtOrder: {
      id: 'too_courtOrder',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'too_courtOrder',
          label: l => l.whoChildLiveWith,
          value: 'whoChildLiveWith',
        },
        {
          name: 'too_courtOrder',
          label: l => l.childTimeSpent,
          value: 'childTimeSpent',
        },
        {
          name: 'too_courtOrder',
          label: l => l.stopOtherPeopleDoingSomething,
          value: 'stopOtherPeopleDoingSomething',
          hint: l => l.stopOtherPeopleDoingSomethingHint,
          subFields: {
            too_stopOtherPeopleDoingSomething_subfields: {
              id: 'too_stopOtherPeopleDoingSomething_subfields',
              type: 'checkboxes',
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'too_stopOtherPeopleDoingSomething_subfields',
                  label: l => l.changeChildrenNameSurname,
                  value: 'changeChildrenNameSurname',
                },
                {
                  name: 'too_stopOtherPeopleDoingSomething_subfields',
                  label: l => l.allowMedicalTreatment,
                  value: 'allowMedicalTreatment',
                },
                {
                  name: 'too_stopOtherPeopleDoingSomething_subfields',
                  label: l => l.takingChildOnHoliday,
                  value: 'takingChildOnHoliday',
                },
                {
                  name: 'too_stopOtherPeopleDoingSomething_subfields',
                  label: l => l.relocateChildrenDifferentUkArea,
                  value: 'relocateChildrenDifferentUkArea',
                },
                {
                  name: 'too_stopOtherPeopleDoingSomething_subfields',
                  label: l => l.relocateChildrenOutsideUkCo,
                  value: 'relocateChildrenOutsideUkCo',
                },
              ],
            },
          },
        },
        {
          name: 'too_courtOrder',
          label: l => l.resolveSpecificIssue,
          value: 'resolveSpecificIssue',
          hint: l => l.resolveSpecificIssueHint,
          subFields: {
            too_resolveSpecificIssue_subfields: {
              id: 'too_resolveSpecificIssue_subfields',
              type: 'checkboxes',
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'too_resolveSpecificIssue_subfields',
                  label: l => l.specificHoliday,
                  value: 'specificHoliday',
                },
                {
                  name: 'too_resolveSpecificIssue_subfields',
                  label: l => l.whatSchoolChildrenWillGoTo,
                  value: 'whatSchoolChildrenWillGoTo',
                },
                {
                  name: 'too_resolveSpecificIssue_subfields',
                  label: l => l.religiousIssue,
                  value: 'religiousIssue',
                },
                {
                  name: 'too_resolveSpecificIssue_subfields',
                  label: l => l.changeChildrenNameSurnameA,
                  value: 'changeChildrenNameSurnameA',
                },
                {
                  name: 'too_resolveSpecificIssue_subfields',
                  label: l => l.medicalTreatment,
                  value: 'medicalTreatment',
                },
                {
                  name: 'too_resolveSpecificIssue_subfields',
                  label: l => l.relocateChildrenDifferentUkArea1,
                  value: 'relocateChildrenDifferentUkArea1',
                },
                {
                  name: 'too_resolveSpecificIssue_subfields',
                  label: l => l.relocateChildrenOutsideUk1,
                  value: 'relocateChildrenOutsideUk1',
                },
                {
                  name: 'too_resolveSpecificIssue_subfields',
                  label: l => l.returningChildrenToYourCare,
                  value: 'returningChildrenToYourCare',
                  hint: l => l.returningChildrenToYourCareHint,
                },
              ],
            },
          },
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
