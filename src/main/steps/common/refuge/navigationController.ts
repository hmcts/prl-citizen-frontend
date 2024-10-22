import _ from 'lodash';

import { CaseWithId } from '../../../app/case/case';
import {
  C100Applicant,
  C100RebuildPartyDetails,
  PartyType,
  People,
  RootContext,
  YesOrNo,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getPeople } from '../../../steps/c100-rebuild/child-details/live-with/utils';
import { getPartyDetails } from '../../../steps/c100-rebuild/people/util';
import { getCasePartyType } from '../../prl-cases/dashboard/utils';
import {
  APPLICANT_ADDRESS_DETAILS,
  C100_APPLICANT_ADDRESS_LOOKUP,
  C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP,
  C100_REFUGE_UPLOAD_DOC,
  C100_URL,
  PageLink,
  REFUGE_DOC_ALREADY_UPLOADED,
  REFUGE_KEEPING_SAFE,
  REFUGE_UPLOAD_DOC,
  RESPONDENT_ADDRESS_DETAILS,
  STAYING_IN_REFUGE,
} from '../../urls';
import { applyParms } from '../url-parser';

import { getC8DocumentForC100 } from './utils';

class RefugeNavigationController {
  public getNextPageUrl(currentPageUrl: PageLink, caseData: Partial<CaseWithId>, req: AppRequest) {
    const partyType = getCasePartyType(caseData, req.session.user.id);
    let url;
    const id = req.params.id ? req.params.id : req.params.removeFileId;
    const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL);
    const c100Person = getPeople(req.session.userCase).find(person => person.id === id);
    const partyRootContext = partyType === PartyType.RESPONDENT ? RootContext.RESPONDENT : RootContext.APPLICANT;

    const partyAddressDetails =
      partyType === PartyType.RESPONDENT ? RESPONDENT_ADDRESS_DETAILS : APPLICANT_ADDRESS_DETAILS;
    const c100AddressDetails =
      c100Person?.partyType === PartyType.APPLICANT
        ? (applyParms(C100_APPLICANT_ADDRESS_LOOKUP, { applicantId: id }) as PageLink)
        : (applyParms(C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP, { otherPersonId: id }) as PageLink);
    const addressDetails = C100rebuildJourney ? c100AddressDetails : partyAddressDetails;

    const isDocumentUploaded = !_.isEmpty(
      C100rebuildJourney ? getC8DocumentForC100(id, req.session.userCase, c100Person!) : caseData.c8_refuge_document
    );
    const isPersonLivingInRefuge = C100rebuildJourney
      ? this.isC100PersonLivingInRefuge(req.session.userCase, id, c100Person!)
      : caseData.citizenUserLivingInRefuge === YesOrNo.YES;

    switch (currentPageUrl) {
      case STAYING_IN_REFUGE: {
        const nextUrl = C100rebuildJourney
          ? (applyParms(REFUGE_KEEPING_SAFE, {
              root: RootContext.C100_REBUILD,
              id,
            }) as PageLink)
          : (applyParms(REFUGE_KEEPING_SAFE, { root: partyRootContext }) as PageLink);
        url = isPersonLivingInRefuge ? nextUrl : addressDetails;
        break;
      }
      case REFUGE_KEEPING_SAFE: {
        const alreadyUploadedDocUrl = C100rebuildJourney
          ? (applyParms(REFUGE_DOC_ALREADY_UPLOADED, {
              root: RootContext.C100_REBUILD,
              id,
            }) as PageLink)
          : (applyParms(REFUGE_DOC_ALREADY_UPLOADED, { root: partyRootContext }) as PageLink);
        const uploadDocUrl = C100rebuildJourney
          ? (applyParms(C100_REFUGE_UPLOAD_DOC, {
              root: RootContext.C100_REBUILD,
              id,
            }) as PageLink)
          : (applyParms(REFUGE_UPLOAD_DOC, { root: partyRootContext }) as PageLink);
        url = isDocumentUploaded ? alreadyUploadedDocUrl : uploadDocUrl;
        break;
      }
      case REFUGE_UPLOAD_DOC: {
        url = addressDetails;
        break;
      }
      case C100_REFUGE_UPLOAD_DOC: {
        url = addressDetails;
        break;
      }
      case REFUGE_DOC_ALREADY_UPLOADED: {
        const uploadDocUrl = C100rebuildJourney
          ? (applyParms(C100_REFUGE_UPLOAD_DOC, {
              root: RootContext.C100_REBUILD,
              id,
            }) as PageLink)
          : (applyParms(REFUGE_UPLOAD_DOC, { root: partyRootContext }) as PageLink);
        url = caseData.uploadC8Again === YesOrNo.YES ? uploadDocUrl : addressDetails;
        break;
      }
      default: {
        url = currentPageUrl;
        break;
      }
    }
    return url;
  }

  private isC100PersonLivingInRefuge(caseData: CaseWithId, id: string, person: People): boolean {
    if (person.partyType === PartyType.APPLICANT) {
      const applicantDetails = getPartyDetails(id, caseData.appl_allApplicants) as C100Applicant;
      return applicantDetails.liveInRefuge! === YesOrNo.YES;
    } else {
      const otherPersonDetails = getPartyDetails(id, caseData.oprs_otherPersons) as C100RebuildPartyDetails;
      return otherPersonDetails.liveInRefuge! === YesOrNo.YES;
    }
  }
}

export default new RefugeNavigationController();
