import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { APPLICATION_SIGNPOSTING_URL, getApplicationDetails } from '../../utils';

export const en = {
  title: 'Do you have a help with fees reference number?',
  enterReferenceNumber:
    '<p class="govuk-heading-s govuk-!-margin-bottom-0">Enter your help with fees reference number</p>',
  referenceText:
    'You will have received this number when you applied for Help with Fees. This reference must not have been used for a previous application.',
  hint: 'For example, HWF-A1B-23C',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_have_hwfReference: {
      required: 'Select whether you have a help with fees reference number',
    },
    awp_hwf_referenceNumber: {
      required: 'Enter a valid help with fees reference number',
    },
  },
};

export const cy: typeof en = {
  title: 'Do you have a help with fees reference number? (welsh)',
  enterReferenceNumber:
    '<p class="govuk-heading-s govuk-!-margin-bottom-0">Enter your help with fees reference number (welsh)</p>',
  referenceText:
    'You will have received this number when you applied for Help with Fees. This reference must not have been used for a previous application. (welsh)',
  hint: 'For example, HWF-A1B-23C (welsh)',
  yes: 'Yes (welsh)',
  no: 'No (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_have_hwfReference: {
      required: 'Select whether you have a help with fees reference number (welsh)',
    },
    awp_hwf_referenceNumber: {
      required: 'Enter a valid help with fees reference number (welsh)',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    awp_have_hwfReference: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            awp_hwf_referenceLabel: {
              type: 'textAndHtml',
              textAndHtml: l => l.enterReferenceNumber,
            },
            awp_hwf_referenceNumber: {
              type: 'text',
              label: l => l.referenceText,
              labelSize: null,
              hint: l => l.hint,
              validator: isFieldFilledIn,
            },
          },
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
    href: APPLICATION_SIGNPOSTING_URL,
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
