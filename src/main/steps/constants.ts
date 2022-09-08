import { CaseWithId } from '../app/case/case';

import { PageLink } from './urls';

export enum Sections {
  AboutEdgeCase = 'aboutEdgeCase',
  AboutRespondentCase = 'aboutRespondentCase',
  AboutApplicantCase = 'aboutApplicantCase',
  AboutCaAndDaRespondentCase = 'aboutCaAndDaRespondentCase',
}

export interface Step {
  url: string;
  showInSection?: Sections;
  showInCompleteSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: Partial<CaseWithId>) => PageLink;
}
