import { FormField } from './Form';
import { covertToDateObject, setupCheckboxParser } from './parser';

describe('Parser', () => {
  describe('covertToDateObject()', () => {
    test('Should covert object with different date properties to 1 property', async () => {
      const date = {
        'date-day': '1',
        'date-month': '1',
        'date-year': '1',
      };

      expect(covertToDateObject('date', date)).toStrictEqual({
        day: '1',
        month: '1',
        year: '1',
      });
    });
  });

  describe('setupCheckboxParser()', () => {
    test('correctly sets up checkbox parser when type is a checkbox', () => {
      const mockFormWithCheckbox = {
        checkboxField: {
          type: 'checkboxes',
          values: [
            { name: 'checkboxField', value: 'checked1' },
            { name: 'checkboxField', value: 'checked2' },
            { name: 'checkboxField', value: 'checked3' },
          ],
        } as FormField,
      };

      setupCheckboxParser(false)(Object.entries(mockFormWithCheckbox)[0]);

      const mockFormData = { checkboxField: ['', 'checked1', 'checked2'] };
      const actual = mockFormWithCheckbox.checkboxField.parser?.(mockFormData);

      expect(actual).toEqual([['checkboxField', ['checked1', 'checked2']]]);
    });

    test('correctly sets up checkbox parser when type is a checkbox and only 1 checkbox is present', () => {
      const mockFormWithCheckbox = {
        checkboxField: {
          type: 'checkboxes',
          values: [{ name: 'checkboxField', value: 'checked' }],
        } as FormField,
      };

      setupCheckboxParser(false)(Object.entries(mockFormWithCheckbox)[0]);

      const mockFormData = { checkboxField: ['', 'checked', 'checked'] };
      const actual = mockFormWithCheckbox.checkboxField.parser?.(mockFormData);

      expect(actual).toEqual([['checkboxField', 'checked']]);
    });

    test.each([
      { isSaveAndSignOut: false, expectedEmpty: '' },
      { isSaveAndSignOut: true, expectedEmpty: null },
    ])('correctly handles unchecked checkboxes when saving & signing out', ({ isSaveAndSignOut, expectedEmpty }) => {
      const mockFormWithCheckbox = {
        checkboxField: {
          type: 'checkboxes',
          values: [{ value: 'checked' }],
        } as FormField,
      };

      setupCheckboxParser(isSaveAndSignOut)(Object.entries(mockFormWithCheckbox)[0]);

      const mockFormData = { checkboxField: [''] };
      const actual = mockFormWithCheckbox.checkboxField.parser?.(mockFormData);

      expect(actual).toEqual([['checkboxField', expectedEmpty]]);
    });
  });
});
