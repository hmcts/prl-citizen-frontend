import mockUserCase from '../../../test/unit/utils/mockUserCase';
import { CaseWithId } from '../../app/case/case';
import { SelectTypeOfOrderEnum, State } from '../../app/case/definition';

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
            active: false,
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
      expect(buildProgressBarStages({ ...userCase, ...data }, 'en')).toEqual(expected);
    });

    test.each([
      {
        data: {
          ...mockUserCase,
          caseTypeOfApplication: 'C100',
        },
        expected: [
          {
            title: "Cais wedi'i<br/> gyflwyno",
            ariaLabel: 'Cam cais wedi’i gyflwyno',
            active: true,
            completed: true,
          },
          {
            title: 'Gwiriadau diogelwch<br/> plant Cafcass',
            ariaLabel: 'Cam gwiriadau diogelwch plant Cafcass',
            active: false,
            completed: false,
          },
          {
            title: "Ymateb wedi'i<br/> gyflwyno",
            ariaLabel: 'Cam ymateb wedi’i gyflwyno',
            active: false,
            completed: false,
          },
          {
            title: 'Gwrandawiadau <br/>a<br/> gorchmynion llys',
            ariaLabel: 'Cam gwrandawiadau a gorchmynion llys',
            active: true,
            completed: false,
          },
          {
            title: 'Achos wedi’i <br/>gau',
            ariaLabel: 'Cam achos wedi’i gau',
            active: false,
            completed: false,
          },
        ],
      },
    ])('should return correct welsh stages %#', ({ data, expected }) => {
      expect(buildProgressBarStages({ ...userCase, ...data }, 'cy')).toEqual(expected);
    });

    test('stages should be completed when all final orders are issued', () => {
      const stages = buildProgressBarStages(
        {
          ...userCase,
          caseTypeOfApplication: 'C100',
          selectTypeOfOrder: 'finl' as SelectTypeOfOrderEnum,
          state: 'ALL_FINAL_ORDERS_ISSUED' as State,
        },
        'en'
      );
      expect(stages[3].completed).toBe(true);
      expect(stages[4].completed).toBe(true);
    });

    test('hearing order stage should be active when case in decision outcome state', () => {
      const stages = buildProgressBarStages(
        {
          ...userCase,
          caseTypeOfApplication: 'C100',
          state: 'DECISION_OUTCOME' as State,
        },
        'en'
      );
      expect(stages[3].active).toBe(true);
    });

    test('hearing order stage should be active when case in hearing state', () => {
      const stages = buildProgressBarStages(
        {
          ...userCase,
          caseTypeOfApplication: 'C100',
          state: 'Hearing' as State,
        },
        'en'
      );
      expect(stages[3].active).toBe(true);
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
      expect(buildProgressBarStages(data, 'en')).toEqual(expected);
    });

    test('should return correct welsh stages', () => {
      const data = {
        ...mockUserCase,
        caseTypeOfApplication: 'FL401',
      };
      const expected = [
        { active: false, ariaLabel: 'Cam achos wedi’i agor', completed: true, title: 'Achos<br/> wedi’i agor' },
        {
          active: true,
          ariaLabel: 'Cam gwrandawiadau a gorchmynion llys',
          completed: false,
          title: 'Gwrandawiadau <br/>a<br/> gorchmynion llys',
        },
        { active: false, ariaLabel: 'Cam gorchymyn terfynol', completed: false, title: 'Gorchymyn terfynol' },
        { active: false, ariaLabel: 'Cam achos wedi’i gau', completed: false, title: 'Achos wedi’i <br/>gau' },
      ];
      expect(buildProgressBarStages(data, 'cy')).toEqual(expected);
    });
  });
});
