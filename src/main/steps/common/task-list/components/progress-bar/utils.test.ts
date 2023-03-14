import { CaseType, PartyType, State } from '../../../../../app/case/definition';

import { getProgressBarConfig } from './utils';

describe('testcase for progress-bar', () => {
  test('when in progress state', () => {
    const data = {
      id: '12',
      state: State.AwaitingSubmissionToHmcts,
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
      state: State.AWAITING_RESUBMISSION_TO_HMCTS,
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
      state: State.AWAITING_RESUBMISSION_TO_HMCTS,
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
      state: State.Withdrawn,
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
        ariaLabel: 'Case closed stage is not yet started',
        label: 'Case closed',
        statusBarClassName: '',
      },
    ]);
  });
});
