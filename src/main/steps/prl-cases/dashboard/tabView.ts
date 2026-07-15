import dayjs from 'dayjs';

import { CaseWithId } from '../../../app/case/case';
import { CaseType, PartyType, State } from '../../../app/case/definition';
import { UserDetails } from '../../../app/controller/AppRequest';
import { isCaseLinked } from '../../common/task-list/utils';
import { applyParms } from '../../common/url-parser';
import { C100_RETRIVE_CASE, FETCH_CASE_DETAILS, PageLink } from '../../urls';

import { getCasePartyType } from './utils';

const tabGroup = {
  [State.CASE_DRAFT]: 'draft',
  [State.CASE_SUBMITTED_NOT_PAID]: 'submitted',
  [State.CASE_SUBMITTED_PAID]: 'submitted',
  [State.CASE_ISSUED_TO_LOCAL_COURT]: 'draft',
  [State.CASE_GATE_KEEPING]: 'draft',
  [State.ALL_FINAL_ORDERS_ISSUED]: 'closed',
  [State.CASE_WITHDRAWN]: 'closed',
  [State.PROCEEDS_IN_HERITAGE_SYSTEM]: 'closed',
  '*': 'active',
};

const caseStatusTranslation = {
  [State.CASE_DRAFT]: 'draftCaseStatus',
  [State.CASE_SUBMITTED_NOT_PAID]: 'submittedCaseStatus',
  [State.CASE_SUBMITTED_PAID]: 'submittedCaseStatus',
  [State.CASE_ISSUED_TO_LOCAL_COURT]: 'caseIssued',
  [State.CASE_GATE_KEEPING]: 'caseGatekeeping',
  [State.CASE_SERVED]: 'caseServed',
  [State.PROCEEDS_IN_HERITAGE_SYSTEM]: 'caseClosed',
};

const caseStatusTagColour = {
  draft: 'govuk-tag--yellow',
  submitted: 'govuk-tag--blue',
  closed: 'govuk-tag--grey',
  active: 'govuk-tag--green',
};

const caseStatusDescription = {
  [State.CASE_DRAFT]: 'draftCaseStatusDescription',
  [State.CASE_SUBMITTED_NOT_PAID]: 'submittedCaseStatusDescription',
  [State.CASE_SUBMITTED_PAID]: 'submittedCaseStatusDescription',
  [State.CASE_ISSUED_TO_LOCAL_COURT]: 'caseIssuedDescription',
  [State.CASE_GATE_KEEPING]: 'caseGatekeepingDescription',
  [State.CASE_SERVED]: 'caseServedDescription',
  [State.PROCEEDS_IN_HERITAGE_SYSTEM]: 'heritageCaseStatusDescription',
};

const partyTypeTranslation = {
  [PartyType.APPLICANT]: 'applicantRoleLabel',
  [PartyType.RESPONDENT]: 'respondentRoleLabel',
};

interface CardStatus {
  text: string;
  classes: string;
  description: string;
}

export interface CaseCard {
  id: string;
  caseTypeHeading: string;
  caseNumber: string;
  actionText: string;
  actionUrl: PageLink;
  role: string;
  lastUpdate: string;
  status: CardStatus;
}

const getCaseTabGrouping = (
  caseData: Partial<CaseWithId>,
  userDetails: UserDetails,
  casePartyType: PartyType
): string => {
  const { state, caseTypeOfApplication } = caseData;
  const tab = tabGroup[state as string] ?? tabGroup['*'];
  if (
    tab === 'active' &&
    caseTypeOfApplication === CaseType.C100 &&
    casePartyType === PartyType.APPLICANT &&
    !isCaseLinked(caseData, userDetails)
  ) {
    return 'draft';
  }

  return tab;
};

const getTaskListUrl = (caseType: CaseType, linkPartyType: PartyType, caseNumber: string, state: string): PageLink => {
  let url;

  if (caseType === CaseType.C100 && State.AWAITING_SUBMISSION_TO_HMCTS === state) {
    url = applyParms(`${C100_RETRIVE_CASE}`, { caseId: caseNumber });
  } else {
    url = applyParms(`${FETCH_CASE_DETAILS}`, { caseId: caseNumber });
  }
  return url;
};

const getCaseTypeHeading = (caseType: CaseType, content: Record<string, string>): string => {
  const headings: Partial<Record<CaseType, string>> = {
    [CaseType.C100]: content.childArrangementsCaseHeading,
    [CaseType.FL401]: content.domesticAbuseCaseHeading,
  };
  return headings[caseType] ?? '';
};

const getActionLink = (
  tabGroupName: string,
  caseType: CaseType,
  casePartyType: PartyType,
  caseNumber: string,
  state: string,
  content: Record<string, string>
): { text: string; url: PageLink } => {
  let text: string;
  switch (tabGroupName) {
    case 'draft':
      text = content.continueApplicationText;
      break;
    case 'submitted':
      text = content.viewApplicationText;
      break;
    case 'active':
    case 'closed':
      text = content.viewCaseText;
      break;
    default:
      text = content.viewCaseText;
      break;
  }

  return {
    text,
    url: getTaskListUrl(caseType, casePartyType, caseNumber, state),
  };
};

export const prepareCaseView = (
  caseData: Partial<CaseWithId>[],
  userDetails: UserDetails,
  content: Record<string, string>
): CaseCard[] => {
  if (!caseData?.length) {
    return [];
  }

  const sortedCaseData = [...caseData].sort(
    (a, b) => dayjs(b.lastModifiedDate).valueOf() - dayjs(a.lastModifiedDate).valueOf()
  );

  return sortedCaseData.map((_case: Partial<CaseWithId>): CaseCard => {
    const { caseTypeOfApplication, ...rest } = _case;
    const state = _case.state as string;
    const casePartyType = getCasePartyType(_case, userDetails.id);
    const tab = getCaseTabGrouping(_case, userDetails, casePartyType);

    const role = content[partyTypeTranslation[casePartyType]] ?? casePartyType;
    const action = getActionLink(tab, caseTypeOfApplication as CaseType, casePartyType, rest.id!, state, content);

    const description = (content[caseStatusDescription[state]] ?? '').replace(
      '{noOfDaysRemainingToSubmitCase}',
      String(rest.noOfDaysRemainingToSubmitCase ?? '')
    );

    console.log('noOfDaysRemainingToSubmitCase for case', _case.id, ':', rest.noOfDaysRemainingToSubmitCase);
    console.log('does _case have it instead of rest? ', _case.noOfDaysRemainingToSubmitCase);

    return {
      id: rest.id!,
      caseTypeHeading: getCaseTypeHeading(caseTypeOfApplication as CaseType, content),
      caseNumber: rest.id!,
      actionText: action.text,
      actionUrl: action.url,
      role,
      lastUpdate: dayjs(rest.lastModifiedDate).format('DD MMM YYYY'),
      status: {
        text: content[caseStatusTranslation[state]] ?? state,
        classes: caseStatusTagColour[tab] ?? caseStatusTagColour.active,
        description,
      },
    };
  });
};
