import { Sections, Step } from '../constants';
import { TESTING_SUPPORT, TESTING_SUPPORT_CREATE_DRAFT } from '../urls';

export const testingSuupport: Step[] = [
  {
    url: TESTING_SUPPORT,
    showInSection: Sections.AboutApplicantCase,
    getNextStep: () => TESTING_SUPPORT_CREATE_DRAFT,
  },
];
