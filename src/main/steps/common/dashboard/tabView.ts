import dayjs from 'dayjs';

import { CaseWithId } from '../../../app/case/case';
import { CaseType, PartyType, State, YesOrNo } from '../../../app/case/definition';
import { applyParms } from '../url-parser';

import { APPLICANT_TASK_LIST_URL, C100_RETRIVE_CASE, PageLink, RESPONDENT_TASK_LIST_URL } from './../../urls';

const tabGroup = {
  [State.AwaitingSubmissionToHmcts]: 'draft',
  [State.Submitted]: 'draft',
  [State.ALL_FINAL_ORDERS_ISSUED]: 'closed',
  '*': 'active',
};

interface CaseDetails {
  caseNumber: string;
  caseType: CaseType;
  caseApplicantName: string;
  caseStatus: string;
  createdDate: string;
  lastModifiedDate: string;
  caseLinkPartyType: PartyType;
}

interface TabFields {
  label: string;
  id: string;
  heading: string;
  body?: string;
  head?: TableHeaderFields[];
  rows?: TableRowFields[][];
}

interface TableHeaderFields {
  text: string;
}

interface TableRowFields {
  text?: string;
  html?: string;
}
interface Tabs {
  draft: TabFields;
  active: TabFields;
  closed: TabFields;
}

const prepareTabContent = (content): Tabs => {
  const {
    draftApplicationTabLabel,
    draftApplicationTabHeading,
    draftApplicationTabContent,
    activeCasesTabLabel,
    activeCasesTabHeading,
    closedCasesTabLabel,
    closedCasesTabHeading,
    caseNumber,
    caseType,
    caseStatus,
    createdDate,
    applicant,
    lastUpdated,
    closeDate,
  } = content;
  const tabs: Record<keyof Tabs, TabFields> = {
    draft: {
      label: draftApplicationTabLabel,
      id: 'draft-cases',
      heading: draftApplicationTabHeading,
      body: draftApplicationTabContent,
      head: [
        {
          text: caseNumber,
        },
        {
          text: caseType,
        },
        {
          text: caseStatus,
        },
        {
          text: createdDate,
        },
      ],
      rows: [],
    },
    active: {
      label: activeCasesTabLabel,
      id: 'active-cases',
      heading: activeCasesTabHeading,
      head: [
        {
          text: caseNumber,
        },
        {
          text: caseType,
        },
        {
          text: applicant,
        },
        {
          text: lastUpdated,
        },
      ],
      rows: [],
    },
    closed: {
      label: closedCasesTabLabel,
      id: 'closed-cases',
      heading: closedCasesTabHeading,
      head: [
        {
          text: caseNumber,
        },
        {
          text: caseType,
        },
        {
          text: applicant,
        },
        {
          text: closeDate,
        },
      ],
      rows: [],
    },
  };

  return tabs;
};

const prepareTableData = (caseData: CaseDetails, tab: string): TableRowFields[] => {
  const { caseNumber, caseType, caseLinkPartyType, caseStatus, caseApplicantName, createdDate, lastModifiedDate } =
    caseData;
  const rows: TableRowFields[] = [
    {
      html: `<a class="govuk-link" href="${getTaskListUrl(caseType, caseLinkPartyType, caseNumber)}">${caseNumber}</a>`,
    },
    {
      text: caseType,
    },
  ];

  if (tab === 'draft') {
    rows.push({
      text: caseStatus,
    });
    rows.push({
      text: createdDate,
    });
  } else {
    rows.push({
      text: caseApplicantName,
    });
    rows.push({
      text: lastModifiedDate,
    });
  }

  return rows;
};

export const prepareCaseView = (caseData: Partial<CaseWithId>[], content: Record<string, string>): Tabs => {
  let tabs = prepareTabContent(content);

  if (caseData.length) {
    tabs = caseData.reduce(
      (_tabs: Tabs, _case: Partial<CaseWithId>) => {
        const { state, caseTypeOfApplication, ...rest } = _case;
        const tab = tabGroup[state as string] ?? tabGroup['*'];

        if (_tabs[tab]) {
          _tabs[tab].rows.push(
            prepareTableData(
              {
                caseNumber: rest.id!,
                caseType: caseTypeOfApplication as CaseType,
                caseLinkPartyType: caseLinkPartyType(caseTypeOfApplication as CaseType, _case),
                caseApplicantName: rest.applicantName ?? '',
                caseStatus: state!,
                createdDate: dayjs(rest.createdDate).format('DD MMM YYYY'),
                lastModifiedDate: dayjs(rest.lastModifiedDate).format('DD MMM YYYY'),
              },
              tab
            )
          );
        }

        return _tabs;
      },
      { ...tabs }
    );
  }

  Object.values(tabs).forEach(tab => {
    if (!tab.rows.length) {
      tab.body = content.noCase;
      tab.head = [];
    }
  });

  return tabs;
};

const caseLinkPartyType = (caseType: CaseType, caseData: Partial<CaseWithId>): PartyType => {
  if (caseType === CaseType.C100) {
    return caseData.caseInvites?.find(invities =>
      caseData.respondents?.find(respondent => respondent.id === invities.value.partyId)
    )
      ? PartyType.RESPONDENT
      : PartyType.APPLICANT;
  } else {
    return caseData.caseInvites?.find(
      invities =>
        invities.value.isApplicant === YesOrNo.NO &&
        invities.value.invitedUserId === caseData.respondentsFL401?.user.idamId
    )
      ? PartyType.RESPONDENT
      : PartyType.APPLICANT;
  }
};

const getTaskListUrl = (
  caseType: CaseType,
  linkPartyType: PartyType,
  caseNumber: CaseDetails['caseNumber']
): PageLink => {
  let url;

  if (linkPartyType === PartyType.RESPONDENT) {
    url = `${RESPONDENT_TASK_LIST_URL}/${caseNumber}`;
  } else {
    if (caseType === CaseType.C100) {
      url = applyParms(`${C100_RETRIVE_CASE}`, { caseId: caseNumber });
    } else {
      url = `${APPLICANT_TASK_LIST_URL}/${caseNumber}`;
    }
  }

  return url;
};
