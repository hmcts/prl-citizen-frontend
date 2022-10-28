import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
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
});

const cy = () => ({
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
  allowMedicalTreatment: "Caniatáu i'r plant gael triniaeth feddygol",
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
  errors: {
    too_courtOrder: {
      required: 'Select  what you are asking the court to do - welsh',
    },
    too_stopOtherPeopleDoingSomethingSubField: {
      required: 'Specify what you want the court to stop the other people in the application doing - welsh',
    },
    too_resolveSpecificIssueSubField: {
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
            too_stopOtherPeopleDoingSomethingSubField: {
              id: 'too_stopOtherPeopleDoingSomethingSubField',
              type: 'checkboxes',
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'too_stopOtherPeopleDoingSomethingSubField',
                  label: l => l.changeChildrenNameSurname,
                  value: 'changeChildrenNameSurname',
                },
                {
                  name: 'too_stopOtherPeopleDoingSomethingSubField',
                  label: l => l.allowMedicalTreatment,
                  value: 'allowMedicalTreatment',
                },
                {
                  name: 'too_stopOtherPeopleDoingSomethingSubField',
                  label: l => l.takingChildOnHoliday,
                  value: 'takingChildOnHoliday',
                },
                {
                  name: 'too_stopOtherPeopleDoingSomethingSubField',
                  label: l => l.relocateChildrenDifferentUkArea,
                  value: 'relocateChildrenDifferentUkArea',
                },
                {
                  name: 'too_stopOtherPeopleDoingSomethingSubField',
                  label: l => l.relocateChildrenOutsideUk,
                  value: 'relocateChildrenOutsideUk',
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
            too_resolveSpecificIssueSubField: {
              id: 'too_resolveSpecificIssueSubField',
              type: 'checkboxes',
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'too_resolveSpecificIssueSubField',
                  label: l => l.specificHoliday,
                  value: 'specificHoliday',
                },
                {
                  name: 'too_resolveSpecificIssueSubField',
                  label: l => l.whatSchoolChildrenWillGoTo,
                  value: 'whatSchoolChildrenWillGoTo',
                },
                {
                  name: 'too_resolveSpecificIssueSubField',
                  label: l => l.religiousIssue,
                  value: 'religiousIssue',
                },
                {
                  name: 'too_resolveSpecificIssueSubField',
                  label: l => l.changeChildrenNameSurname1,
                  value: 'changeChildrenNameSurnameA',
                },
                {
                  name: 'too_resolveSpecificIssueSubField',
                  label: l => l.medicalTreatment,
                  value: 'medicalTreatment',
                },
                {
                  name: 'too_resolveSpecificIssueSubField',
                  label: l => l.relocateChildrenDifferentUkArea1,
                  value: 'relocateChildrenDifferentUkAreaA',
                },
                {
                  name: 'too_resolveSpecificIssueSubField',
                  label: l => l.relocateChildrenOutsideUk1,
                  value: 'relocateChildrenOutsideUkA',
                },
                {
                  name: 'too_resolveSpecificIssueSubField',
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
