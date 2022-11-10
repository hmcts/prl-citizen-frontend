/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { cy as contentAddressCy, en as contentAddressEn } from '../../respondent-details/address/common/address-manual';
import { cy as personalDetailsCy, en as personalDetailsEn } from '../../respondent-details/personal-details/content';

import { RespondentsElements } from './respondent.util';

const RespondentsTestElements = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        ...contentAddressEn(),
        ...personalDetailsEn(),
        errors: '',
      };
    },
    cy: () => {
      return {
        ...contentAddressCy(),
        ...personalDetailsCy(),
        errors: '',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};

describe('Testing respondent contents', () => {
  test('english', () => {
    expect(RespondentsTestElements('en').toString()).toEqual(RespondentsElements('en').toString());
  });
  test('other', () => {
    expect(RespondentsTestElements('cy').toString()).toEqual(RespondentsElements('cy').toString());
  });
});
