import { CaseType, PartyType, State } from '../../../../../app/case/definition';

import { getProgressBarConfig } from './utils';

describe('testcase for progress-bar', () => {
  test('when not started yet', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getProgressBarConfig(data, party, language)).toStrictEqual([
      {
        ariaLabel: 'Application submitted stage is not yet started',
        label: 'Application<br/> submitted',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Cafcass child safety checks stage is not yet started',
        label: 'Cafcass child<br/> safety checks',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Response submitted stage is not yet started',
        label: 'Response<br/> submitted',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Hearings and court orders stage is not yet started',
        label: 'Hearings and<br/> court orders',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Case closed stage is not yet started',
        label: 'Case closed',
        statusBarClassName: '',
      },
    ]);
  });
  test('when respondent', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.C100,
    };
    const party = PartyType.RESPONDENT;
    const language = 'en';

    expect(getProgressBarConfig(data, party, language)).toStrictEqual([
      {
        ariaLabel: 'Application submitted stage is completed',
        label: 'Application<br/> submitted',
        statusBarClassName: 'stage--completed',
      },
      {
        ariaLabel: 'Cafcass child safety checks stage is not yet started',
        label: 'Cafcass child<br/> safety checks',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Response submitted stage is not yet started',
        label: 'Response<br/> submitted',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Hearings and court orders stage is not yet started',
        label: 'Hearings and<br/> court orders',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Case closed stage is not yet started',
        label: 'Case closed',
        statusBarClassName: '',
      },
    ]);
  });
  test('when FL401 respondent', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.FL401,
    };
    const party = PartyType.RESPONDENT;
    const language = 'en';

    expect(getProgressBarConfig(data, party, language)).toStrictEqual([
      {
        ariaLabel: 'Case opened stage is not yet started',
        label: 'Case<br/> opened',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Hearings and court orders stage is not yet started',
        label: 'Hearings and<br/> court orders',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Final order stage is not yet started',
        label: 'Final order',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Case closed stage is not yet started',
        label: 'Case closed',
        statusBarClassName: '',
      },
    ]);
  });
  test('when state submitted and withdrawn', () => {
    const data = {
      id: '12',
      state: State.CASE_WITHDRAWN,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getProgressBarConfig(data, party, language)).toStrictEqual([
      {
        ariaLabel: 'Application submitted stage is completed',
        label: 'Application<br/> submitted',
        statusBarClassName: 'stage--completed',
      },
      {
        ariaLabel: 'Cafcass child safety checks stage is not yet started',
        label: 'Cafcass child<br/> safety checks',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Response submitted stage is not yet started',
        label: 'Response<br/> submitted',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Hearings and court orders stage is not yet started',
        label: 'Hearings and<br/> court orders',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Case closed stage is completed',
        label: 'Case closed',
        statusBarClassName: 'stage--completed',
      },
    ]);
  });
  test('when case in inprogress', () => {
    const data = {
      id: '12',
      state: State.CASE_SUBMITTED_NOT_PAID,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getProgressBarConfig(data, party, language)).toStrictEqual([
      {
        ariaLabel: 'Application submitted stage is in progress',
        label: 'Application<br/> submitted',
        statusBarClassName: 'stage--active',
      },
      {
        ariaLabel: 'Cafcass child safety checks stage is not yet started',
        label: 'Cafcass child<br/> safety checks',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Response submitted stage is not yet started',
        label: 'Response<br/> submitted',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Hearings and court orders stage is not yet started',
        label: 'Hearings and<br/> court orders',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Case closed stage is not yet started',
        label: 'Case closed',
        statusBarClassName: '',
      },
    ]);
  });
});
