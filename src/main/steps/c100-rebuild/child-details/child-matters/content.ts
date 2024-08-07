/* eslint-disable @typescript-eslint/no-explicit-any */
import { CaseWithId } from '../../../../app/case/case';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ChildrenDetails } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { getPartyDetails } from '../../people/util';
export * from '../routeGuard';

let updatedForm: FormContent;

export const en = () => ({
  title: 'Which of the decisions you’re asking the court to resolve relate to',
  orderAppliedFor: 'Orders applied for',
  bodyHint: 'Select all that apply',
  childArrangementsOrder: {
    whoChildLiveWith: 'Decide who the children live with and when',
    childTimeSpent: 'Decide how much time the children spend with each person',
  },
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
    relocateChildrenOutsideUkA:
      'Relocating the children outside of England and Wales (including Scotland and Northern Ireland)',
    returningChildrenToYourCare: 'Returning the children to your care',
  },
  errors: {
    needsResolution: {
      required: 'Select at least a decision',
    },
  },
});

export const cy = () => ({
  title: 'Pa un o’r penderfyniadau rydych chi’n gofyn i’r llys eu datrys sy’n ymwneud â',
  orderAppliedFor: 'Gorchmynion y gwnaed cais amdanynt',
  bodyHint: "Dewiswch bob un sy'n berthnasol",
  childArrangementsOrder: {
    whoChildLiveWith: 'Penderfynu gyda phwy y bydd y plant yn byw a phryd',
    childTimeSpent: 'Penderfynu faint o amser y bydd y plant yn ei dreulio gyda phob unigolyn',
  },
  stepsList: {
    changeChildrenNameSurname: "Newid enwau neu gyfenwau'r plant",
    allowMedicalTreatment: "Caniatáu i'r plant gael triniaeth feddygol",
    takingChildOnHoliday: "Mynd â'r plant ar wyliau",
    relocateChildrenDifferentUkArea: "Adleoli'r plant i ardal wahanol yng Nghymru a Lloegr",
    relocateChildrenOutsideUk: 'Adleoli’r plant y tu allan i Gymru a Lloegr(gan gynnwys Yr Alban a Gogledd Iwerddon)',
  },
  issueOrderList: {
    specificHoliday: 'Gwyliau neu drefniant penodol',
    whatSchoolChildrenWillGoTo: 'I ba ysgol y bydd y plant yn mynd iddi',
    religiousIssue: ' Mater crefyddol',
    changeChildrenNameSurnameA: "Newid enwau neu gyfenwau'r plant",
    medicalTreatment: 'Triniaeth feddygol',
    relocateChildrenDifferentUkAreaA: "Adleoli'r plant i ardal wahanol yng Nghymru a Lloegr",
    relocateChildrenOutsideUkA: 'Adleoli’r plant y tu allan i Gymru a Lloegr(gan gynnwys Yr Alban a Gogledd Iwerddon)',
    returningChildrenToYourCare: "Dychwelyd y plant i'ch gofal",
  },
  errors: {
    needsResolution: {
      required: 'Dylech o leiaf ddewis penderfyniad',
    },
  },
});

const languages = {
  en,
  cy,
};

const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };

  return updatedForm;
};

export const generateFormFields = (
  childMatters: ChildrenDetails['childMatters'],
  caseData: Partial<CaseWithId> = {},
  translations?: Record<string, any>
): GenerateDynamicFormFields => {
  const { too_courtOrder, too_stopOtherPeopleDoingSomethingSubField, too_resolveSpecificIssueSubField } = caseData;
  const { needsResolution } = childMatters;

  // preemptively removing empty strings from too_stopOtherPeopleDoingSomethingSubField retrieved from the userCase
  const filteredOtherPeopleDoingSomething = too_stopOtherPeopleDoingSomethingSubField?.filter(item => item) ?? [];
  // filtering out 'stopOtherPeopleDoingSomething' and 'resolveSpecificIssue' elements from the too_courtOrder array
  const filteredChildArrangementsOrderList =
    too_courtOrder
      ?.filter(item => item !== 'stopOtherPeopleDoingSomething')
      ?.filter(item => item !== 'resolveSpecificIssue') ?? [];

  const errors = {
    en: {},
    cy: {},
  };

  const fields = {
    needsResolution: {
      type: 'checkboxes',
      hint: l => l.bodyHint,
      validator: atLeastOneFieldIsChecked,
      values: [
        ...[],
        ...(filteredChildArrangementsOrderList?.map(order => {
          return {
            name: 'needsResolution',
            label: translations?.childArrangementsOrder?.[order],
            value: order,
          };
        }) ?? []),
        ...(filteredOtherPeopleDoingSomething?.map(order => {
          return {
            name: 'needsResolution',
            label: translations?.stepsList?.[order],
            value: order,
          };
        }) ?? []),
        ...(<[]>too_resolveSpecificIssueSubField?.map(order => {
          return {
            name: 'needsResolution',
            label: translations?.issueOrderList?.[order],
            value: order,
          };
        }) ?? []),
      ],
    },
  };

  // mark the selection for the check boxes based on the option chosen
  fields.needsResolution.values = fields.needsResolution.values.map(config =>
    needsResolution.includes(config.value) ? { ...config, selected: true } : config
  );

  return { fields, errors };
};

export const form: FormContent = {
  fields: {
    _ctx: {
      type: 'hidden',
      labelHidden: true,
      value: 'cm',
    },
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const getFormFields = (caseData: Partial<CaseWithId>, childId: ChildrenDetails['id']): FormContent => {
  const childDetails = getPartyDetails(childId, caseData?.cd_children) as ChildrenDetails;

  return updateFormFields(form, generateFormFields(childDetails.childMatters ?? {}, caseData ?? {}).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const childId = content.additionalData!.req.params.childId;
  const childDetails = getPartyDetails(childId, content.userCase!.cd_children) as ChildrenDetails;
  const { fields } = generateFormFields(childDetails.childMatters, content.userCase, translations);

  return {
    ...translations,
    title: `${translations['title']} ${childDetails.firstName} ${childDetails.lastName}`,
    form: updateFormFields(form, fields),
  };
};
