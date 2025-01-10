/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import { Response } from 'express';
import _ from 'lodash';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseWithId } from '../../../app/case/case';
import { PartyType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GovUkNunjucksSummary } from '../../../steps/c100-rebuild/check-your-answers/lib/lib';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { STATEMENT_OF_SERVICE_WHO_WAS_SERVED, UPLOAD_STATEMENT_OF_SERVICE } from '../../../steps/urls';
import { applyParms } from '../url-parser';
import { handleError, removeErrors } from '../utils';

export const deleteDocument = async (req: AppRequest, res: Response): Promise<void> => {
  const { params, session } = req;
  const { user: userDetails, userCase: caseData } = session;
  const partyType = getCasePartyType(caseData, userDetails.id);
  const client = new CosApiClient(userDetails.accessToken, req.locals.logger);

  try {
    await client.deleteDocument(params.removeFileId);

    if (req.session.userCase.hasOwnProperty('sos_document')) {
      delete req.session.userCase.sos_document;
    }

    req.session.errors = removeErrors(req.session.errors);
  } catch (e) {
    req.session.errors = handleError(req.session.errors, 'deleteError', 'statementOfServiceDoc', true);
  } finally {
    req.session.save(() => {
      res.redirect(
        applyParms(UPLOAD_STATEMENT_OF_SERVICE, {
          partyType,
          context: params.context,
        })
      );
    });
  }
};

export const prepareSummaryList = (
  translations: Record<string, any>,
  context: string,
  caseData: Partial<CaseWithId>
): GovUkNunjucksSummary[] => {
  const summaryList: GovUkNunjucksSummary[] = [];
  const servedPartiesName: string[] = [];
  const summary: Record<string, string>[] = [];

  if (
    _.isArray(caseData?.respondents) &&
    caseData.respondents.length > 1 &&
    _.isArray(caseData?.sos_respondentsServed)
  ) {
    caseData.sos_respondentsServed.forEach(partyId => {
      if (partyId) {
        const respondentMeta = caseData.respondents?.find(respondent => respondent.id === partyId);
        if (respondentMeta?.value) {
          servedPartiesName?.push(`${respondentMeta.value.firstName} ${respondentMeta.value.lastName}`);
        }
      }
    });
    summary.push({
      label: translations.whoWasServedLabel,
      value: servedPartiesName.join('<br/>'),
      href: STATEMENT_OF_SERVICE_WHO_WAS_SERVED,
    });
  }

  if (caseData?.sos_respondentsServedDate?.day) {
    const partiesServedDate = `${caseData.sos_respondentsServedDate.month}-${caseData.sos_respondentsServedDate.day}-${caseData.sos_respondentsServedDate.year}`;
    summary.push({
      label: translations.servedDateLabel,
      value: dayjs(partiesServedDate).format('DD MMM YYYY'),
      href: STATEMENT_OF_SERVICE_WHO_WAS_SERVED,
    });
  }

  if (caseData?.sos_document?.document_filename) {
    summary.push({
      label: translations.filesUploadedLabel,
      value: caseData.sos_document.document_filename,
      href: UPLOAD_STATEMENT_OF_SERVICE,
    });
  }

  summary.forEach(row => {
    summaryList.push({
      key: {
        text: row.label,
      },
      value: {
        html: row.value,
      },
      actions: {
        items: [
          {
            href: applyParms(row.href, {
              partyType: PartyType.APPLICANT,
              context,
            }),
            text: translations.change,
            visuallyHiddenText: translations.change,
          },
        ],
      },
    });
  });

  return summaryList;
};
