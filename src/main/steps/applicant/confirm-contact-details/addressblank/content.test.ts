import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = ({ manualAddressContent }) => {
  return {
    title: 'Your Address',
    errors: {
      applicant1Address1: manualAddressContent.errors.address1,
      applicant1AddressTown: manualAddressContent.errors.addressTown,
      applicant1AddressPostcode: manualAddressContent.errors.addressPostcode,
    },
  };
};

const cyContent: typeof en = ({ manualAddressContent }) => {
  return {
    title: 'Beth yw eich cyfeiriad?',
    errors: {
      applicant1Address1: manualAddressContent.errors.address1,
      applicant1AddressTown: manualAddressContent.errors.addressTown,
      applicant1AddressPostcode: manualAddressContent.errors.addressPostcode,
    },
  };
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual(
      'Do the other people named in this application (the applicants) know any of your contact details?'
    );
    expect(generatedContent.section).toEqual('Keeping your contact details private');
    expect(generatedContent.summaryText).toEqual('Contacts for help');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
/* eslint-enable @typescript-eslint/ban-types */
