import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { getApplicationDetails } from '../../../../steps/application-within-proceedings/utils';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';

export const en = {
  title: 'Apply for help with fees',
  applyBefore: 'You must apply for help with fees before submitting your application.',
  nextSteps: 'Next steps',
  line1:
    'Go to <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" rel="external" target="_blank">apply for help with fees (opens in a new tab)</a>',
  line2: 'Enter',
  enterCourtNumber: 'when you are asked to enter a court or tribunal number',
  line3: 'Complete the help with fees application',
  line4: 'Return to complete your',
  applicationTo: 'application to',
  line5: 'Enter your help with fees reference number',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
};

export const cy: typeof en = {
  title: 'Apply for help with fees (welsh)',
  applyBefore: 'You must apply for help with fees before submitting your application. (welsh)',
  nextSteps: 'Next steps (welsh)',
  line1:
    'Go to <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" rel="external" target="_blank">apply for help with fees (opens in a new tab)</a> (welsh)',
  line2: 'Enter (welsh)',
  enterCourtNumber: 'when you are asked to enter a court or tribunal number (welsh)',
  line3: 'Complete the help with fees application (welsh)',
  line4: 'Return to complete your (welsh)',
  applicationTo: 'application to (welsh)',
  line5: 'Enter your help with fees reference number (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.onlyContinue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '/',
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
    applicationType: applicationDetails?.applicationType,
    caption: applicationDetails?.reasonText,
  };
};
