import dayjs from 'dayjs';

import { CaseWithId } from '../../../app/case/case';
import { CaseType, PartyType, State } from '../../../app/case/definition';
//import { isCaseLinked } from '../../../steps/common/task-list/utils';
import { applyParms } from '../../common/url-parser';
import {
  APPLICANT_TASK_LIST_URL,
  C100_RETRIVE_CASE,
  FETCH_CASE_DETAILS,
  //FETCH_CASE_DETAILS,
  PageLink,
  RESPONDENT_TASK_LIST_URL,
} from '../../urls';

import { UserDetails } from './../../../app/controller/AppRequest';
import { getCasePartyType } from './utils';

const tabGroup = {
  [State.CASE_DRAFT]: 'draft',
  // [State.CASE_SUBMITTED_NOT_PAID]: 'draft',
  // [State.CASE_SUBMITTED_PAID]: 'draft',
  [State.CASE_ISSUED_TO_LOCAL_COURT]: 'draft',
  [State.CASE_GATE_KEEPING]: 'draft',
  [State.CASE_CLOSED]: 'closed',
  [State.CASE_WITHDRAWN]: 'closed',
  [State.PREPARE_FOR_HEARING_CONDUCT_HEARING]: 'active',
  '*': 'active',
};

const caseStatusTranslation = {
  [State.CASE_DRAFT]: 'draftCaseStatus',
  [State.CASE_SUBMITTED_NOT_PAID]: 'submittedCaseStatus',
  [State.CASE_SUBMITTED_PAID]: 'submittedCaseStatus',
  [State.CASE_ISSUED_TO_LOCAL_COURT]: 'caseIssued',
  [State.CASE_GATE_KEEPING]: 'caseGatekeeping',
  [State.CASE_SERVED]: 'caseServed',
};
interface CaseDetails {
  caseNumber: string;
  caseType: CaseType;
  caseApplicantName: string;
  caseStatus: string; //This is to group cases based on caseStatus.state like draft, active & closed
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
      html: `<a class="govuk-link" href="${getTaskListUrl(
        caseType,
        casePartyType,
        caseNumber,
        caseStatus
      )}">${caseNumber}</a>`,
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

export const prepareCaseView = (
  caseData: Partial<CaseWithId>[],
  userDetails: UserDetails,
  content: Record<string, string>
): Tabs => {
  let tabs = prepareTabContent(content);

  if (caseData?.length) {
    tabs = caseData.reduce(
      (_tabs: Tabs, _case: Partial<CaseWithId>) => {
        const { caseTypeOfApplication, ...rest } = _case;
        const state = _case.state;
        const caseStatus = content?.[caseStatusTranslation?.[state!]] ?? (state as string);
        const casePartyType = getCasePartyType(_case, userDetails.id);
        const tab = getCaseTabGrouping(_case, userDetails, casePartyType);
        let caseApplicantName = rest.applicantName;

        if (!caseApplicantName) {
          caseApplicantName = rest?.applicants?.length
            ? `${rest.applicants[0].value.firstName} ${rest.applicants[0].value.lastName}`
            : '';
        }

        if (_tabs[tab]) {
          _tabs[tab].rows.push(
            prepareTableData(
              {
                caseNumber: rest.id!,
                caseType: caseTypeOfApplication as CaseType,
                casePartyType,
                caseApplicantName,
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
/* eslint-disable @typescript-eslint/no-unused-vars*/
const getCaseTabGrouping = (
  caseData: Partial<CaseWithId>,
  userDetails: UserDetails,
  casePartyType: PartyType
): string => {
  const { state, caseTypeOfApplication } = caseData;
  const tab = tabGroup[state as string] ?? tabGroup['*'];
  if (
    tab === 'active' &&
    caseTypeOfApplication !== CaseType.C100

    //&&
    //casePartyType === PartyType.APPLICANT
    //&&
    //!isCaseLinked(caseData, userDetails)
  ) {
    return 'draft';
  }

  return tab;
};

const getTaskListUrl = (
  caseType: CaseType,
  linkPartyType: PartyType,
  caseNumber: CaseDetails['caseNumber'],
  caseStatus: CaseDetails['caseStatus']
): PageLink => {
  let url;

  if (linkPartyType === PartyType.RESPONDENT) {
    url = `${RESPONDENT_TASK_LIST_URL}/${caseNumber}`;
  } else {
    if (caseType === CaseType.C100) {
      if (State.AWAITING_SUBMISSION_TO_HMCTS === caseStatus) {
        url = applyParms(`${C100_RETRIVE_CASE}`, { caseId: caseNumber });
      } else {
        url = applyParms(`${FETCH_CASE_DETAILS}`, { caseId: caseNumber });
      }
    } else {
      url = `${APPLICANT_TASK_LIST_URL}/${caseNumber}`;
    }
  }

  return url;
};
