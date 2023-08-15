import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { AWP_APPLICATION_LIST_FIRST_PAGE, getApplicationDetails } from '../utils';

export const en = {
  title: 'Do you have supporting documents to upload?',
  canShowProof:
    'If you can show you have proof the other person in the case agrees to your request or you have any other supporting documents, you can upload them here.',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_hasSupportingDocuments: {
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
    awp_hasSupportingDocuments: {
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
    awp_hasSupportingDocuments: {
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
    href: AWP_APPLICATION_LIST_FIRST_PAGE,
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
