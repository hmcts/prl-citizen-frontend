import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../../../common/common.content';

import { generateContent } from './address-manual';

jest.mock('../../../../../app/form/validation');

const enContent = {
  addressLine1: 'Building and street',
  town: 'Town or city',
  county: 'County',
  postcode: 'Postcode',
  enterInternationalAddress: 'Enter an international address',
  addressHistoryLabel: 'Have you lived at this address for more than 5 years?',
  one: 'Yes',
  two: 'No',
  explainNoLabel: 'Provide details of previous addresses you have lived at in the last 5 years',
  explainNoHint: 'Start with your most recent',
};

const cyContent = {
  addressLine1: 'Adeilad a stryds',
  town: 'Tref neu ddinas',
  county: 'Sir',
  postcode: 'Cod post',
  enterInternationalAddress: 'Nodwch gyfeiriad rhyngwladol',
  addressHistoryLabel: 'A ydych wedi byw yn y cyfeiriad hwn am fwy na 5 mlynedd?',
  one: 'Do',
  two: 'Naddoo',
  explainNoLabel: 'Darparwch fanylion cyfeiriadau blaenorol rydych wedi byw ynddynt yn y 5 mlynedd diwethaf',
  explainNoHint: 'Cychwynnwch gyda’r un mwyaf diwedda',
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
