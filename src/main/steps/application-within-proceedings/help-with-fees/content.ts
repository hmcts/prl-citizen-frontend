import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getApplicationDetails, getApplicationListUrl } from '../utils';
export * from './routeGuard';

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
  title: 'Help i Dalu Ffioedd',
  applicationCost: 'Cost y cais hwn yw ',
  checkGuidance:
    ' Gallwch wirio’r cyfarwyddyd ar help i dalu ffioedd ar <a href="https://www.gov.uk/government/publications/apply-for-help-with-court-and-tribunal-fees/how-to-apply-for-help-with-fees-ex160a" class="govuk-link" rel="external" target="_blank">GOV.UK (yn agor mewn tab newydd)</a> i ganfod a ydych yn gymwys i gael cymorth.',
  usingHelpWithFees: 'A fyddwch chi’n defnyddio Help i Dalu Ffioedd i dalu am y cais hwn?',
  yes: 'Byddaf',
  no: 'Na fyddaf',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_need_hwf: {
      required: 'Dewiswch p’un a fyddwch yn defnyddio Help i Dalu Ffioedd ar gyfer y cais hwn.',
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
    applicationFee: applicationDetails?.applicationFee,
    caption: applicationDetails?.reasonText,
  };
};
