import { resonableAdjustmentHelper } from './reasonableAdjustment';

describe('Reasonable Adjustment Helper Test', () => {
  test('resonableAdjustmentHelper() method', () => {
    const keys = {
      field1: 'test',
      field2: 'test',
      subfield1: 'test',
      subfield2: 'test',
    };
    const userCase = {
      ra_nestedFiled: ['field1', 'field2'],
      ra_field2_subfield: ['subfield1', 'subfield2'],
    };
    const reasonableAdjustments = resonableAdjustmentHelper(userCase, keys, 'ra_nestedFiled');
    expect(reasonableAdjustments).toEqual('<li>test</li><li>test : subfield1,subfield2</li>');
  });
});
