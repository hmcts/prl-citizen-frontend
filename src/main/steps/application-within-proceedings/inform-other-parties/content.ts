import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { APPLICATION_SIGNPOSTING_URL, getApplicationDetails } from '../utils';

export const en = {
  title: 'Inform the other parties in the case',
  reasonCantBeInformed:
    "If there is a reason the other parties in this case cannot be informed about the application, the court may need to consider it without their involvement. This is known as 'without notice'.",
  needToAsk: 'We need to ask this question as it may determine the court fees you need to pay.',
  informOtherPartieslabel: 'Can the other parties in the case be informed about this application?',
  cantBeInformedLabel: 'Give a reason why the other parties cannot be informed',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_informOtherParties: {
      required: 'Select whether the other parties in the case can be informed about this application',
    },
    awp_reasonCantBeInformed: {
      required: 'Give a reason why the other parties in the case cannot be informed of this application',
    },
  },
};

export const cy: typeof en = {
  title: 'Inform the other parties in the case (welsh)',
  reasonCantBeInformed:
    "If there is a reason the other parties in this case cannot be informed about the application, the court may need to consider it without their involvement. This is known as 'without notice'. (welsh)",
  needToAsk: 'We need to ask this question as it may determine the court fees you need to pay. (welsh)',
  informOtherPartieslabel: 'Can the other parties in the case be informed about this application? (welsh)',
  cantBeInformedLabel: 'Give a reason why the other parties cannot be informed (welsh)',
  yes: 'Yes (welsh)',
  no: 'No (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_informOtherParties: {
      required: 'Select whether the other parties in the case can be informed about this application (welsh)',
    },
    awp_reasonCantBeInformed: {
      required: 'Give a reason why the other parties in the case cannot be informed of this application (welsh)',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    awp_informOtherParties: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.informOtherPartieslabel,
      labelSize: 'm',
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            awp_reasonCantBeInformed: {
              type: 'textarea',
              label: l => l.cantBeInformedLabel,
              labelSize: null,
              validator: isFieldFilledIn,
            },
          },
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
