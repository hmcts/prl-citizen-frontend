import { CaseWithId } from '../../../app/case/case';
import _ from 'lodash';
import { FieldsConfig, MandatoryFieldsConfig } from './definitions';

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

const isFieldFilled = (fieldConfig: MandatoryFieldsConfig, caseData: CaseWithId): boolean => {
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
    fieldValue = fieldValue.filter((value: any) => value !== '');
    return fieldConfig?.value ? fieldValue.includes(fieldConfig.value) : fieldValue.length > 0;
  }

  return false;
};

export const getMandatoryFields = (config, caseData: CaseWithId) => {
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

        mandatoryFields.push(mandatoryField);
      }
    });
  }

  return mandatoryFields;
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
