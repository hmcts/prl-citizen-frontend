import mockUserCase from '../../../test/unit/utils/mockUserCase';
import { CaseWithId } from '../../app/case/case';
import { State } from '../../app/case/definition';

import { buildProgressBarStages } from './progress-bar-utils';

const userCase: CaseWithId = {
  id: '123',
  state: State.Submitted,
  serviceType: '',
};

describe('progress-bar-utils', () => {
  describe('build-c100-progress-bar', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          caseTypeOfApplication: 'C100',
        },
        expected: [
          {
            title: 'Application<br/> submitted',
            ariaLabel: 'Application submitted stage',
            active: true,
            completed: true,
          },
          {
            title: 'Cafcass child<br/> safety checks',
            ariaLabel: 'Cafcass child safety checks stage',
            active: true,
            completed: false,
          },
          {
            title: 'Response<br/> submitted',
            ariaLabel: 'Response submitted stage',
            active: false,
            completed: false,
          },
          {
            title: 'Hearings and<br/> court orders',
            ariaLabel: 'Hearings and court orders stage',
            active: true,
            completed: false,
          },
          {
            title: 'Case closed',
            ariaLabel: 'Case closed stage',
            active: false,
            completed: false,
          },
        ],
      },
    ])('should return correct stages %#', ({ data, expected }) => {
      expect(buildProgressBarStages({ ...userCase, ...data })).toEqual(expected);
    });
  });

  describe('build-FL401-Progress-Bar-Stages', () => {
    test('test-progress-bar-fl401', () => {
      const data = {
        ...mockUserCase,
        caseTypeOfApplication: 'FL401',
      };
      const expected = [
        { active: false, ariaLabel: 'Case opened stage', completed: true, title: 'Case<br/> opened' },
        {
          active: true,
          ariaLabel: 'Hearings and court orders stage',
          completed: false,
          title: 'Hearings and<br/> court orders',
        },
        { active: false, ariaLabel: 'Final order stage', completed: false, title: 'Final order' },
        { active: false, ariaLabel: 'Case closed stage', completed: false, title: 'Case closed' },
      ];
      expect(buildProgressBarStages(data)).toEqual(expected);
    });
  });
});
