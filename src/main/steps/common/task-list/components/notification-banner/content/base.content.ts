import { CaseType, PartyType } from '../../../../../../app/case/definition';
import { NotificationBannerContentBaseConfig } from '../definitions';

import { CA_APPLICANT_CONTENT } from './ca_applicant';
import { CA_RESPONDENT_CONTENT } from './ca_respondent';
import { DA_APPLICANT_CONTENT } from './da_applicant';
import { DA_RESPONDENT_CONTENT } from './da_respondent';

const en: NotificationBannerContentBaseConfig = {
  title: 'Important',
  common: {
    theRespondent: 'The respondent',
    final: 'final',
    a: 'a',
    new: 'new',
    order: 'order',
    orders: 'orders',
    tell: 'tell',
    tells: 'tells',
    and: 'and',
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
    theRespondent: 'The respondent - welsh',
    final: 'final (welsh)',
    a: 'a (welsh)',
    new: 'new (welsh)',
    order: 'order (welsh)',
    orders: 'orders (welsh)',
    tell: 'tell (welsh)',
    tells: 'tells (welsh)',
    and: 'and (welsh)',
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
