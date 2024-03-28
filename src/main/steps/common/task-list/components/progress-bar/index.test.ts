import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType, SelectTypeOfOrderEnum, State, YesOrNo } from '../../../../../app/case/definition';
import { UserDetails } from '../../../../../app/controller/AppRequest';

import { getProgressBarConfig } from '.';

describe('getProgressBarConfig', () => {
  test('when not started yet', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';
    const userDetails = { id: '1234' } as UserDetails;

    expect(getProgressBarConfig(data, party, language, userDetails)).toStrictEqual([
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

  test('when FL401 respondent', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.FL401,
    };
    const party = PartyType.RESPONDENT;
    const language = 'en';
    const userDetails = { id: '1234' } as UserDetails;

    expect(getProgressBarConfig(data, party, language, userDetails)).toStrictEqual([
      {
        ariaLabel: 'Case opened stage is completed',
        label: 'Case<br/> opened',
        statusBarClassName: 'stage--completed',
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
    const userDetails = { id: '1234' } as UserDetails;

    expect(getProgressBarConfig(data, party, language, userDetails)).toStrictEqual([
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
    const userDetails = { id: '1234' } as UserDetails;

    expect(getProgressBarConfig(data, party, language, userDetails)).toStrictEqual([
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
    const userDetails = { id: '1234' } as UserDetails;

    expect(getProgressBarConfig(data, party, language, userDetails)).toStrictEqual([
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
    const userDetails = { id: '1234' } as UserDetails;
    const language = 'en';

    expect(getProgressBarConfig(data, party, language, userDetails)).toStrictEqual([
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

  describe('c100 respondent case', () => {
    test('when case created', () => {
      const data = {
        id: '12',
        state: State.CASE_DRAFT,
        caseTypeOfApplication: CaseType.C100,
        respondents: [
          {
            id: '1234',
            value: {
              response: {
                citizenFlags: {},
              },
              user: {
                idamId: '1234',
              },
            },
          },
        ],
        caseInvites: [
          {
            value: {
              partyId: '1234',
              invitedUserId: '1234',
            },
          },
        ],
      } as unknown as CaseWithId;
      const party = PartyType.RESPONDENT;
      const language = 'en';
      const userDetails = { id: '1234' } as UserDetails;

      expect(getProgressBarConfig(data, party, language, userDetails)).toStrictEqual([
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

    test('when response in progress', () => {
      const data = {
        id: '12',
        state: State.CASE_DRAFT,
        caseTypeOfApplication: CaseType.C100,
        respondents: [
          {
            id: '1234',
            value: {
              response: {
                citizenFlags: {
                  isResponseInitiated: 'Yes',
                },
              },
              user: {
                idamId: '1234',
              },
            },
          },
        ],
        caseInvites: [
          {
            value: {
              partyId: '1234',
              invitedUserId: '1234',
            },
          },
        ],
      } as unknown as CaseWithId;
      const party = PartyType.RESPONDENT;
      const language = 'en';
      const userDetails = { id: '1234' } as UserDetails;

      expect(getProgressBarConfig(data, party, language, userDetails)).toStrictEqual([
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
          ariaLabel: 'Response submitted stage is in progress',
          label: 'Response<br/> submitted',
          statusBarClassName: 'stage--active',
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

    test('when response completed', () => {
      const data = {
        id: '12',
        state: State.CASE_DRAFT,
        caseTypeOfApplication: CaseType.C100,
        respondents: [
          {
            id: '1234',
            value: {
              response: {
                citizenFlags: {
                  isResponseInitiated: 'Yes',
                },
              },
              user: {
                idamId: '1234',
              },
            },
          },
        ],
        caseInvites: [
          {
            value: {
              partyId: '1234',
              invitedUserId: '1234',
            },
          },
        ],
        citizenResponseC7DocumentList: [
          {
            id: '1234',
            value: {
              partyName: 'NAME',
              createdBy: '1234',
              dateCreated: '1/1/2020',
              citizenDocument: {
                document_url: 'DOC_URL',
                document_filename: 'DOC_FILENAME',
                document_binary_url: 'DOC_BINARY_URL',
              },
            },
          },
        ],
      } as unknown as CaseWithId;
      const party = PartyType.RESPONDENT;
      const language = 'en';
      const userDetails = { id: '1234' } as UserDetails;

      expect(getProgressBarConfig(data, party, language, userDetails)).toStrictEqual([
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
          ariaLabel: 'Response submitted stage is completed',
          label: 'Response<br/> submitted',
          statusBarClassName: 'stage--completed',
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

    test('when hearings stage is in progress', () => {
      const data = {
        id: '12',
        state: State.DECISION_OUTCOME,
        caseTypeOfApplication: CaseType.C100,
        respondents: [
          {
            id: '1234',
            value: {
              response: {
                citizenFlags: {
                  isResponseInitiated: 'Yes',
                },
              },
              user: {
                idamId: '1234',
              },
            },
          },
        ],
        caseInvites: [
          {
            value: {
              partyId: '1234',
              invitedUserId: '1234',
            },
          },
        ],
        citizenResponseC7DocumentList: [
          {
            id: '1234',
            value: {
              partyName: 'NAME',
              createdBy: '1234',
              dateCreated: '1/1/2020',
              citizenDocument: {
                document_url: 'DOC_URL',
                document_filename: 'DOC_FILENAME',
                document_binary_url: 'DOC_BINARY_URL',
              },
            },
          },
        ],
      } as unknown as CaseWithId;
      const party = PartyType.RESPONDENT;
      const language = 'en';
      const userDetails = { id: '1234' } as UserDetails;

      expect(getProgressBarConfig(data, party, language, userDetails)).toStrictEqual([
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
          ariaLabel: 'Response submitted stage is completed',
          label: 'Response<br/> submitted',
          statusBarClassName: 'stage--completed',
        },
        {
          ariaLabel: 'Hearings and court orders stage is in progress',
          label: 'Hearings and<br/> court orders',
          statusBarClassName: 'stage--active',
        },
        {
          ariaLabel: 'Case closed stage is not yet started',
          label: 'Case closed',
          statusBarClassName: '',
        },
      ]);
    });

    test('when hearings stage is completed', () => {
      const data = {
        id: '12',
        state: State.DECISION_OUTCOME,
        caseTypeOfApplication: CaseType.C100,
        respondents: [
          {
            id: '1234',
            value: {
              response: {
                citizenFlags: {
                  isResponseInitiated: 'Yes',
                },
              },
              user: {
                idamId: '1234',
              },
            },
          },
        ],
        caseInvites: [
          {
            value: {
              partyId: '1234',
              invitedUserId: '1234',
            },
          },
        ],
        citizenResponseC7DocumentList: [
          {
            id: '1234',
            value: {
              partyName: 'NAME',
              createdBy: '1234',
              dateCreated: '1/1/2020',
              citizenDocument: {
                document_url: 'DOC_URL',
                document_filename: 'DOC_FILENAME',
                document_binary_url: 'DOC_BINARY_URL',
              },
            },
          },
        ],
        selectTypeOfOrder: 'finl',
      } as unknown as CaseWithId;
      const party = PartyType.RESPONDENT;
      const language = 'en';
      const userDetails = { id: '1234' } as UserDetails;

      expect(getProgressBarConfig(data, party, language, userDetails)).toStrictEqual([
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
          ariaLabel: 'Response submitted stage is completed',
          label: 'Response<br/> submitted',
          statusBarClassName: 'stage--completed',
        },
        {
          ariaLabel: 'Hearings and court orders stage is completed',
          label: 'Hearings and<br/> court orders',
          statusBarClassName: 'stage--completed',
        },
        {
          ariaLabel: 'Case closed stage is not yet started',
          label: 'Case closed',
          statusBarClassName: '',
        },
      ]);
    });

    test('when state is all final orders issues', () => {
      const data = {
        id: '12',
        state: State.ALL_FINAL_ORDERS_ISSUED,
        caseTypeOfApplication: CaseType.C100,
        respondents: [
          {
            id: '1234',
            value: {
              response: {
                citizenFlags: {
                  isResponseInitiated: 'Yes',
                },
              },
              user: {
                idamId: '1234',
              },
            },
          },
        ],
        caseInvites: [
          {
            value: {
              partyId: '1234',
              invitedUserId: '1234',
            },
          },
        ],
        citizenResponseC7DocumentList: [
          {
            id: '1234',
            value: {
              partyName: 'NAME',
              createdBy: '1234',
              dateCreated: '1/1/2020',
              citizenDocument: {
                document_url: 'DOC_URL',
                document_filename: 'DOC_FILENAME',
                document_binary_url: 'DOC_BINARY_URL',
              },
            },
          },
        ],
        selectTypeOfOrder: 'finl',
      } as unknown as CaseWithId;
      const party = PartyType.RESPONDENT;
      const language = 'en';
      const userDetails = { id: '1234' } as UserDetails;

      expect(getProgressBarConfig(data, party, language, userDetails)).toStrictEqual([
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
          ariaLabel: 'Response submitted stage is completed',
          label: 'Response<br/> submitted',
          statusBarClassName: 'stage--completed',
        },
        {
          ariaLabel: 'Hearings and court orders stage is completed',
          label: 'Hearings and<br/> court orders',
          statusBarClassName: 'stage--completed',
        },
        {
          ariaLabel: 'Case closed stage is completed',
          label: 'Case closed',
          statusBarClassName: 'stage--completed',
        },
      ]);
    });
  });
});
