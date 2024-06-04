import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getApplicationDetails, getApplicationListUrl } from '../utils';

const en = {
  title: 'Is there a reason why your request needs to be considered in the next five days?',
  serviceName: 'Child arrangements and family injunction',
  reasonText: 'Give a reason why the court should consider your request urgently',
  hintText: 'For example, if there is an upcoming hearing or deadline set by the court.',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_isThereReasonForUrgentRequest: {
      required: 'Select whether there is a reason why your request needs to be considered in the next five days',
    },
    awp_urgentRequestReason: {
      required: 'Enter the reason why the court should consider this application as a matter of urgency',
    },
  },
};

const cy: typeof en = {
  title: 'A oes yna reswm pam bod angen ystyried eich cais yn y pum diwrnod nesaf?',
  serviceName: 'Child arrangements and family injunction',
  reasonText: 'Rhowch reswm pam dylai’r llys ystyried eich cais ar frys.',
  hintText: 'Er enghraifft, os oes yna wrandawiad sydd ar ddod neu derfyn amser wedi’i bennu gan y llys.',
  yes: 'Oes',
  no: 'Nac oes',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_isThereReasonForUrgentRequest: {
      required:
        'Select whether there is a reason why your request needs to be considered in the next five days (welsh)',
    },
    awp_urgentRequestReason: {
      required: 'Mae’n rhaid i chi roi rheswm pam dylai’r llys ystyried y cais hwn ar frys',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    awp_isThereReasonForUrgentRequest: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            awp_urgentRequestReason: {
              type: 'textarea',
              label: l => l.reasonText,
              labelSize: null,
              hint: l => l.hintText,
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
