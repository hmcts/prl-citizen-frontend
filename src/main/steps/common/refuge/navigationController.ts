import _ from 'lodash';

import { CaseWithId } from '../../../app/case/case';
import { PartyType, RootContext, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getCasePartyType } from '../../prl-cases/dashboard/utils';
import {
  APPLICANT_ADDRESS_DETAILS,
  C100_APPLICANT_ADDRESS,
  C100_URL,
  PageLink,
  REFUGE_DOC_ALREADY_UPLOADED,
  REFUGE_KEEPING_SAFE,
  REFUGE_UPLOAD_DOC,
  RESPONDENT_ADDRESS_DETAILS,
  STAYING_IN_REFUGE,
} from '../../urls';
import { applyParms } from '../url-parser';

class RefugeNavigationController {
  public getNextPageUrl(currentPageUrl: PageLink, caseData: Partial<CaseWithId>, req: AppRequest) {
    const partyType = getCasePartyType(caseData, req.session.user.id);
    let url;
    const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL);
    const partyRootContext = partyType === PartyType.RESPONDENT ? RootContext.RESPONDENT : RootContext.APPLICANT;
    const partyAddressDetails =
      partyType === PartyType.RESPONDENT ? RESPONDENT_ADDRESS_DETAILS : APPLICANT_ADDRESS_DETAILS;
    const addressDetails = C100rebuildJourney
      ? (applyParms(C100_APPLICANT_ADDRESS, { root: RootContext.C100_REBUILD }) as PageLink)
      : partyAddressDetails;

    switch (currentPageUrl) {
      case STAYING_IN_REFUGE: {
        const nextUrl = C100rebuildJourney
          ? (applyParms(REFUGE_KEEPING_SAFE, { root: RootContext.C100_REBUILD }) as PageLink)
          : (applyParms(REFUGE_KEEPING_SAFE, { root: partyRootContext }) as PageLink);
        url = caseData.citizenUserLivingInRefuge === YesOrNo.YES ? nextUrl : addressDetails;
        break;
      }
      case REFUGE_KEEPING_SAFE: {
        const alreadyUploadedDocUrl = C100rebuildJourney
          ? (applyParms(REFUGE_DOC_ALREADY_UPLOADED, { root: RootContext.C100_REBUILD }) as PageLink)
          : (applyParms(REFUGE_DOC_ALREADY_UPLOADED, { root: partyRootContext }) as PageLink);
        const uploadDocUrl = C100rebuildJourney
          ? (applyParms(REFUGE_UPLOAD_DOC, { root: RootContext.C100_REBUILD }) as PageLink)
          : (applyParms(REFUGE_UPLOAD_DOC, { root: partyRootContext }) as PageLink);
        url = !_.isEmpty(caseData.c8_refuge_document) ? alreadyUploadedDocUrl : uploadDocUrl;
        break;
      }
      case REFUGE_UPLOAD_DOC: {
        url = addressDetails;
        break;
      }
      case REFUGE_DOC_ALREADY_UPLOADED: {
        const uploadDocUrl = C100rebuildJourney
          ? (applyParms(REFUGE_UPLOAD_DOC, { root: RootContext.C100_REBUILD }) as PageLink)
          : (applyParms(REFUGE_UPLOAD_DOC, { root: partyRootContext }) as PageLink);
        url =
          caseData.uploadC8Again === YesOrNo.YES
            ? (applyParms(uploadDocUrl, { partyType }) as PageLink)
            : addressDetails;
        break;
      }
      default: {
        url = currentPageUrl;
        break;
      }
    }
    return url;
  }
}

export default new RefugeNavigationController();
