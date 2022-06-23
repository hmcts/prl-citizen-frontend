import mockUserCase from '../../../../test/unit/utils/mockUserCase';
// import { CaseDate } from '../../../app/case/case'
// import { CaseWithId } from '../../../app/case/case';
// import { SectionStatus } from '../../../app/case/definition';

import {
  getConfirmOrEditYourContactDetails,
  getMiamStatus
} from './utils';

describe('utils', () => {
  describe('getConfirmOrEditYourContactDetails', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          applicant1FullName: 'Firstname lastname',
          applicant1PlaceOfBirth: '',
          applicant1DateOfBirth: { day: '10', month: '10', year: '1990' },
        },
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          ...mockUserCase,
          applicant1FullName: 'Firstname lastname',
          applicant1PlaceOfBirth: 'LONDON',
          applicant1DateOfBirth: { day: '11', month: '11', year: '2011' },
      },
        expected: 'COMPLETED',
      },
      {
        data: {
          ...mockUserCase,
          applicant1FullName: undefined,
          applicant1PlaceOfBirth: undefined,
          applicant1DateOfBirth: undefined
          
      },
        expected: 'TO_DO',
      },

    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getConfirmOrEditYourContactDetails(data)).toBe(expected);
    });
  });


  describe('getMiamStatus', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          miamStart: 'Yes',
          miamWillingness: 'Yes'
        },
        expected: 'COMPLETED',
      },
      {
        data: {
          ...mockUserCase,
          miamStart: '',
          miamWillingness: ''
        },
        expected: 'TO_DO',
      },
      {
        data: {
          ...mockUserCase,
          miamStart: undefined,
          miamWillingness: undefined
        },
        expected: 'TO_DO',
      },

    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getMiamStatus(data)).toBe(expected);
    });
  });

});
