import { CaseType, PartyType, SelectTypeOfOrderEnum, State, YesOrNo } from '../../../../../app/case/definition';

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
  test('when FL401 applicant with hearing and final order completed', () => {
    const data = {
      id: '12',
      state: State.DECISION_OUTCOME,
      caseTypeOfApplication: CaseType.FL401,
      orderCollection: [
        {
          id: '',
          value: {
            dateCreated: '',
            orderType: '',
            orderDocument: {
              document_url: '',
              document_filename: '',
              document_binary_url: '',
            },
            orderDocumentWelsh: {
              document_url: '',
              document_filename: '',
              document_binary_url: '',
            },
            otherDetails: {
              createdBy: '',
              orderCreatedDate: '',
              orderMadeDate: '',
              orderRecipients: '',
            },
            orderTypeId: 'blankOrderOrDirectionsWithdraw',
            isWithdrawnRequestApproved: YesOrNo.NO,
            withdrawnRequestType: 'application',
          },
        },
      ],
      selectTypeOfOrder: SelectTypeOfOrderEnum.finl,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getProgressBarConfig(data, party, language)).toStrictEqual([
      {
        ariaLabel: 'Case opened stage is completed',
        label: 'Case<br/> opened',
        statusBarClassName: 'stage--completed',
      },
      {
        ariaLabel: 'Hearings and court orders stage is completed',
        label: 'Hearings and<br/> court orders',
        statusBarClassName: 'stage--completed',
      },
      {
        ariaLabel: 'Final order stage is completed',
        label: 'Final order',
        statusBarClassName: 'stage--completed',
      },
      {
        ariaLabel: 'Case closed stage is not yet started',
        label: 'Case closed',
        statusBarClassName: '',
      },
    ]);
  });
  test('when FL401 applicant with out hearing and order', () => {
    const data = {
      id: '12',
      state: State.DECISION_OUTCOME,
      caseTypeOfApplication: CaseType.FL401,
      orderCollection: [
        {
          id: '',
          value: {
            dateCreated: '',
            orderType: '',
            orderDocument: {
              document_url: '',
              document_filename: '',
              document_binary_url: '',
            },
            orderDocumentWelsh: {
              document_url: '',
              document_filename: '',
              document_binary_url: '',
            },
            otherDetails: {
              createdBy: '',
              orderCreatedDate: '',
              orderMadeDate: '',
              orderRecipients: '',
            },
            orderTypeId: 'blankOrderOrDirectionsWithdraw',
            isWithdrawnRequestApproved: YesOrNo.NO,
            withdrawnRequestType: 'application',
          },
        },
      ],
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getProgressBarConfig(data, party, language)).toStrictEqual([
      {
        ariaLabel: 'Case opened stage is completed',
        label: 'Case<br/> opened',
        statusBarClassName: 'stage--completed',
      },
      {
        ariaLabel: 'Hearings and court orders stage is in progress',
        label: 'Hearings and<br/> court orders',
        statusBarClassName: 'stage--active',
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
