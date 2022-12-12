import { Case, CaseWithId } from '../../app/case/case';
import { FormField, FormFields, FormFieldsFn } from '../../app/form/Form';

class PreProcessCaseData {
  private removeAllEmpty(formValues, field): Partial<Case> {
    const formData: Partial<Case> = { ...formValues };

    if (!formData[field].join(',').replace(/,/g, '')) {
      formData[field] = [];
    }

    return formData;
  }

  private removeOnlyEmpty(fieldConfig, fieldValue): string[] {
    return fieldConfig.values.reduce((fieldFormValues, fieldValueConfig: FormFields) => {
      if (fieldValue.includes(fieldValueConfig.value)) {
        fieldFormValues.push(fieldValueConfig.value);
      }
      return fieldFormValues;
    }, []);
  }

  private removeEmptyValues(formValues, subFields): Partial<CaseWithId> {
    const caseData: Partial<CaseWithId> = {};
    const formData: Partial<Case> = { ...formValues };

    if (subFields) {
      Object.entries(subFields as FormField).forEach(([subField, subFieldConfig]) => {
        //This condition satisfies for any field with data type array and as per the framework it works for checkboxes
        if (Array.isArray(formData[subField])) {
          // This fixes the framework issue with all array values empty for subfield checkbox when the parent checkbox is alone checked.
          Object.assign(formData, this.removeAllEmpty(formData, subField));

          if (formData[subField].length) {
            // This fixes the framework issue with array values empty along with sub options that were checked in subfield checkboxes.
            formData[subField] = this.removeOnlyEmpty(subFieldConfig, formData[subField]);
          }
        }

        caseData[subField] = formData[subField];
      });
    }

    return caseData;
  }

  public clean(
    fields: FormFields | FormFieldsFn,
    formData: Partial<Case>,
    caseData: Partial<CaseWithId>,
    byPass?: boolean
  ): CaseWithId {
    if (byPass) {
      return {
        ...(caseData ?? {}),
        ...formData,
      } as CaseWithId;
    }

    return Object.entries(typeof fields === 'function' ? fields(caseData) : (fields as FormField)).reduce(
      (_caseData: Partial<CaseWithId>, [field, fieldConfig]) => {
        const { type: fieldType, values: fieldValues } = fieldConfig;
        const formFieldValue = formData[field];

        _caseData[field] = formFieldValue; // assign the form data to caseData

        if (['radios', 'checkboxes'].includes(fieldType) && fieldValues.length) {
          // clean up the caseData for field types radios & checkboxes
          fieldValues.forEach(valueConfig => {
            const fieldValue = Array.isArray(formFieldValue) ? formFieldValue : [formFieldValue];

            if (fieldValue.includes(valueConfig.value)) {
              // if form data value matches with the field values config value
              Object.assign(_caseData, this.removeEmptyValues(formData, valueConfig.subFields));
            } else {
              // if the field values config value is not present in form data then clean up other subfield data from caseData for the fields that has subfields
              if (valueConfig.subFields) {
                Object.keys(valueConfig.subFields).forEach(subField => {
                  delete _caseData[subField];
                });
              }
            }
          });
        }

        return _caseData;
      },
      { ...(caseData ?? {}) }
    ) as CaseWithId;
  }
}

export default new PreProcessCaseData();
