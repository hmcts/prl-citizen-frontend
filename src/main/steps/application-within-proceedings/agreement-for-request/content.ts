import { AWPApplicationReason, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { applyParms } from '../../../steps/common/url-parser';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS } from '../../../steps/urls';
import { getApplicationDetails } from '../utils';

export const en = {
  title: 'Get agreement for your request',
  gettingAgreement:
    'If you are able to, getting agreement from the other person in the case will reduce the fee you may have to pay.',
  provideProof: 'You will need to provide proof of their agreement.',
  otherPersonAgree: 'Does the other person in the case agree with this request?',
  otherPersonAgreeDate: 'Does the other person in the case agree with the date change?',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_agreementForRequest: {
      required: 'You must select whether the other person in the case agrees with your request',
    },
  },
};

export const cy: typeof en = {
  title: 'Get agreement for your request (welsh)',
  gettingAgreement:
    'If you are able to, getting agreement from the other person in the case will reduce the fee you may have to pay. (welsh)',
  provideProof: 'You will need to provide proof of their agreement. (welsh)',
  otherPersonAgree: 'Does the other person in the case agree with this request? (welsh)',
  otherPersonAgreeDate: 'Does the other person in the case agree with the date change? (welsh)',
  yes: 'Yes (welsh)',
  no: 'No (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_agreementForRequest: {
      required: 'You must select whether the other person in the case agrees with your request (welsh)',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    awp_agreementForRequest: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.otherPersonAgree,
      labelSize: 's',
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
    otherPersonAgree:
      applicationDetails?.applicationReason === AWPApplicationReason.DELAY_CANCEL_HEARING_DATE
        ? translations.otherPersonAgreeDate
        : translations.otherPersonAgree,
  };
};
