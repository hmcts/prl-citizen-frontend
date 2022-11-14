import { Case, CaseWithId } from '../../app/case/case';
import { FormField, FormFields, FormFieldsFn } from '../../app/form/Form';

class PreProcessCaseData {
  public clean(
    fields: FormFields | FormFieldsFn,
    formData: Partial<Case>,
    caseData: Partial<CaseWithId>,
    byPass?: boolean
  ): CaseWithId {
    if (byPass) {
      return {
        ...caseData,
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
              this.checkValueConfigSubFields(valueConfig, formData, _caseData);
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
      { ...caseData }
    ) as CaseWithId;
  }

  private checkValueConfigSubFields(valueConfig, formData, _caseData) {
    // Guard clause checking for subFields
    if (!valueConfig.subFields) {
      return;
    }
    Object.entries(valueConfig.subFields as FormField).forEach(([subField, subFieldConfig]) => {
      //This condition satisfies for any field with data type array and as per the framework it works for checkboxes
      this.isFormDataArray(formData, subField, subFieldConfig);

      _caseData[subField] = formData[subField];
    });
  }

  private isFormDataArray(formData, subField, subFieldConfig) {
    // This fixes the framework issue with all array values empty for subfield checkbox when the parent checkbox is alone checked.
    // Introducing a guard clase and early return to reduce Cognitive Complexity
    if (!Array.isArray(formData)) {
      return;
    }

    if (!formData[subField].join(',').replace(/,/g, '')) {
      formData[subField] = [];
    }

    this.checkFormDataLengthAndReduce(formData, subField, subFieldConfig);
  }

  private checkFormDataLengthAndReduce(formData, subField, subFieldConfig) {
    // Guard clause to check if the length is 0
    if (!formData[subField].length) {
      return;
    }
    // This fixes the framework issue with array values empty along with sub options that were checked in subfield checkboxes.
    formData[subField] = subFieldConfig.values.reduce((subFieldFormValues, subFieldValueConfig: FormFields) => {
      this.isSubFieldValueConfigIncluded(formData, subField, subFieldValueConfig, subFieldFormValues);
    }, []);
  }

  private isSubFieldValueConfigIncluded(formData, subField, subFieldValueConfig, subFieldFormValues) {
    if (!formData[subField].includes[subFieldValueConfig.value]) {
      return subFieldFormValues;
    }
    subFieldFormValues.push(subFieldValueConfig.value);
  }
}

export default new PreProcessCaseData();
