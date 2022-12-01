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
              if (valueConfig.subFields) {
                Object.entries(valueConfig.subFields as FormField).forEach(([subField, subFieldConfig]) => {
                  //This condition satisfies for any field with data type array and as per the framework it works for checkboxes
                  if (Array.isArray(formData[subField])) {
                    // This fixes the framework issue with all array values empty for subfield checkbox when the parent checkbox is alone checked.
                    if (!formData[subField].join(',').replace(/,/g, '')) {
                      formData[subField] = [];
                    }

                    if (formData[subField].length) {
                      // This fixes the framework issue with array values empty along with sub options that were checked in subfield checkboxes.
                      formData[subField] = subFieldConfig.values.reduce(
                        (subFieldFormValues, subFieldValueConfig: FormFields) => {
                          if (formData[subField].includes(subFieldValueConfig.value)) {
                            subFieldFormValues.push(subFieldValueConfig.value);
                          }
                          return subFieldFormValues;
                        },
                        []
                      );
                    }
                  }

                  _caseData[subField] = formData[subField];
                });
              }
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
