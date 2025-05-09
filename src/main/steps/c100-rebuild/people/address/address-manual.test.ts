import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './address-manual';

jest.mock('../../../../app/form/validation');

const enContent = {
  addressLine1: 'Building',
  addressLine2: 'Street',
  town: 'Town or city',
  county: 'County',
  country: 'Country',
  postcode: 'Postcode',
  enterInternationalAddress: 'Enter an international address',
  explainYesLabel: 'I dont know where they currently live',
};

const cyContent = {
  addressLine1: 'Adeilad',
  addressLine2: 'Stryd',
  town: 'Tref neu ddinas',
  county: 'Sir',
  country: 'Gwlad',
  postcode: 'Cod post',
  enterInternationalAddress: 'Nodwch gyfeiriad rhyngwladol',
  explainYesLabel: 'Nid wyf yn gwybod lle maen nhw’n byw ar hyn o bryd',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('common > components > manual-address > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
