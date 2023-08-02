import autobind from 'autobind-decorator';
import { Response } from 'express';

import { DocType, PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../app/controller/PostController';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import {
  APPLICANT,
  APPLICANT_MIAM_CERTIFICATE,
  DIGITAL_DOWNLOADS,
  DRUG_ALCOHOL_TESTS,
  LETTER_FROM_SCHOOL,
  MEDICAL_RECORDS,
  MEDICAL_REPORTS,
  OTHER_DOCUMENTS,
  OTHER_PEOPLE_WITNESS_STATEMENTS,
  PATERNITY_TEST_REPORTS,
  POLICE_DISCLOSURE,
  POSITION_STATEMENTS,
  PREVIOUS_ORDERS_SUBMITTED,
  RESPONDENT,
  TENANCY_AND_MORTGAGE_AVAILABILITY,
  WITNESS_AVAILABILITY,
  YOUR_WITNESS_STATEMENTS,
} from '../../../../steps/urls';

@autobind
export default class AllDocumentsGetController {
  public async get(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    req.session.applicationSettings = {
      ...req.session.applicationSettings,
      docToView: {
        docType: req.params.docType,
        uploadedBy: req.params.uploadedBy,
        partyName: req.params.partyName,
      },
    };

    const url =
      getCasePartyType(req.session.userCase, req.session.user.id) === PartyType.APPLICANT ? APPLICANT : RESPONDENT;

    req.session.save(error => {
      if (error) {
        throw error;
      }
      res.redirect(url + getViewDocumentUrl(req.params.docType));
    });
  }
}

export const getViewDocumentUrl = (docType: string): string => {
  let viewDocumentUrl;

  switch (docType) {
    case DocType.POSITION_STATEMENTS:
      viewDocumentUrl = POSITION_STATEMENTS;
      break;
    case DocType.YOUR_WITNESS_STATEMENTS:
      viewDocumentUrl = YOUR_WITNESS_STATEMENTS;
      break;
    case DocType.LETTERS_FROM_SCHOOL:
      viewDocumentUrl = LETTER_FROM_SCHOOL;
      break;
    case DocType.DIGITAL_DOWNLOADS:
      viewDocumentUrl = DIGITAL_DOWNLOADS;
      break;
    case DocType.MEDICAL_RECORDS:
      viewDocumentUrl = MEDICAL_RECORDS;
      break;
    case DocType.PATERNITY_TEST_REPORTS:
      viewDocumentUrl = PATERNITY_TEST_REPORTS;
      break;
    case DocType.DRUG_ALCOHOL_TESTS:
      viewDocumentUrl = DRUG_ALCOHOL_TESTS;
      break;
    case DocType.POLICE_REPORTS:
      viewDocumentUrl = POLICE_DISCLOSURE;
      break;
    case DocType.WITNESS_AVAILABILITY:
      viewDocumentUrl = WITNESS_AVAILABILITY;
      break;
    case DocType.TENANCY_AND_MORTGAGE_AVAILABILITY:
      viewDocumentUrl = TENANCY_AND_MORTGAGE_AVAILABILITY;
      break;
    case DocType.MEDICAL_REPORTS:
      viewDocumentUrl = MEDICAL_REPORTS;
      break;
    case DocType.OTHER_DOCUMENTS:
      viewDocumentUrl = OTHER_DOCUMENTS;
      break;
    case DocType.PREVIOUS_ORDERS:
      viewDocumentUrl = PREVIOUS_ORDERS_SUBMITTED;
      break;
    case DocType.OTHER_PEOPLE_WITNESS_STATEMENTS:
      viewDocumentUrl = OTHER_PEOPLE_WITNESS_STATEMENTS;
      break;
    case DocType.MIAM_CERTIFICATE:
      viewDocumentUrl = APPLICANT_MIAM_CERTIFICATE;
      break;
  }

  return viewDocumentUrl;
};
