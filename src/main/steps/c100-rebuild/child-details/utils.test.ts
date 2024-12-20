import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';

import { cleanOtherChildrenDetails } from './utils';

describe.skip('c100 > child-details > utils', () => {
  describe('cleanOtherChildrenDetails', () => {
    const otherChildren = [
      {
        id: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
        firstName: 'a',
        lastName: 'b',
        personalDetails: {
          dateOfBirth: {
            year: '',
            month: '',
            day: '',
          },
          isDateOfBirthUnknown: 'Yes',
          approxDateOfBirth: {
            year: '1987',
            month: '12',
            day: '12',
          },
          sex: 'Male',
        },
        childMatters: {
          needsResolution: [],
        },
        parentialResponsibility: {
          statement: 'fgfdgfg',
        },
      },
    ];
    test('should remove other children if has other children is no', () => {
      expect(
        cleanOtherChildrenDetails({ ocd_otherChildren: otherChildren } as unknown as CaseWithId, YesOrNo.NO)
      ).toStrictEqual({
        ocd_otherChildren: [],
      });
    });

    test('should not remove other children if has other children is yes', () => {
      expect(
        cleanOtherChildrenDetails({ ocd_otherChildren: otherChildren } as unknown as CaseWithId, YesOrNo.YES)
      ).toStrictEqual({
        ocd_otherChildren: otherChildren,
      });
    });
  });
});
