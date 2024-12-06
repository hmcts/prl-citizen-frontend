import { CaseWithId } from '../../../app/case/case';

import {
  doesAnyChildLiveWithOtherPerson,
  getNextPersonLivingWithChild,
  getOtherPeopleLivingWithChildren,
} from './utils';

describe('c100-rebuild > other-person-details > utils', () => {
  describe('doesAnyChildLiveWithOtherPerson', () => {
    test('should return true if any child lives with the other person', () => {
      expect(
        doesAnyChildLiveWithOtherPerson(
          {
            cd_children: [{ id: '123', liveWith: [{ id: '1234' }] }],
          } as unknown as CaseWithId,
          '1234'
        )
      ).toBe(true);
    });

    test('should return false if no child lives with the other person', () => {
      expect(
        doesAnyChildLiveWithOtherPerson(
          {
            cd_children: [{ id: '123', liveWith: [{ id: '12345' }] }],
          } as unknown as CaseWithId,
          '1234'
        )
      ).toBe(false);
    });
  });

  describe('getOtherPeopleLivingWithChildren', () => {
    test('should return the ids of the other people living with children', () => {
      expect(
        getOtherPeopleLivingWithChildren({
          oprs_otherPersons: [{ id: '123' }, { id: '1234' }],
          cd_children: [{ id: '123', liveWith: [{ id: '123' }] }],
        } as unknown as CaseWithId)
      ).toEqual(['123']);
    });
  });

  describe('getNextPersonLivingWithChild', () => {
    test('should return the next person who lives with a child', () => {
      expect(getNextPersonLivingWithChild(['123', '1234'], '123')).toBe('1234');
    });
  });
});
