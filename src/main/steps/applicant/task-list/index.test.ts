import { CaseWithId } from '../../../app/case/case';
import { PartyDetails } from '../../../app/case/definition';

import { getApplicant, getApplicantName } from '.';

describe('applicant > tasklist > index', () => {
  describe('getApplicant', () => {
    test('should return applicant details for C100 case', () => {
      expect(
        getApplicant(
          {
            caseTypeOfApplication: 'C100',
            applicants: [{ id: '1234', value: { user: { idamId: '1234' }, firstName: 'Test', lastName: 'last' } }],
          } as CaseWithId,
          '1234'
        )
      ).toStrictEqual({
        firstName: 'Test',
        lastName: 'last',
        user: {
          idamId: '1234',
        },
      });
    });

    test('should return applicant details for FL401 case', () => {
      expect(
        getApplicant(
          {
            caseTypeOfApplication: 'FL401',
            applicantsFL401: { user: { idamId: '1234' }, firstName: 'Test', lastName: 'last' },
          } as CaseWithId,
          '1234'
        )
      ).toStrictEqual({
        firstName: 'Test',
        lastName: 'last',
        user: {
          idamId: '1234',
        },
      });
    });
  });

  describe('getApplicantName', () => {
    test('should return applicant name', () => {
      expect(getApplicantName({ firstName: 'Test', lastName: 'last' } as PartyDetails)).toBe('Test last');
    });
  });
});
