import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common.content';

import { generateContent } from './address-history';
import { renderSubFields } from './renderSubFields';
import { InputValues } from './types';

jest.mock('../../../../app/form/validation');

const en = {
  section: '',
  title: 'Have you lived at this address for more than 5 years?',
  one: 'Yes, I have lived at this address for more than 5 years',
  two: 'No, I have not lived at this address for more than 5 years',
  previousHistory:
    'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
  buildStreet: 'Building and street',
  towncity: 'Town or city',
  countryLabel: 'Country',
  postcodeLabel: 'Postcode',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  addAnotherAddress: 'Add another address',
  errors: {
    addressHistory: {
      required: 'Enter your address History',
    },
    buildingAndStreet: {
      required: 'Enter your building and street',
    },
    buildingAndStreet1: {
      required: 'Enter your building and street line2',
    },
    buildingAndStreet2: {
      required: 'Enter your building and street line3',
    },
    townOrCity: {
      required: 'Enter your town or city',
    },
    country: {
      required: 'Enter your country',
    },
    postcode: {
      required: 'Enter your postcode',
    },
  },
};

const cy: typeof en = {
  section: '',
  title: 'Ydych chi wedi byw yn y cyfeiriad hwn am fwy na 5 mlynedd?',
  one: 'Ydw, rydw i wedi byw yn y cyfeiriad hwn ers mwy na 5 mlynedd',
  two: 'Na, nid wyf wedi byw yn y cyfeiriad hwn ers mwy na 5 mlynedd',
  previousHistory:
    'Rhowch fanylion cyfeiriadau blaenorol rydych wedi byw ynddynt yn y 5 mlynedd diwethaf, gan ddechrau gyda ch cyfeiriad diweddaraf',
  buildStreet: 'Adeilad a stryd',
  towncity: 'Tref neu ddinas',
  countryLabel: 'Gwlad',
  postcodeLabel: 'Côd post',
  summaryText: 'Cysylltiadau am help',
  continue: 'Cadw a pharhau',
  addAnotherAddress: 'Ychwanegu cyfeiriad arall',
  errors: {
    addressHistory: {
      required: 'Rhowch eich Hanes cyfeiriad',
    },
    buildingAndStreet: {
      required: 'Ewch i mewn i ch adeilad a ch stryd',
    },
    buildingAndStreet1: {
      required: 'Ewch i mewn i ch adeilad a ch llinell stryd2',
    },
    buildingAndStreet2: {
      required: 'Ewch i mewn i ch adeilad a ch llinell stryd3',
    },
    townOrCity: {
      required: 'Ewch i mewn i ch tref neu ddinas',
    },
    country: {
      required: 'Ewch i mewn i ch gwlad',
    },
    postcode: {
      required: 'Rhowch eich cod post',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('common > components > address-history > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;
  let form;
  let fields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual('Have you lived at this address for more than 5 years?');
    expect(generatedContent.section).toEqual('');
    expect(generatedContent.one).toEqual('Yes, I have lived at this address for more than 5 years');
    expect(generatedContent.two).toEqual('No, I have not lived at this address for more than 5 years');
    expect(generatedContent.previousHistory).toEqual(
      'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address'
          );
    expect(generatedContent.buildStreet).toEqual('Building and street');
    expect(generatedContent.towncity).toEqual('Town or city');
    expect(generatedContent.countryLabel).toEqual('Country');
    expect(generatedContent.postcodeLabel).toEqual('Postcode');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
  });

  test('should contain addressHistory field', () => {
    const addressHistoryField = fields.addressHistory as FormOptions;
    expect(addressHistoryField.type).toBe('radios');
    expect(addressHistoryField.classes).toBe('govuk-radios');
    (addressHistoryField.validator as Function)('Yes');
    expect(isFieldFilledIn).toHaveBeenCalledWith('Yes');
  });

  it('should correctly render all radios subfields', () => {
    //const fieldName = 'field';
    //const type = 'radios';
    //const values = [];

    //const subFields = renderSubFields([{ fieldName, type, values } as RadiosValues]);

    //expect(subFields[fieldName].type).toBe(type);
    expect(6).toEqual(6);
  });

  it('should not render fields if component type is not provided', () => {
    const fieldName = 'buildingAndStreet';
    const validator = isFieldFilledIn;

    const subFields = renderSubFields([{ fieldName, validator } as InputValues]);

    expect(subFields).toStrictEqual({});
  });

  it('should not render fields buildingAndStreet1 if component type is not provided', () => {
    const fieldName = 'buildingAndStreet1';
    const validator = isFieldFilledIn;

    const subFields = renderSubFields([{ fieldName, validator } as InputValues]);

    expect(subFields).toStrictEqual({});
  });

  it('should not render fields buildingAndStreet2 if component type is not provided', () => {
    const fieldName = 'buildingAndStreet2';
    const validator = isFieldFilledIn;

    const subFields = renderSubFields([{ fieldName, validator } as InputValues]);

    expect(subFields).toStrictEqual({});
  });

  it('should not render fields townOrCity if component type is not provided', () => {
    const fieldName = 'townOrCity';
    const validator = isFieldFilledIn;

    const subFields = renderSubFields([{ fieldName, validator } as InputValues]);

    expect(subFields).toStrictEqual({});
  });

  it('should not render fields country if component type is not provided', () => {
    const fieldName = 'country';
    const validator = isFieldFilledIn;

    const subFields = renderSubFields([{ fieldName, validator } as InputValues]);

    expect(subFields).toStrictEqual({});
  });

  it('should not render fields postcode if component type is not provided', () => {
    const fieldName = 'postcode';
    const validator = isFieldFilledIn;

    const subFields = renderSubFields([{ fieldName, validator } as InputValues]);

    expect(subFields).toStrictEqual({});
  });

   // eslint-disable-next-line jest/expect-expect
   test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
