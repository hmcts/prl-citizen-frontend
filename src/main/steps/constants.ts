import { CaseWithId } from '../app/case/case';
import { AppRequest } from '../app/controller/AppRequest';

import { PageLink } from './urls';

export enum Sections {
  AboutEdgeCase = 'aboutEdgeCase',
  AboutRespondentCase = 'aboutRespondentCase',
  AboutApplicantCase = 'aboutApplicantCase',
  AboutCaAndDaRespondentCase = 'aboutCaAndDaRespondentCase',
  C100 = 'c100',
}

export interface Step {
  url: string;
  showInSection?: Sections;
  showInCompleteSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: Partial<CaseWithId>, req?: AppRequest) => PageLink;
}
