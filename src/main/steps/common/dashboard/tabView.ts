import dayjs from 'dayjs';

import { CaseWithId } from '../../../app/case/case';
import { CaseType, PartyType, State } from '../../../app/case/definition';
import { applyParms } from '../url-parser';

import { APPLICANT_TASK_LIST_URL, FETCH_CASE_DETAILS, PageLink, RESPONDENT_TASK_LIST_URL } from './../../urls';
import { getCasePartyType } from './utils';

const tabGroup = {
  [State.AwaitingSubmissionToHmcts]: 'draft',
  [State.SUBMITTED_NOT_PAID]: 'draft',
  [State.SUBMITTED_PAID]: 'draft',
  [State.ALL_FINAL_ORDERS_ISSUED]: 'closed',
  '*': 'active',
};

const caseStatusTranslation = {
  [State.AwaitingSubmissionToHmcts]: 'draftCaseStatus',
  [State.SUBMITTED_NOT_PAID]: 'pendingCaseStatus',
  [State.SUBMITTED_PAID]: 'submittedCaseStatus',
};
interface CaseDetails {
  caseNumber: string;
  caseType: CaseType;
  caseApplicantName: string;
  caseStatus: string;
  createdDate: string;
  lastModifiedDate: string;
  casePartyType: PartyType;
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
  const { caseNumber, caseType, casePartyType, caseStatus, caseApplicantName, createdDate, lastModifiedDate } =
    caseData;
  const rows: TableRowFields[] = [
    {
      html: `<a class="govuk-link" href="${getTaskListUrl(caseType, casePartyType, caseNumber)}">${caseNumber}</a>`,
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

  if (caseData?.length) {
    tabs = caseData.reduce(
      (_tabs: Tabs, _case: Partial<CaseWithId>) => {
        const { state, caseTypeOfApplication, ...rest } = _case;
        const tab = tabGroup[state as string] ?? tabGroup['*'];
        const caseStatus = content?.[caseStatusTranslation?.[state!]] ?? (state as string);

        if (_tabs[tab]) {
          _tabs[tab].rows.push(
            prepareTableData(
              {
                caseNumber: rest.id!,
                caseType: caseTypeOfApplication as CaseType,
                casePartyType: getCasePartyType(_case),
                caseApplicantName: rest.applicantName ?? '',
                caseStatus,
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
      url = applyParms(`${FETCH_CASE_DETAILS}`, { caseId: caseNumber });
    } else {
      url = `${APPLICANT_TASK_LIST_URL}/${caseNumber}`;
    }
  }

  return url;
};
