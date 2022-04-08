import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
//import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const en = () => ({
  continue: 'Save and continue',
  cancel: 'Cancel',
});

const enContentError = {
  cancel: 'Cancel',
  errors: {
    serviceType: {
      required: 'Select the Service type',
    },
  },
};

const cyContentError = {
  errors: {
    serviceType: {
      required: 'Select the Service type (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('service-type content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.hint).toEqual(
      'Select either adoption or private law. There are specific examples under each section'
    );
    expect(generatedContent.cancel).toEqual('Cancel');
    expect(generatedContent.serviceName).toEqual('Family');
    expect(generatedContent.continue).toEqual('Continue');
    expect(generatedContent.label).toEqual('Select type of family law you need');
    expect(generatedContent.one).toEqual('Adoption');
    expect(generatedContent.two).toEqual('Private Law');
    expect(generatedContent.errors).toEqual(enContentError.errors);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.hint).toEqual(
      'Select either adoption or private law. There are specific examples under each section (in welsh)'
    );
    expect(generatedContent.cancel).toEqual('Cancel (in welsh)');
    expect(generatedContent.serviceName).toEqual('Family (in welsh)');
    expect(generatedContent.continue).toEqual('Continue (in welsh)');
    expect(generatedContent.label).toEqual('Select type of family law you need (in welsh)');
    expect(generatedContent.one).toEqual('Adoption (in welsh)');
    expect(generatedContent.two).toEqual('Private Law (in welsh)');
    expect(generatedContent.errors).toEqual(cyContentError.errors);
  });

  test('should contain select service type field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const serviceTypeField = fields.serviceType as FormOptions;
    const adoptionSubFields = serviceTypeField.values[0].subFields as FormFields;
    const privateLawSubFields = serviceTypeField.values[1].subFields as FormFields;
    expect(serviceTypeField.type).toBe('radios');
    expect(serviceTypeField.classes).toBe('govuk-radios');
    expect((serviceTypeField.label as Function)(generatedContent)).toBe('Select type of family law you need');
    expect((serviceTypeField.values[0].label as Function)(generatedContent)).toBe('Adoption');
    expect((serviceTypeField.hint as Function)(generatedContent)).toBe(
      'Select either adoption or private law. There are specific examples under each section'
    );
    expect((serviceTypeField.values[1].label as Function)(generatedContent)).toBe('Private Law');

    expect(adoptionSubFields.internationalAdoption.type).toBe('label');
    expect(adoptionSubFields.internationalAdoption.label).toBe('International Adoption');
    expect(adoptionSubFields.relinquishedAdoption.type).toBe('label');
    expect(adoptionSubFields.relinquishedAdoption.label).toBe('Relinquished adoption');
    expect(adoptionSubFields.stepparentAdoption.type).toBe('label');
    expect(adoptionSubFields.stepparentAdoption.label).toBe('Stepparent Adoption');
    expect(adoptionSubFields.parentalOrders.type).toBe('label');
    expect(adoptionSubFields.parentalOrders.label).toBe('Parental orders');

    expect(privateLawSubFields.femaleGenitalMutilationOrdersFGM.type).toBe('label');
    expect(privateLawSubFields.femaleGenitalMutilationOrdersFGM.label).toBe('Female Genital Mutilation Orders(FGM)');
    expect(privateLawSubFields.forcedProtectionMarriageOrderFMPO.type).toBe('label');
    expect(privateLawSubFields.forcedProtectionMarriageOrderFMPO.label).toBe('Forced Marriage Protection Order(FMPO)');
    expect(privateLawSubFields.specialGuardianship.type).toBe('label');
    expect(privateLawSubFields.specialGuardianship.label).toBe('Special Guardianship');
    expect(privateLawSubFields.financialApplications.type).toBe('label');
    expect(privateLawSubFields.financialApplications.label).toBe('Financial Applications');
    expect(privateLawSubFields.declarationOfParentage.type).toBe('label');
    expect(privateLawSubFields.declarationOfParentage.label).toBe('Declaration of parentage');
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe(en().continue);
  });

  test('should contain cancel button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.cancel?.text as Function)(generatePageContent({ language: 'en' }))).toBe(en().cancel);
  });
});
/* eslint-enable @typescript-eslint/ban-types */
