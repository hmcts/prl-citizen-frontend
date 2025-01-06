import { generateDetailsKnownYesField } from './utils';

describe('confidentiality utils', () => {
  let contactDetailsPrivateForm;
  let contactDetailsPrivateAlternativeForm;
  beforeEach(() => {
    contactDetailsPrivateForm = {
      label: 'label',
      value: 'Yes',
      subFields: {
        contactDetailsPrivate: {
          type: 'string',
          hint: 'hint',
          validator: 'validator',
          values: [
            {
              name: 'contactDetailsPrivate',
              label: 'address',
              value: 'address',
            },
            {
              name: 'contactDetailsPrivate',
              label: 'telephone',
              value: 'telephone',
            },
            {
              name: 'contactDetailsPrivate',
              label: 'email',
              value: 'email',
            },
          ],
        },
      },
    };

    contactDetailsPrivateAlternativeForm = {
      label: 'label',
      value: 'Yes',
      subFields: {
        contactDetailsPrivateAlternative: {
          type: 'string',
          hint: 'hint',
          validator: 'validator',
          values: [
            {
              name: 'contactDetailsPrivate',
              label: 'address',
              value: 'address',
            },
            {
              name: 'contactDetailsPrivate',
              label: 'telephone',
              value: 'telephone',
            },
            {
              name: 'contactDetailsPrivate',
              label: 'email',
              value: 'email',
            },
          ],
        },
      },
    };
  });

  test('generateDetailsKnownFieldYes should return correct values for contactDetailsPrivate when value is yes', () => {
    const generatedDetails = generateDetailsKnownYesField(
      contactDetailsPrivateForm,
      ['address', 'telephone', 'email'],
      false
    );

    expect(generatedDetails.subFields.contactDetailsPrivate.values[0].attributes.checked).toBe(true);
    expect(generatedDetails.subFields.contactDetailsPrivate.values[1].attributes.checked).toBe(true);
    expect(generatedDetails.subFields.contactDetailsPrivate.values[2].attributes.checked).toBe(true);
  });

  test('generateDetailsKnownFieldYes should not change any values for contactDetailsPrivate when value is no', () => {
    contactDetailsPrivateForm.value = 'No';
    const generatedDetails = generateDetailsKnownYesField(
      contactDetailsPrivateForm,
      ['address', 'telephone', 'email'],
      false
    );

    expect(generatedDetails).toStrictEqual(contactDetailsPrivateForm);
  });

  test('generateDetailsKnownFieldYes should return correct values for contactDetailsPrivateAlternative when value is yes', () => {
    const generatedDetails = generateDetailsKnownYesField(
      contactDetailsPrivateAlternativeForm,
      ['address', 'telephone', 'email'],
      true
    );

    expect(generatedDetails.subFields.contactDetailsPrivateAlternative.values[0].attributes.checked).toBe(true);
    expect(generatedDetails.subFields.contactDetailsPrivateAlternative.values[1].attributes.checked).toBe(true);
    expect(generatedDetails.subFields.contactDetailsPrivateAlternative.values[2].attributes.checked).toBe(true);
  });

  test('generateDetailsKnownFieldYes should not change any values for contactDetailsPrivateAlternative when value is no', () => {
    contactDetailsPrivateAlternativeForm.value = 'No';
    const generatedDetails = generateDetailsKnownYesField(
      contactDetailsPrivateAlternativeForm,
      ['address', 'telephone', 'email'],
      true
    );

    expect(generatedDetails).toStrictEqual(contactDetailsPrivateAlternativeForm);
  });
});
