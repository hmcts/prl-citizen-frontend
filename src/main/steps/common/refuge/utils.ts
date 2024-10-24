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
import { FormError } from '../../../app/form/Form';
import { getPeople } from '../../../steps/c100-rebuild/child-details/live-with/utils';
import { getPartyDetails, updatePartyDetails } from '../../../steps/c100-rebuild/people/util';
import { getCasePartyType } from '../../prl-cases/dashboard/utils';
import { C100_REFUGE_UPLOAD_DOC, C100_URL, REFUGE_UPLOAD_DOC } from '../../urls';
import { applyParms } from '../url-parser';

export const removeErrors = (errors: FormError[] | undefined): FormError[] => {
  return errors?.length ? errors.filter(error => error.propertyName !== 'c8RefugeDocument') : [];
};

export const handleError = (
  errors: FormError[] | undefined,
  errorType: string,
  omitOtherErrors?: boolean
): FormError[] => {
  let _errors: FormError[] = errors?.length ? errors : [];

  if (omitOtherErrors) {
    _errors = [...removeErrors(_errors)];
  }

  return [..._errors, { errorType, propertyName: 'c8RefugeDocument' }];
};

export const deleteDocument = async (req: AppRequest, res: Response, id?: string): Promise<void> => {
  const { params, session } = req;
  const { user: userDetails, userCase: caseData } = session;
  const partyType = getCasePartyType(caseData, userDetails.id);
  const client = new CosApiClient(userDetails.accessToken, req.locals.logger);
  const C100rebuildJourney = req?.originalUrl?.startsWith(C100_URL);

  try {
    await client.deleteDocument(params.removeFileId);

    if (C100rebuildJourney) {
      deleteC100RefugeDoc(req, caseData, id!);
    } else if (req.session.userCase.hasOwnProperty('c8_refuge_document')) {
      delete req.session.userCase.c8_refuge_document;
    }

    req.session.errors = removeErrors(req.session.errors);
  } catch (e) {
    req.session.errors = handleError(req.session.errors, 'deleteError', true);
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
  const c100Person = getPeople(caseData).find(person => person.id === id)!;
  if (c100Person.partyType === PartyType.APPLICANT) {
    const applicantDetails = getPartyDetails(id, caseData.appl_allApplicants) as C100Applicant;
    if (applicantDetails.hasOwnProperty('refugeConfidentialityC8Form')) {
      delete applicantDetails.refugeConfidentialityC8Form;
      req.session.userCase.appl_allApplicants = updatePartyDetails(
        applicantDetails,
        req.session.userCase.appl_allApplicants
      ) as C100Applicant[];
    }
  } else {
    const otherPersonDetails = getPartyDetails(id, caseData.oprs_otherPersons) as C100RebuildPartyDetails;
    if (otherPersonDetails.hasOwnProperty('refugeConfidentialityC8Form')) {
      delete otherPersonDetails.refugeConfidentialityC8Form;
      req.session.userCase.oprs_otherPersons = updatePartyDetails(
        otherPersonDetails,
        req.session.userCase.oprs_otherPersons
      ) as C100RebuildPartyDetails[];
    }
  }
};

export const getC8DocumentForC100 = (id: string, caseData: CaseWithId, person: People): Document => {
  let c8Document;

  if (person.partyType === PartyType.APPLICANT) {
    const applicantDetails = getPartyDetails(id, caseData.appl_allApplicants) as C100Applicant;
    c8Document = applicantDetails.refugeConfidentialityC8Form;
  } else {
    const otherPersonDetails = getPartyDetails(id, caseData.oprs_otherPersons) as C100RebuildPartyDetails;
    c8Document = otherPersonDetails.refugeConfidentialityC8Form;
  }

  return c8Document;
};
