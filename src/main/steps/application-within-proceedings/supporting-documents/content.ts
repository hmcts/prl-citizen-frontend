import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { applyParms } from '../../../steps/common/url-parser';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS } from '../../../steps/urls';
import { getApplicationDetails } from '../utils';

export const en = {
  title: 'Do you have supporting documents to upload?',
  canShowProof:
    'If you can show you have proof the other person in the case agrees to your request or you have any other supporting documents, you can upload them here.',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_have_supportingDocuments: {
      required: 'Select whether you have supporting documents to upload',
    },
  },
};

export const cy: typeof en = {
  title: 'Do you have supporting documents to upload? (welsh)',
  canShowProof:
    'If you can show you have proof the other person in the case agrees to your request or you have any other supporting documents, you can upload them here. (welsh)',
  yes: 'Yes (welsh)',
  no: 'No (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_have_supportingDocuments: {
      required: 'Select whether you have supporting documents to upload (welsh)',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    awp_have_supportingDocuments: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.canShowProof,
      labelSize: 'govuk-body-m',
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: applyParms(APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS, { pageNumber: '1' }),
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const request = content.additionalData!.req;
  const caseData = request.session.userCase;
  const { applicationType, applicationReason } = request.params;
  const partyType = getCasePartyType(caseData, request.session.user.id);

  const applicationDetails = getApplicationDetails(
    applicationType,
    applicationReason,
    caseData.caseTypeOfApplication,
    partyType,
    content.language,
    request.session.applicationSettings
  );

  return {
    ...translations,
    form,
    caption: applicationDetails?.reasonText,
  };
};
