import _ from 'lodash';

import { CaseWithId } from '../../../app/case/case';
import {
  C100Applicant,
  C100FlowTypes,
  C100RebuildPartyDetails,
  ChildrenDetails,
  Gender,
  OtherChildrenDetails,
  PartyType,
  YesNoDontKnow,
  YesNoEmpty,
  YesOrNo,
} from '../../../app/case/definition';
import { getC100FlowType } from '../utils';

import { FieldConfig, FieldsConfig, MandatoryFieldsConfig } from './definitions';
import {
  ChildrenPostcodeFieldsConfig,
  ConsentOrderFieldsConfig,
  HelpWithFeesFieldsConfig,
  InternationalElementsFieldsConfig,
  MiamQuestionsFieldsConfig,
  OtherProceedingsFieldsConfig,
  PeopleFieldsConfig,
  ReasonableAdjustmentsFieldsConfig,
  SafetyConcernsFieldsConfig,
  ScreeningQuestionsFieldsConfig,
  TypeOfOrderFieldsConfig,
  UrgenceyAndWithoutNoticeFieldsConfig,
} from './fields-config/config';

const isMandatoryFieldBasedOnCondition = (
  fieldsConfig: FieldsConfig,
  fieldCondition: {
    fieldName: string;
    fieldType?: string;
    value?: string;
    expression?: (caseData: CaseWithId) => { isMandatory: boolean };
    property?: string;
  },
  caseData: CaseWithId
): boolean => {
  const fieldName = fieldCondition.fieldName;
  const fieldType = fieldCondition.fieldType ?? fieldsConfig?.[fieldName]?.fieldType;

  if (fieldType && caseData?.[fieldName]) {
    if (_.isFunction(fieldCondition.expression)) {
      return fieldCondition.expression(caseData).isMandatory;
    }

    return isFieldFilled(
      {
        fieldName: fieldCondition.fieldName,
        value: fieldCondition.value,
        expression: fieldCondition.expression,
        property: fieldCondition.property,
        fieldMeta: {
          fieldType,
          items: fieldsConfig?.[fieldName]?.items ?? {},
          properties: fieldsConfig?.[fieldName]?.properties ?? {},
        },
      },
      caseData
    );
  }

  return false;
};

const getFieldType = (fieldConfig: { fieldName: string; fieldType: string }, caseData: CaseWithId): string => {
  if (isFieldTypeString(fieldConfig, caseData)) {
    return 'string';
  } else if (isFieldTypeArray(fieldConfig, caseData)) {
    return 'array';
  } else if (isFieldTypeObject(fieldConfig, caseData)) {
    return 'object';
  }
  return '';
};

const isFieldTypeArray = (fieldConfig: { fieldName: string; fieldType: string }, caseData: CaseWithId) =>
  fieldConfig.fieldType === 'array' && _.isArray(caseData?.[fieldConfig.fieldName]);

const isFieldTypeString = (fieldConfig: { fieldName: string; fieldType: string }, caseData: CaseWithId) =>
  fieldConfig.fieldType === 'string' && _.isString(caseData?.[fieldConfig.fieldName]);

const isFieldTypeObject = (fieldConfig: { fieldName: string; fieldType: string }, caseData: CaseWithId) =>
  fieldConfig.fieldType === 'object' && _.isObject(caseData?.[fieldConfig.fieldName]);

export const isFieldFilled = (fieldConfig: MandatoryFieldsConfig, caseData: CaseWithId): boolean => {
  if (_.isFunction(fieldConfig.expression)) {
    return fieldConfig.expression(caseData).isMandatory;
  }

  const fieldType = getFieldType(
    { fieldName: fieldConfig.fieldName, fieldType: fieldConfig.fieldMeta.fieldType },
    caseData
  );
  let fieldValue = _.get(caseData, fieldConfig.fieldName);

  if (fieldType === 'string') {
    return fieldConfig?.value ? fieldValue === fieldConfig.value : !!fieldValue;
  } else if (fieldType === 'array') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fieldValue = fieldValue.filter((value: any) => value !== '');
    return fieldConfig?.value ? fieldValue.includes(fieldConfig.value) : fieldValue.length > 0;
  }

  return false;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getMandatoryFields = (config, caseData: CaseWithId): MandatoryFieldsConfig[] => {
  const mandatoryFields: MandatoryFieldsConfig[] = [];
  const fieldsConfig: FieldsConfig = {};

  if (config.fields.length) {
    config.fields.forEach(field => {
      fieldsConfig[field.fieldName] = { ...field };
      const hasCondition = !!field?.mandatory_if;
      const hasIfCondition = hasCondition && !!field.mandatory_if?.fieldName;
      const hasIfAndCondition = hasCondition && !!field.mandatory_if?.and;
      const hasIfOrCondition = hasCondition && !!field.mandatory_if?.or;
      const hasOnlyExpression = !hasCondition && _.isFunction(field.expression);

      console.info(hasCondition, hasIfCondition, hasIfAndCondition, hasIfOrCondition);
      if (
        !hasCondition ||
        (hasOnlyExpression && !field.expression(caseData).fulfilled) ||
        (hasIfCondition && isMandatoryFieldBasedOnCondition(fieldsConfig, field.mandatory_if, caseData)) ||
        (hasIfAndCondition &&
          field.mandatory_if.and.every(_field => isMandatoryFieldBasedOnCondition(fieldsConfig, _field, caseData))) ||
        (hasIfOrCondition &&
          field.mandatory_if.or.some(_field => isMandatoryFieldBasedOnCondition(fieldsConfig, _field, caseData)))
      ) {
        mandatoryFields.push(generateMandatoryField(field));
      }
    });
  }

  return mandatoryFields;
};

const generateMandatoryField = (field: FieldConfig): MandatoryFieldsConfig => {
  const mandatoryField = {
    fieldName: field.fieldName,
    fieldMeta: {
      fieldType: field.fieldType,
    },
  };

  if (field?.expression) {
    Object.assign(mandatoryField, {
      expression: field.expression,
    });
  }

  if (field?.value) {
    Object.assign(mandatoryField, {
      value: field.value,
    });
  }

  if (field?.property) {
    Object.assign(mandatoryField, {
      property: field.property,
    });
  }

  if (field?.items) {
    Object.assign(mandatoryField.fieldMeta, {
      items: field.value,
    });
  }

  if (field?.properties) {
    Object.assign(mandatoryField.fieldMeta, {
      value: field.properties,
    });
  }

  return mandatoryField;
};

export const isAllMandatoryFieldsFilled = (mandatoryFields: MandatoryFieldsConfig[], caseData: CaseWithId): boolean => {
  return mandatoryFields.every(field => isFieldFilled(field, caseData));
};

export const isAtleastOneMandatoryFieldFilled = (
  mandatoryFields: MandatoryFieldsConfig[],
  caseData: CaseWithId
): boolean => {
  return mandatoryFields.some(field => isFieldFilled(field, caseData));
};

export const getAllMandatoryFields = (caseData: CaseWithId): MandatoryFieldsConfig[] => {
  const mandatoryFields: MandatoryFieldsConfig[] = [];
  mandatoryFields.push(...getMandatoryFields(ChildrenPostcodeFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(ScreeningQuestionsFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(TypeOfOrderFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(OtherProceedingsFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(UrgenceyAndWithoutNoticeFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(PeopleFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(SafetyConcernsFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(InternationalElementsFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(ReasonableAdjustmentsFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(HelpWithFeesFieldsConfig, caseData));

  if (getC100FlowType(caseData) === C100FlowTypes.C100_WITH_CONSENT_ORDER) {
    mandatoryFields.push(...getMandatoryFields(ConsentOrderFieldsConfig, caseData));
  } else {
    mandatoryFields.push(...getMandatoryFields(MiamQuestionsFieldsConfig, caseData));
  }

  return mandatoryFields;
};

export const getAllMandatoryFieldsWithoutPeopleSection = (caseData: CaseWithId): MandatoryFieldsConfig[] => {
  const mandatoryFields: MandatoryFieldsConfig[] = [];
  mandatoryFields.push(...getMandatoryFields(ChildrenPostcodeFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(ScreeningQuestionsFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(TypeOfOrderFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(OtherProceedingsFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(UrgenceyAndWithoutNoticeFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(SafetyConcernsFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(InternationalElementsFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(ReasonableAdjustmentsFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(HelpWithFeesFieldsConfig, caseData));

  if (getC100FlowType(caseData) === C100FlowTypes.C100_WITH_CONSENT_ORDER) {
    mandatoryFields.push(...getMandatoryFields(ConsentOrderFieldsConfig, caseData));
  } else {
    mandatoryFields.push(...getMandatoryFields(MiamQuestionsFieldsConfig, caseData));
  }

  return mandatoryFields;
};

export const isApplicantValid = (applicant: C100Applicant): boolean => {
  return (
    !_.isEmpty(applicant.applicantFirstName) &&
    !_.isEmpty(applicant.applicantLastName) &&
    !_.isEmpty(applicant.detailsKnown) &&
    (!_.isEmpty(applicant.start) || !_.isEmpty(applicant.startAlternative)) &&
    (applicant.startAlternative === YesOrNo.YES ? !_.isEmpty(applicant.contactDetailsPrivateAlternative) : true) &&
    (applicant.start === YesOrNo.YES ? !_.isEmpty(applicant.contactDetailsPrivate) : true) &&
    !_.isEmpty(applicant.personalDetails) &&
    !_.isEmpty(applicant.personalDetails.haveYouChangeName) &&
    (applicant.personalDetails.haveYouChangeName === YesNoEmpty.YES
      ? !_.isEmpty(applicant.personalDetails.applPreviousName)
      : true) &&
    !_.isEmpty(applicant.personalDetails.dateOfBirth) &&
    !_.isEmpty(applicant.personalDetails.gender) &&
    (applicant.personalDetails.gender === Gender.OTHER
      ? !_.isEmpty(applicant.personalDetails.otherGenderDetails)
      : true) &&
    !_.isEmpty(applicant.personalDetails.applicantPlaceOfBirth) &&
    !_.isEmpty(applicant.liveInRefuge) &&
    (applicant.liveInRefuge === YesOrNo.YES ? !_.isEmpty(applicant.refugeConfidentialityC8Form) : true) &&
    !_.isEmpty(applicant.applicantAddress1) &&
    !_.isEmpty(applicant.applicantAddressTown) &&
    !_.isEmpty(applicant.country) &&
    !_.isEmpty(applicant.applicantAddressHistory) &&
    (applicant.applicantAddressHistory === YesOrNo.YES
      ? !_.isEmpty(applicant.applicantProvideDetailsOfPreviousAddresses)
      : true) &&
    !_.isEmpty(applicant.applicantContactDetail) &&
    !_.isEmpty(applicant.applicantContactDetail.canProvideEmail) &&
    (applicant.applicantContactDetail.canProvideEmail === YesOrNo.YES
      ? !_.isEmpty(applicant.applicantContactDetail.emailAddress)
      : true) &&
    !_.isEmpty(applicant.applicantContactDetail.canProvideTelephoneNumber) &&
    (applicant.applicantContactDetail.canProvideTelephoneNumber === YesOrNo.YES
      ? !_.isEmpty(applicant.applicantContactDetail.telephoneNumber)
      : !_.isEmpty(applicant.applicantContactDetail.canNotProvideTelephoneNumberReason)) &&
    !_.isEmpty(applicant.applicantContactDetail.canLeaveVoiceMail) &&
    !_.isEmpty(applicant.applicantContactDetail.applicantContactPreferences) &&
    !_.isEmpty(applicant.relationshipDetails?.relationshipToChildren)
  );
};

export const isRespondentValid = (respondent: C100RebuildPartyDetails, partyType: PartyType): boolean => {
  const addressHistory =
    !_.isEmpty(respondent.address.addressHistory) && respondent.address.addressHistory === YesNoDontKnow.yes
      ? !_.isEmpty(respondent.address.provideDetailsOfPreviousAddresses)
      : true;
  return (
    //check
    !_.isEmpty(respondent.firstName) &&
    !_.isEmpty(respondent.lastName) &&
    !_.isEmpty(respondent.personalDetails) &&
    !_.isEmpty(respondent.personalDetails.hasNameChanged) &&
    (respondent.personalDetails.hasNameChanged === YesNoDontKnow.yes
      ? !_.isEmpty(respondent.personalDetails.previousFullName)
      : true) &&
    (respondent.personalDetails.isDateOfBirthUnknown === YesNoEmpty.YES
      ? !_.isEmpty(respondent.personalDetails.approxDateOfBirth)
      : !_.isEmpty(respondent.personalDetails.dateOfBirth)) &&
    !_.isEmpty(respondent.personalDetails.gender) &&
    !_.isEmpty(respondent.relationshipDetails?.relationshipToChildren) &&
    !_.isEmpty(respondent.address) &&
    (partyType === PartyType.RESPONDENT ? addressHistory : true) &&
    (respondent.addressUnknown === undefined
      ? !_.isEmpty(respondent.address.AddressLine1) &&
        !_.isEmpty(respondent.address.PostTown) &&
        !_.isEmpty(respondent.address.Country)
      : true) &&
    !_.isEmpty(respondent.contactDetails) &&
    (respondent.contactDetails.donKnowEmailAddress === undefined
      ? !_.isEmpty(respondent.contactDetails.emailAddress)
      : true) &&
    (respondent.contactDetails.donKnowTelephoneNumber === undefined
      ? !_.isEmpty(respondent.contactDetails.telephoneNumber)
      : true)
  );
};

export const isChildValid = (child: ChildrenDetails): boolean => {
  return (
    !_.isEmpty(child.firstName) &&
    !_.isEmpty(child.lastName) &&
    areChildPersonalDetailsValid(child) &&
    !_.isEmpty(child.childMatters.needsResolution) &&
    !_.isEmpty(child.parentialResponsibility.statement) &&
    !_.isEmpty(child.liveWith) &&
    !_.isEmpty(child.mainlyLiveWith)
  );
};

export const areChildPersonalDetailsValid = (child: ChildrenDetails | OtherChildrenDetails): boolean => {
  return (
    !_.isEmpty(child.personalDetails) &&
    (child.personalDetails.isDateOfBirthUnknown && child.personalDetails.isDateOfBirthUnknown === YesNoEmpty.NO
      ? !_.isEmpty(child.personalDetails.dateOfBirth)
      : !_.isEmpty(child.personalDetails.approxDateOfBirth)) &&
    !_.isEmpty(child.personalDetails.gender)
  );
};

export const isOtherChildValid = (child: OtherChildrenDetails): boolean => {
  return !_.isEmpty(child.firstName) && !_.isEmpty(child.lastName) && areChildPersonalDetailsValid(child);
};
