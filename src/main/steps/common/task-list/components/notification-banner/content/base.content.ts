import { CaseType, PartyType } from '../../../../../../app/case/definition';
import { NotificationBannerContentBaseConfig } from '../definitions';

import { CA_APPLICANT_CONTENT } from './ca_applicant';
import { CA_RESPONDENT_CONTENT } from './ca_respondent';
import { DA_APPLICANT_CONTENT } from './da_applicant';
import { DA_RESPONDENT_CONTENT } from './da_respondent';

const en: NotificationBannerContentBaseConfig = {
  title: 'Important',
  common: {
    final: 'final',
    a: 'a',
    new: 'new',
    order: 'order',
    orders: 'orders',
    tell: 'tell',
    tells: 'tells',
    and: 'and',
    respondent: 'respondent',
    respondents: 'respondents',
    has: 'has',
    have: 'have',
    titleRespondentName: '',
    theRespondent: 'The respondent',
    order1: 'order',
    orders1: 'orders',
  },
  [CaseType.C100]: {
    [PartyType.APPLICANT]: CA_APPLICANT_CONTENT.en,
    [PartyType.RESPONDENT]: CA_RESPONDENT_CONTENT.en,
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: DA_APPLICANT_CONTENT.en,
    [PartyType.RESPONDENT]: DA_RESPONDENT_CONTENT.en,
  },
};

const cy: typeof en = {
  title: 'Pwysig',
  common: {
    final: 'terfynol',
    a: '' /* no translation needed*/,
    new: 'newydd',
    order: 'orchymyn',
    orders: 'orchmynion',
    tell: 'tell (welsh)',
    tells: 'tells (welsh)',
    and: 'a gorchmynion',
    respondent: 'atebydd',
    respondents: 'atebwyr',
    has: 'has (welsh)',
    have: 'have (welsh)',
    titleRespondentName: 'Mae',
    theRespondent: 'Mae’r atebydd',
    order1: 'gorchymyn',
    orders1: 'gorchmynion',
  },
  [CaseType.C100]: {
    [PartyType.APPLICANT]: CA_APPLICANT_CONTENT.cy,
    [PartyType.RESPONDENT]: CA_RESPONDENT_CONTENT.cy,
  },
  [CaseType.FL401]: {
    [PartyType.APPLICANT]: DA_APPLICANT_CONTENT.cy,
    [PartyType.RESPONDENT]: DA_RESPONDENT_CONTENT.cy,
  },
};

export const languages = {
  en,
  cy,
};
