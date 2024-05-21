import { Response } from 'express';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { AppRequest } from '../../../app/controller/AppRequest';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { UPLOAD_STATEMENT_OF_SERVICE } from '../../../steps/urls';
import { FormError } from '../../../app/form/Form';
import { applyParms } from '../url-parser';
import { CaseWithId } from '../../../app/case/case';
import { PartyType } from '../../../app/case/definition';

import { GovUkNunjucksSummary } from '../../../steps/c100-rebuild/check-your-answers/lib/lib';

export const removeUploadDocErrors = (errors: FormError[] | undefined): FormError[] => {
  return errors?.length ? errors.filter(error => error.propertyName !== 'statementOfServiceDoc') : [];
};

export const handleError = (
  errors: FormError[] | undefined,
  errorType: string,
  omitOtherErrors?: boolean
): FormError[] => {
  let _errors: FormError[] = errors?.length ? errors : [];

  if (omitOtherErrors) {
    _errors = [...removeUploadDocErrors(_errors)];
  }

  return [..._errors, { errorType, propertyName: 'statementOfServiceDoc' }];
};

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

    req.session.errors = removeUploadDocErrors(req.session.errors);
  } catch (e) {
    req.session.errors = handleError(req.session.errors, 'deleteError', true);
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
  caseData: Partial<CaseWithId> | undefined
): GovUkNunjucksSummary[] => {
  const summaryList: GovUkNunjucksSummary[] = [];
  const servedPartiesName: string[] = [];

  caseData?.sos_partiesServed?.forEach(partyId => {
    if (partyId) {
      const respondentMeta = caseData.respondents?.find(respondent => respondent.id === partyId);
      if (respondentMeta?.value) {
        servedPartiesName?.push(`${respondentMeta.value.firstName} ${respondentMeta.value.lastName}`);
      }
    }
  });

  [
    {
      label: translations.whoWasServedLabel,
      value: servedPartiesName.join(', '),
    },
    {
      label: translations.servedDateLabel,
      value: `${caseData?.sos_partiesServedDate!.day}-${caseData?.sos_partiesServedDate!.month}-${
        caseData?.sos_partiesServedDate!.year
      }`,
    },
    {
      label: translations.filesUploadedLabel,
      value: caseData?.sos_document?.document_filename,
    },
  ].forEach(row => {
    summaryList.push({
      key: {
        text: row.label,
      },
      value: {
        text: row.value,
      },
      actions: {
        items: [
          {
            href: applyParms(UPLOAD_STATEMENT_OF_SERVICE, {
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
