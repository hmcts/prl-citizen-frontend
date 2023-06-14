import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE } from '../../../steps/urls';
import { generateCancelLink, getApplicationDetails } from '../utils';

export const en = {
  title: 'Help with fees',
  applicationCost: 'The cost of this application is ',
  checkGuidance:
    'You can check the help with fees guidance on <a href="https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a" class="govuk-link" rel="external" target="_blank">GOV.UK (opens in a new tab)</a> to find out if you are eligible for support.',
  usingHelpWithFees: 'Will you be using help with fees to pay for this application?',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_need_hwf: {
      required: 'Select whether you will be using help with fees for this application',
    },
  },
};

export const cy: typeof en = {
  title: 'Help with fees (welsh)',
  applicationCost: 'The cost of this application is (welsh)',
  checkGuidance:
    'You can check the help with fees guidance on <a href="https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a" class="govuk-link" rel="external" target="_blank">GOV.UK (opens in a new tab)</a> to find out if you are eligible for support. (welsh)',
  usingHelpWithFees: 'Will you be using help with fees to pay for this application? (welsh)',
  yes: 'Yes (welsh)',
  no: 'No (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_need_hwf: {
      required: 'Select whether you will be using help with fees for this application (welsh)',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    awp_need_hwf: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.usingHelpWithFees,
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
    form: {
      ...form,
      link: generateCancelLink(
        APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
        applicationDetails!.applicationType,
        applicationDetails!.applicationReason
      ),
    },
    applicationFee: applicationDetails?.applicationFee,
    caption: applicationDetails?.reasonText,
  };
};
