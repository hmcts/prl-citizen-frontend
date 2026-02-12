import _ from 'lodash';

import { CaseWithId } from '../../../app/case/case';
import {
  C100FlowTypes,
  C100RebuildPartyDetails,
  C1AAbuseTypes,
  ChildrenDetails,
  OtherChildrenDetails,
  PartyType,
  YesNoDontKnow,
  YesNoEmpty,
  YesOrNo,
} from '../../../app/case/definition';
import { isEmailValid, isPhoneNoValid } from '../../../app/form/validation';
import { doesAnyChildLiveWithOtherPerson } from '../other-person-details/utils';
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

export const getAllMandatoryFields = (
  caseData: CaseWithId,
  peopleSectionRequired: boolean
): MandatoryFieldsConfig[] => {
  const mandatoryFields: MandatoryFieldsConfig[] = [];
  mandatoryFields.push(...getMandatoryFields(ChildrenPostcodeFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(ScreeningQuestionsFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(TypeOfOrderFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(OtherProceedingsFieldsConfig, caseData));
  mandatoryFields.push(...getMandatoryFields(UrgenceyAndWithoutNoticeFieldsConfig, caseData));
  if (peopleSectionRequired) {
    mandatoryFields.push(...getMandatoryFields(PeopleFieldsConfig, caseData));
  }
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

const isRespondentValid = (
  respondent: C100RebuildPartyDetails,
  partyType: PartyType,
  children: ChildrenDetails[]
): boolean => {
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
    respondent.relationshipDetails?.relationshipToChildren.length === children.length &&
    !_.isEmpty(respondent.address) &&
    (partyType === PartyType.RESPONDENT ? !_.isEmpty(respondent.address.addressHistory) : true) &&
    (respondent.addressUnknown === undefined
      ? !_.isEmpty(respondent.address.AddressLine1) &&
        !_.isEmpty(respondent.address.PostTown) &&
        !_.isEmpty(respondent.address.Country)
      : true) &&
    !_.isEmpty(respondent.contactDetails) &&
    (respondent.contactDetails.donKnowEmailAddress === undefined
      ? !_.isEmpty(respondent.contactDetails.emailAddress) &&
        isEmailValid(respondent.contactDetails.emailAddress) !== 'invalid'
      : true) &&
    (respondent.contactDetails.donKnowTelephoneNumber === undefined
      ? !_.isEmpty(respondent.contactDetails.telephoneNumber) &&
        isPhoneNoValid(respondent.contactDetails.telephoneNumber) !== 'invalid'
      : true)
  );
};

const isChildValid = (child: ChildrenDetails): boolean => {
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

const areChildPersonalDetailsValid = (child: ChildrenDetails | OtherChildrenDetails): boolean => {
  return (
    !_.isEmpty(child.personalDetails) &&
    (child.personalDetails.isDateOfBirthUnknown && child.personalDetails.isDateOfBirthUnknown === YesNoEmpty.NO
      ? !_.isEmpty(child.personalDetails.dateOfBirth)
      : !_.isEmpty(child.personalDetails.approxDateOfBirth)) &&
    !_.isEmpty(child.personalDetails.gender)
  );
};

const isOtherChildValid = (child: OtherChildrenDetails): boolean => {
  return !_.isEmpty(child.firstName) && !_.isEmpty(child.lastName) && areChildPersonalDetailsValid(child);
};

export const isPermissionWhyCompleted = (caseData: CaseWithId): boolean => {
  return (
    caseData?.sq_writtenAgreement === YesOrNo.NO &&
    !_.isEmpty(caseData?.sq_courtPermissionRequired) &&
    (_.isEmpty(caseData?.sq_permissionsWhy) ||
      (caseData.sq_permissionsWhy?.every(subField => {
        if (subField === 'courtOrderPrevent') {
          return true;
        }
        return !_.isEmpty(caseData[`sq_${subField}_subfield`]);
      }) ??
        true))
  );
};

export const isPermissionWhyMandatory = (caseData: CaseWithId): boolean => {
  return (
    caseData?.sq_writtenAgreement === YesOrNo.NO &&
    !_.isEmpty(caseData?.sq_courtPermissionRequired) &&
    !_.isEmpty(caseData?.sq_permissionsWhy)
  );
};

export const areChildrenValid = (caseData: CaseWithId): boolean => {
  return !!(
    caseData?.cd_children?.every(child => isChildValid(child)) &&
    caseData?.cd_childrenKnownToSocialServices &&
    caseData?.cd_childrenSubjectOfProtectionPlan &&
    (caseData?.cd_childrenKnownToSocialServices === YesOrNo.YES
      ? !_.isEmpty(caseData.cd_childrenKnownToSocialServicesDetails)
      : true)
  );
};

export const areOtherChildrenValid = (caseData: CaseWithId): boolean =>
  caseData.ocd_otherChildren?.every(child => isOtherChildValid(child)) ?? false;

export const areRespondentsValid = (caseData: CaseWithId): boolean =>
  caseData?.resp_Respondents?.every(respondent =>
    isRespondentValid(respondent, PartyType.RESPONDENT, caseData.cd_children ?? [])
  ) ?? false;

export const areOtherPeopleValid = (caseData: CaseWithId): boolean => {
  return (
    caseData?.oprs_otherPersons?.every(
      respondent =>
        isRespondentValid(respondent, PartyType.OTHER_PERSON, caseData.cd_children ?? []) &&
        !_.isEmpty(respondent.liveInRefuge) &&
        (respondent.liveInRefuge === YesOrNo.YES ? !_.isEmpty(respondent.refugeConfidentialityC8Form) : true) &&
        !caseData.oprs_otherPersons?.find(
          otherPerson =>
            doesAnyChildLiveWithOtherPerson(caseData, otherPerson.id) &&
            _.isEmpty(otherPerson.isOtherPersonAddressConfidential)
        )
    ) ?? false
  );
};

export const areOtherProceedingsInvalid = (caseData: CaseWithId): boolean => {
  const orders = caseData?.op_otherProceedings?.order ? Object.keys(caseData.op_otherProceedings.order) : [];

  return caseData?.op_courtProceedingsOrders?.length && orders.length
    ? orders.some(order =>
        caseData.op_otherProceedings?.order?.[order].some(
          orderItem => orderItem?.orderCopy === 'Yes' && !orderItem?.orderDocument?.filename
        )
      )
    : false;
};

export const isMiamDomesticAbuseValid = (caseData: CaseWithId): boolean => {
  return (
    caseData.miam_domesticAbuse?.every(subField => {
      if (_.isArray(caseData[`miam_domesticAbuse_${subField}_subfields`])) {
        return caseData[`miam_domesticAbuse_${subField}_subfields`].some(subSubField => !_.isEmpty(subSubField));
      }
      return !_.isEmpty(subField);
    }) ?? true
  );
};

export const areSafetyConcernsValid = (caseData: CaseWithId): boolean => {
  const childSafetyConcerns = caseData?.c1A_concernAboutChild || [];
  let isMandatory = false;

  if (childSafetyConcerns.length >= 1 && childSafetyConcerns[0] !== 'abduction') {
    isMandatory = childSafetyConcerns
      .filter(
        concern =>
          concern !== C1AAbuseTypes.ABDUCTION &&
          concern !== C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE &&
          concern !== C1AAbuseTypes.SOMETHING_ELSE
      )
      .every(concern => {
        const safetyConern = caseData?.c1A_safteyConcerns?.child?.[concern];

        return !_.isEmpty(safetyConern) && !_.isEmpty(safetyConern.childrenConcernedAbout);
      });
  }

  return isMandatory;
};

export const isSafetyConcernsMandatory = (caseData: CaseWithId): boolean => {
  return (
    (caseData?.c1A_concernAboutChild?.filter(
      concern =>
        concern !== C1AAbuseTypes.ABDUCTION &&
        concern !== C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE &&
        concern !== C1AAbuseTypes.SOMETHING_ELSE
    ).length ?? 0) > 0
  );
};
