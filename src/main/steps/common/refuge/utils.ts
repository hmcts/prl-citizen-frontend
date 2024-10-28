import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseWithId } from '../../../app/case/case';
import {
  C100Applicant,
  C100RebuildPartyDetails,
  Document,
  PartyType,
  People,
  RootContext,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getPeople } from '../../../steps/c100-rebuild/child-details/live-with/utils';
import { People as CombinedPeople, getPartyDetails, updatePartyDetails } from '../../../steps/c100-rebuild/people/util';
import { getCasePartyType } from '../../prl-cases/dashboard/utils';
import { C100_REFUGE_UPLOAD_DOC, C100_URL, REFUGE_UPLOAD_DOC } from '../../urls';
import { applyParms } from '../url-parser';
import { handleError, removeErrors } from '../utils';

export const deleteDocument = async (
  req: AppRequest,
  res: Response,
  removeFileId: string,
  id?: string
): Promise<void> => {
  const { session } = req;
  const { user: userDetails, userCase: caseData } = session;
  const partyType = getCasePartyType(caseData, userDetails.id);
  const client = new CosApiClient(userDetails.accessToken, req.locals.logger);
  const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL);

  try {
    await client.deleteDocument(removeFileId);

    if (C100rebuildJourney) {
      deleteC100RefugeDoc(req, caseData, id!);
    } else if (req.session.userCase.hasOwnProperty('refugeDocument')) {
      delete req.session.userCase.refugeDocument;
    }

    req.session.errors = removeErrors(req.session.errors);
  } catch (e) {
    req.session.errors = handleError(req.session.errors, 'deleteError', 'c8RefugeDocument', true);
  } finally {
    if (!req.url.includes('checkanswers')) {
      const redirectUrl = C100rebuildJourney
        ? applyParms(C100_REFUGE_UPLOAD_DOC, {
            root: RootContext.C100_REBUILD,
            id: id!,
          })
        : applyParms(REFUGE_UPLOAD_DOC, {
            root: partyType,
          });

      req.session.save(() => {
        res.redirect(redirectUrl);
      });
    }
  }
};

export const deleteC100RefugeDoc = (req: AppRequest, caseData: CaseWithId, id: string): void => {
  const c100Person = getPeople(caseData).find(person => person.id === id);
  const isApplicant = c100Person?.partyType === PartyType.APPLICANT;
  const partyDetailsList = isApplicant ? caseData.appl_allApplicants : caseData.oprs_otherPersons;
  const partyDetails = getPartyDetails(id, partyDetailsList) as C100Applicant | C100RebuildPartyDetails;

  if (partyDetails.hasOwnProperty('refugeConfidentialityC8Form')) {
    delete partyDetails.refugeConfidentialityC8Form;

    req.session.userCase = updateApplicantOtherPersonDetails(caseData, partyDetails, partyDetailsList!, isApplicant);
  }
};

export const updateApplicantOtherPersonDetails = (
  caseData: CaseWithId,
  partyDetails: C100Applicant | C100RebuildPartyDetails,
  partyDetailsList: CombinedPeople[],
  isApplicant: boolean
): CaseWithId => {
  if (isApplicant) {
    caseData.appl_allApplicants = updatePartyDetails(partyDetails, partyDetailsList) as C100Applicant[];
  } else {
    caseData.oprs_otherPersons = updatePartyDetails(partyDetails, partyDetailsList) as C100RebuildPartyDetails[];
  }
  return caseData;
};

export const getC8DocumentForC100 = (id: string, caseData: CaseWithId, person: People): Document | undefined => {
  return person.partyType === PartyType.APPLICANT
    ? (getPartyDetails(id, caseData.appl_allApplicants) as C100Applicant).refugeConfidentialityC8Form
    : (getPartyDetails(id, caseData.oprs_otherPersons) as C100RebuildPartyDetails).refugeConfidentialityC8Form;
};
