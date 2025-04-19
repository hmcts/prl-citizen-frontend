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
  C100_APPLICANTS_PERSONAL_DETAILS,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW,
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
  public getNextPageUrl(currentPageUrl: PageLink, caseData: Partial<CaseWithId>, req: AppRequest): PageLink {
    const userId = req.session.user.id;
    const id = req.params.id ?? req.params.removeFileId;
    const isC100 = req?.originalUrl?.startsWith(C100_URL);
    const partyRoot = this.getPartyRoot(caseData, userId);
    const c100Person = getPeople(req.session.userCase).find(person => person.id === id);
    const addressUrl = this.getAddressUrl(currentPageUrl, isC100, id, c100Person, partyRoot);

    switch (currentPageUrl) {
      case STAYING_IN_REFUGE:
        return this.isInRefuge(caseData, isC100, id, req, c100Person)
          ? (applyParms(REFUGE_KEEPING_SAFE, {
              root: isC100 ? RootContext.C100_REBUILD : partyRoot,
              id,
            }) as PageLink)
          : addressUrl;

      case REFUGE_KEEPING_SAFE:
        return this.getKeepingSafeNextUrl(id, isC100, partyRoot, req, c100Person!, caseData as CaseWithId);

      case REFUGE_UPLOAD_DOC:
      case C100_REFUGE_UPLOAD_DOC:
        return addressUrl;

      case REFUGE_DOC_ALREADY_UPLOADED:
        return caseData.reUploadRefugeDocument === YesOrNo.YES
          ? (applyParms(isC100 ? C100_REFUGE_UPLOAD_DOC : REFUGE_UPLOAD_DOC, {
              root: isC100 ? RootContext.C100_REBUILD : partyRoot,
              id,
            }) as PageLink)
          : addressUrl;

      default:
        return currentPageUrl;
    }
  }

  private getPartyRoot(caseData: Partial<CaseWithId>, userId: string): RootContext {
    const partyType = getCasePartyType(caseData, userId);
    return partyType === PartyType.RESPONDENT ? RootContext.RESPONDENT : RootContext.APPLICANT;
  }

  private getAddressUrl(
    currentPageUrl: PageLink,
    isC100: boolean,
    id: string,
    person: People | undefined,
    partyRoot: RootContext
  ): PageLink {
    if (!isC100) {
      return partyRoot === RootContext.RESPONDENT ? RESPONDENT_ADDRESS_DETAILS : APPLICANT_ADDRESS_DETAILS;
    }

    const c100AddressUrl =
      person?.partyType === PartyType.APPLICANT
        ? (applyParms(C100_APPLICANTS_PERSONAL_DETAILS, { applicantId: id }) as PageLink)
        : (applyParms(C100_OTHER_PERSON_DETAILS_ADDRESS_LOOKUP, { otherPersonId: id }) as PageLink);

    return currentPageUrl === STAYING_IN_REFUGE
      ? (applyParms(C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW, { applicantId: id }) as PageLink)
      : c100AddressUrl;
  }

  private isInRefuge(
    caseData: Partial<CaseWithId>,
    isC100: boolean,
    id: string,
    req: AppRequest,
    person: People | undefined
  ): boolean {
    return isC100
      ? this.isC100PersonLivingInRefuge(req.session.userCase, id, person!)
      : caseData.isCitizenLivingInRefuge === YesOrNo.YES;
  }

  private isC100PersonLivingInRefuge(caseData: CaseWithId, id: string, person: People): boolean {
    const details =
      person.partyType === PartyType.APPLICANT
        ? (getPartyDetails(id, caseData.appl_allApplicants) as C100Applicant)
        : (getPartyDetails(id, caseData.oprs_otherPersons) as C100RebuildPartyDetails);

    return details.liveInRefuge === YesOrNo.YES;
  }

  private getKeepingSafeNextUrl(
    id: string,
    isC100: boolean,
    root: RootContext,
    req: AppRequest,
    person: People,
    caseData: CaseWithId
  ): PageLink {
    const resolvedRoot = isC100 ? RootContext.C100_REBUILD : root;

    const isDocUploaded = !_.isEmpty(
      isC100 ? getC8DocumentForC100(id, req.session.userCase, person) : caseData.refugeDocument
    );

    if (isDocUploaded) {
      return isC100
        ? (applyParms(REFUGE_DOC_ALREADY_UPLOADED, { root: resolvedRoot, id }) as PageLink)
        : (applyParms(REFUGE_DOC_ALREADY_UPLOADED, { root: resolvedRoot }) as PageLink);
    }

    return isC100
      ? (applyParms(C100_REFUGE_UPLOAD_DOC, { root: resolvedRoot, id }) as PageLink)
      : (applyParms(REFUGE_UPLOAD_DOC, { root: resolvedRoot, id }) as PageLink);
  }
}

export default new RefugeNavigationController();
