import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { getApplicationDetails, getApplicationListUrl } from '../../utils';

export const en = {
  title: 'Do you have a help with fees reference number?',
  enterReferenceNumber: 'Enter your help with fees reference number',
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
  title: 'A oes gennych chi gyfeirnod Help i Dalu Ffioedd?',
  enterReferenceNumber: 'Rhowch eich cyfeirnod Help i Dalu Ffioedd',
  referenceText:
    'Byddwch wedi cael y rhif hwn pan wnaethoch gais am Help i Dalu Ffioedd. Ni ddylai’r cyfernod hwn fod wedi’i ddefnyddio ar gyfer cais blaenorol.',
  hint: 'Er enghraifft, HWF-A1B-23C',
  yes: 'Oes',
  no: 'Nac oes',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_have_hwfReference: {
      required: 'Dewiswch p’un a oes gennych chi gyfeirnod Help i Dalu Ffioedd',
    },
    awp_hwf_referenceNumber: {
      required: 'Rhowch gyfeirnod Help i Dalu Ffioedd dilys',
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
            awp_hwf_referenceNumber: {
              type: 'text',
              label: l => l.enterReferenceNumber,
              labelSize: 's',
              hint: l =>
                `<p class="govuk-body govuk-!-margin-top-0 govuk-!-margin-bottom-1">${l.referenceText}</p><p class="govuk-hint govuk-!-margin-top-0 govuk-!-margin-bottom-0">${l.hint}</p>`,
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
    href: '#',
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
    request.session
  );

  Object.assign(form.link!, {
    href: getApplicationListUrl(partyType),
  });

  return {
    ...translations,
    form,
    caption: applicationDetails?.reasonText,
  };
};
