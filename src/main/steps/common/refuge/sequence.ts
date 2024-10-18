import { Sections, Step } from '../../../steps/constants';
import {
  C100_REFUGE_UPLOAD_DOC,
  REFUGE_DOC_ALREADY_UPLOADED,
  REFUGE_KEEPING_SAFE,
  REFUGE_UPLOAD_DOC,
  STAYING_IN_REFUGE,
} from '../../../steps/urls';

import RefugeNavigationController from './navigationController';

export class RefugeSequence {
  getSequence(): Step[] {
    return [
      {
        url: STAYING_IN_REFUGE,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          return RefugeNavigationController.getNextPageUrl(STAYING_IN_REFUGE, caseData, req!);
        },
      },
      {
        url: REFUGE_KEEPING_SAFE,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          return RefugeNavigationController.getNextPageUrl(REFUGE_KEEPING_SAFE, caseData, req!);
        },
      },
      {
        url: REFUGE_UPLOAD_DOC,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          return RefugeNavigationController.getNextPageUrl(REFUGE_UPLOAD_DOC, caseData, req!);
        },
      },
      {
        url: C100_REFUGE_UPLOAD_DOC,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          return RefugeNavigationController.getNextPageUrl(REFUGE_UPLOAD_DOC, caseData, req!);
        },
      },
      {
        url: REFUGE_DOC_ALREADY_UPLOADED,
        showInSection: Sections.C100,
        getNextStep: (caseData, req) => {
          return RefugeNavigationController.getNextPageUrl(REFUGE_DOC_ALREADY_UPLOADED, caseData, req!);
        },
      },
    ];
  }
}

export const C8RefugeSequence = new RefugeSequence();
