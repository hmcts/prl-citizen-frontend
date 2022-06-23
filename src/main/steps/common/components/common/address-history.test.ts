//import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common.content';

import { generateContent } from './address-history';
import { renderSubFields } from './renderSubFields';
import { InputValues } from './types';

jest.mock('../../../../app/form/validation');

// const en = {
//   section: '',
//   title: 'Have you lived at this address for more than 5 years?',
//   one: 'Yes, I have lived at this address for more than 5 years',
//   two: 'No, I have not lived at this address for more than 5 years',
//   previousHistory:
//     'Provide details of previous addresses you have lived at in the last 5 years, starting with your most recent address',
//   buildStreet: 'Building and street',
//   towncity: 'Town or city',
//   countryLabel: 'Country',
//   postcodeLabel: 'Postcode',
//   summaryText: 'Contacts for help',
//   continue: 'Save and continue',
//   addAnotherAddress: 'Add another address',
//   errors: {
//     addressHistory: {
//       required: 'Enter your address History',
//     },
//     buildingAndStreet: {
//       required: 'Enter your building and street',
//     },
//     buildingAndStreet1: {
//       required: 'Enter your building and street line2',
//     },
//     buildingAndStreet2: {
//       required: 'Enter your building and street line3',
//     },
//     townOrCity: {
//       required: 'Enter your town or city',
//     },
//     country: {
//       required: 'Enter your country',
//     },
//     postcode: {
//       required: 'Enter your postcode',
//     },
//   },
// };

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

    test('should contain addressHistory field', () => {
        const addressHistoryField = fields.addressHistory as FormOptions;
        expect(addressHistoryField.type).toBe('radios');
        expect(addressHistoryField.classes).toBe('govuk-radios');
        (addressHistoryField.validator as Function)('Yes');
        expect(isFieldFilledIn).toHaveBeenCalledWith('Yes');
      });

      it('should not render fields if component type is not provided', () => {
        const fieldName = 'buildingAndStreet';
        const validator = isFieldFilledIn;
    
        const subFields = renderSubFields([{ fieldName, validator } as InputValues]);
    
        expect(subFields).toStrictEqual({});
      });
    
      it('should not render fields if component type is not provided', () => {
        const fieldName = 'buildingAndStreet';
        const validator = isFieldFilledIn;
    
        const subFields = renderSubFields([{ fieldName, validator } as InputValues]);
    
        expect(subFields).toStrictEqual({});
      });

      it('should not render fields if component type is not provided', () => {
        const fieldName = 'buildingAndStreet1';
        const validator = isFieldFilledIn;
    
        const subFields = renderSubFields([{ fieldName, validator } as InputValues]);
    
        expect(subFields).toStrictEqual({});
      });
    
      it('should not render fields if component type is not provided', () => {
        const fieldName = 'buildingAndStreet2';
        const validator = isFieldFilledIn;
    
        const subFields = renderSubFields([{ fieldName, validator } as InputValues]);
    
        expect(subFields).toStrictEqual({});
      });

     
      it('should not render fields if component type is not provided', () => {
        const fieldName = 'townOrCity';
        const validator = isFieldFilledIn;
    
        const subFields = renderSubFields([{ fieldName, validator } as InputValues]);
    
        expect(subFields).toStrictEqual({});
      });


      it('should not render fields if component type is not provided', () => {
        const fieldName = 'country';
        const validator = isFieldFilledIn;
    
        const subFields = renderSubFields([{ fieldName, validator } as InputValues]);
    
        expect(subFields).toStrictEqual({});
      });


      it('should not render fields if component type is not provided', () => {
        const fieldName = 'postcode';
        const validator = isFieldFilledIn;
    
        const subFields = renderSubFields([{ fieldName, validator } as InputValues]);
    
        expect(subFields).toStrictEqual({});
      });
    
      test('should contain submit button', () => {
        expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
      });
});
/* eslint-enable @typescript-eslint/ban-types */
