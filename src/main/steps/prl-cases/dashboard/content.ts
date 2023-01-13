import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { summaryCaseList } from '../../common/summary/utils';

export const enContent = {
  title: 'Your private law account',
  CAApplicationNote: 'Case once submitted cannot be accessed.',
  createCAApplication: 'Start new C100 application',
  caseName: 'Case Name',
  CaseStatus: "<h4>Case Status</h4>",
  CaseNumber: "Case Number",
  sectionTitles: {
    yourCAapplication: 'C100 applications where you are an applicant',
    youtCArespondentApplication: 'C100 applications where you are an respondent',
    daApplicationsMadeByYou: 'FL401 applications where you are an applicant',
    daApplicationsAgainstYou: 'FL401 applications where you are an respondent',
  },
  help: 'To view or progress your case click on your case number.',
  keys: {},
  errors: {},
};

export const cyContent = {
  title: 'Eich cyfrif cyfraith breifat',
  CAApplicationNote: 'Unwaith y bydd achos wedi’i gyflwyno, ni ellir cael mynediad ato wedyn.',
  createCAApplication: 'Dechrau cais C100 newydd',
  caseName:"Enw'r achos",
  CaseStatus:"<h4>Statws yr achos</h4>",
  CaseNumber: "Rhif yr achos",
  sectionTitles: {
    yourCAapplication: 'Ceisiadau C100 lle rydych yn geisydd',
    youtCArespondentApplication: 'Ceisiadau C100 lle rydych yn atebydd',
    daApplicationsMadeByYou: 'Ceisiadau FL401 lle rydych yn geisydd',
    daApplicationsAgainstYou: 'Ceisiadau FL401 lle rydych yn atebydd',
  },
  help: 'To view or progress your case click on your case number.',
  keys: {},
  errors: {},
};

const en = (content: CommonContent) => {
  const userCaseList: Partial<CaseWithId>[] = content.userCaseList || [];
  const c100CaseListApplicant: Partial<CaseWithId>[] = [];
  const c100CaseListRespondent: Partial<CaseWithId>[] = [];
  const fl401CaseListApplicant: Partial<CaseWithId>[] = [];
  const fl401CaseListRespondent: Partial<CaseWithId>[] = [];
  let isRespondent = false;
  let isRespondentFL401 = false;
  for (const userCase of userCaseList || []) {
    if (userCase.caseTypeOfApplication === 'C100') {
      isRespondent = isLinkedToRespondent(userCase);
      if (!isRespondent) {
        c100CaseListApplicant.push(userCase);
      } else {
        c100CaseListRespondent.push(userCase);
      }
    } else if (userCase.caseTypeOfApplication === 'FL401') {
      isRespondentFL401 = isLinkedToRespondentFl401(userCase);
      if (!isRespondentFL401) {
        fl401CaseListApplicant.push(userCase);
      } else {
        fl401CaseListRespondent.push(userCase);
      }
    }
  }
  return {
    title: enContent.title,
    sections: [
      {
        ...summaryCaseList("en",c100CaseListApplicant, enContent.sectionTitles.yourCAapplication, isRespondent),
        help: `
        <p class="govuk-body">${enContent.CAApplicationNote}</p>
        <h1 class="govuk-heading-m"><a href="/c100-rebuild/start" class="govuk-link">${enContent.createCAApplication}</a></h1>`,
      },
      summaryCaseList("en",c100CaseListRespondent, enContent.sectionTitles.youtCArespondentApplication, true),
      summaryCaseList("en",fl401CaseListApplicant, enContent.sectionTitles.daApplicationsMadeByYou, false),
      summaryCaseList("en",fl401CaseListRespondent, enContent.sectionTitles.daApplicationsAgainstYou, true),
    ],
    help: enContent.help,
  };
};

const cy = (content: CommonContent) => {
  const userCaseList: Partial<CaseWithId>[] = content.userCaseList || [];
  const c100CaseListApplicant: Partial<CaseWithId>[] = [];
  const c100CaseListRespondent: Partial<CaseWithId>[] = [];
  const fl401CaseListApplicant: Partial<CaseWithId>[] = [];
  const fl401CaseListRespondent: Partial<CaseWithId>[] = [];
  let isRespondent = false;
  let isRespondentFL401 = false;
  for (const userCase of userCaseList || []) {
    if (userCase.caseTypeOfApplication === 'C100') {
      isRespondent = isLinkedToRespondent(userCase);
      if (!isRespondent) {
        c100CaseListApplicant.push(userCase);
      } else {
        c100CaseListRespondent.push(userCase);
      }
    } else if (userCase.caseTypeOfApplication === 'FL401') {
      isRespondentFL401 = isLinkedToRespondentFl401(userCase);
      if (!isRespondentFL401) {
        fl401CaseListApplicant.push(userCase);
      } else {
        fl401CaseListRespondent.push(userCase);
      }
    }
  }
  return {
    title: cyContent.title,
    sections: [
      {
        ...summaryCaseList("cy",c100CaseListApplicant, cyContent.sectionTitles.yourCAapplication, isRespondent),
        help: `
        <p class="govuk-body">${cyContent.CAApplicationNote}</p>
        <h1 class="govuk-heading-m"><a href="/c100-rebuild/start" class="govuk-link">${cyContent.createCAApplication}</a></h1>`,
      },
      summaryCaseList("cy",c100CaseListRespondent, cyContent.sectionTitles.youtCArespondentApplication, true),
      summaryCaseList("cy",fl401CaseListApplicant, cyContent.sectionTitles.daApplicationsMadeByYou, false),
      summaryCaseList("cy",fl401CaseListRespondent, cyContent.sectionTitles.daApplicationsAgainstYou, true),
    ],
    help: cyContent.help,
  };
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
function isLinkedToRespondent(userCase: Partial<CaseWithId>): boolean {
  for (const caseInviteEmail of userCase.caseInvites || []) {
    for (const respondent of userCase.respondents || []) {
      if (caseInviteEmail.value.partyId === respondent.id) {
        return true;
      }
    }
  }
  return false;
}
function isLinkedToRespondentFl401(userCase: Partial<CaseWithId>): boolean {
  for (const caseInviteEmail of userCase.caseInvites || []) {
    if (
      userCase.respondentsFL401?.user?.idamId &&
      caseInviteEmail.value.invitedUserId &&
      userCase.respondentsFL401?.user?.idamId === caseInviteEmail.value.invitedUserId &&
      caseInviteEmail.value.isApplicant === YesOrNo.NO
    ) {
      return true;
    }
  }
  return false;
}
