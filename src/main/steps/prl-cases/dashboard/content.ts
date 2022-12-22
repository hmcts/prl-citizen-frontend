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
  title: 'Your private law account (welsh)',
  CAApplicationNote: 'Case once submitted cannot be accessed. (welsh)',
  createCAApplication: 'Start new C100 application (welsh)',
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
        ...summaryCaseList(c100CaseListApplicant, enContent.sectionTitles.yourCAapplication, false),
        help: `
        <p class="govuk-body">${enContent.CAApplicationNote}</p>
        <h1 class="govuk-heading-m"><a href="/c100-rebuild/start" class="govuk-link">${enContent.createCAApplication}</a></h1>`,
        id: 'C100-applicant',
      },
      {
        ...summaryCaseList(c100CaseListRespondent, enContent.sectionTitles.youtCArespondentApplication, true),
        id: 'C100-respondent',
      },
      {
        ...summaryCaseList(fl401CaseListApplicant, enContent.sectionTitles.daApplicationsMadeByYou, false),
        id: 'fl401-applicant',
      },
      {
        ...summaryCaseList(fl401CaseListRespondent, enContent.sectionTitles.daApplicationsAgainstYou, true),
        id: 'fl401-respondent',
      },
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
        ...summaryCaseList(c100CaseListApplicant, cyContent.sectionTitles.yourCAapplication, false),
        help: `
        <p class="govuk-body">${cyContent.CAApplicationNote}</p>
        <h1 class="govuk-heading-m"><a href="/c100-rebuild/start" class="govuk-link">${cyContent.createCAApplication}</a></h1>`,
        id: 'C100-applicant',
      },
      {
        ...summaryCaseList(c100CaseListRespondent, cyContent.sectionTitles.youtCArespondentApplication, true),
        id: 'C100-respondent',
      },
      {
        ...summaryCaseList(fl401CaseListApplicant, cyContent.sectionTitles.daApplicationsMadeByYou, false),
        id: 'fl401-applicant',
      },
      {
        ...summaryCaseList(fl401CaseListRespondent, cyContent.sectionTitles.daApplicationsAgainstYou, true),
        id: 'fl401-respondent',
      },
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
