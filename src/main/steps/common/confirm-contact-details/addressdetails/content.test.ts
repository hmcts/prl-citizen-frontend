//import { FormContent , FormFields , FormOptions } from "../../../../app/form/Form";

import languageAssertions from "../../../../../test/unit/utils/languageAssertions";
import { CommonContent } from "../../common.content";

import { generateContent } from "./content";

//jest.mock('../../../app/form/validation');

const enContent = {
    title: 'Your address',
    citizenUserAddressText: 'address',
    continue: 'Save and continue',
    editAddress: 'Edit Address',
    errors: {},
  };
  
  const cyContent: typeof enContent = {
    title: 'Eich cyfeiriad',
    citizenUserAddressText: 'cyfeiriad',
    continue: 'Arbed a pharhau',
    editAddress: 'Golygu Cyfeiriad',
    errors: {},
  };

  describe('address details', () => {
    const commonContent = { language: 'en', userCase: {} } as CommonContent;
    const commonContentcy = { language: 'cy', userCase: {} } as CommonContent;
    let generatedContent;
    let generatedContentcy;
  
    beforeEach(() => {
      generatedContent = generateContent(commonContent);
      generatedContentcy = generateContent(commonContentcy);
    });
  
    test('should return correct english content', () => {
      expect(generatedContent.title).toEqual(enContent.title);
      expect(generatedContent.citizenUserAddressText).toEqual(enContent.citizenUserAddressText);
      expect(generatedContent.continue).toEqual(enContent.continue);
      expect(generatedContent.editAddress).toEqual(enContent.editAddress);
    });
  
    test('should return correct welsh content', () => {
        expect(generatedContentcy.title).toEqual(cyContent.title);
        expect(generatedContentcy.citizenUserAddressText).toEqual(cyContent.citizenUserAddressText);
        expect(generatedContentcy.continue).toEqual(cyContent.continue);
        expect(generatedContentcy.editAddress).toEqual(cyContent.editAddress);
    });

    test('should return correct english content', () => {
        languageAssertions('en', enContent, () => generateContent(commonContent));
      });
    
      test('should return correct welsh content', () => {
        languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
      });
  
    // test('should contain citizenUserAddressPostcode field', () => {
    //   const form = generatedContent.form as FormContent;
    //   const fields = form.fields as FormFields;
    //   const addressPostcodeField = fields.citizenUserAddressPostcode as FormOptions;
  
    //   expect(addressPostcodeField.type).toBe('text');
    //   expect(addressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    //   expect((addressPostcodeField.label as Function)(generatedContent)).toBe(enContent.citizenUserAddressPostcode);
    //   expect(addressPostcodeField.labelSize).toBe('m');
    //   expect(addressPostcodeField.attributes!.maxLength).toBe(14);
    //   expect(addressPostcodeField.validator).toBe(isInvalidPostcode);
    //   expect((form.submit?.text as Function)(generatedContent)).toBe('Continue');
    // });
  
    // test('should contain citizenUserAddressPostcode field with welsh', () => {
    //   const form = generatedContent.form as FormContent;
    //   const fields = form.fields as FormFields;
    //   const addressPostcodeField = fields.citizenUserAddressPostcode as FormOptions;
  
    //   expect(addressPostcodeField.type).toBe('text');
    //   expect(addressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    //   expect((addressPostcodeField.label as Function)(generatedContentcy)).toBe(cyContent.citizenUserAddressPostcode);
    //   expect(addressPostcodeField.labelSize).toBe('m');
    //   expect(addressPostcodeField.attributes!.maxLength).toBe(14);
    //   expect(addressPostcodeField.validator).toBe(isInvalidPostcode);
    //   expect((form.submit?.text as Function)(generatedContentcy)).toBe('Continue (in welsh)');
    // });
  });