/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  cy as contentHearingWithoutCy,
  en as contentHearingWithoutEn,
} from '../../hearing-without-notice/hearing-part2/content';

import { hearingDetailsContents } from './hearingwithout.util';
/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
const RespectiveFileContents = SystemLanguage => {
  const opContents = {
    en: () => {
      return { ...contentHearingWithoutEn(), errors: '' };
    },
    cy: () => {
      delete contentHearingWithoutCy['errors'];
      return { ...contentHearingWithoutCy(), errors: '' };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};

describe('dsds', function () {
  test('should', () => {
    expect(hearingDetailsContents('en').toString()).toEqual(RespectiveFileContents('en').toString());
  });
});
