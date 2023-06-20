import { AWPApplicationType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getApplicationDetails } from '../utils';

export const en = {
  title: 'Download the form',
  explainRequest: 'You can explain your request by completing and uploading the form',
  nextSteps: 'Next steps',
  line1: 'Download the form',
  from: 'from',
  govUk: 'GOV.UK (opens in a new tab)',
  line2: 'Complete the application form',
  line3: 'Save the application form onto your device',
  line4: 'Return to upload your application form',
  warning: 'Warning',
  warningText: 'You need to return to upload your application form for your request to be completed.',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
};

export const cy: typeof en = {
  title: 'Download the form (welsh)',
  explainRequest: 'You can explain your request by completing and uploading the form (welsh)',
  nextSteps: 'Next steps (welsh)',
  line1: 'Download the form (welsh)',
  from: 'from (welsh)',
  govUk: 'GOV.UK (opens in a new tab) (welsh)',
  line2: 'Complete the application form (welsh)',
  line3: 'Save the application form onto your device (welsh)',
  line4: 'Return to upload your application form (welsh)',
  warning: 'Warning (welsh)',
  warningText: 'You need to return to upload your application form for your request to be completed. (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
};

const languages = {
  en,
  cy,
};

const downloadUrls = {
  [AWPApplicationType.C2]:
    'https://www.gov.uk/government/publications/form-c2-application-for-permission-to-start-proceedings-for-an-order-or-directions-in-existing-proceedings-to-be-joined-as-or-cease-to-be-a-part',
  [AWPApplicationType.FL403]:
    'https://www.gov.uk/government/publications/form-fl403-application-to-vary-extend-or-discharge-an-order-in-existing-proceedings',
  [AWPApplicationType.EX740]:
    'https://www.gov.uk/government/publications/accuser-apply-to-the-court-to-consider-whether-to-prevent-prohibit-questioning-cross-examination-in-person-form-ex740',
  [AWPApplicationType.EX741]:
    'https://www.gov.uk/government/publications/accused-apply-to-the-court-to-consider-whether-to-prevent-prohibit-questioning-cross-examination-in-person-form-ex741',
  [AWPApplicationType.N161]:
    'https://www.gov.uk/government/publications/form-n161-appellants-notice-all-appeals-except-small-claims-track-appeals-and-appeals-to-the-family-division-of-the-high-court',
  [AWPApplicationType.D89]:
    'https://www.gov.uk/government/publications/form-d89-request-personal-service-of-papers-by-a-court-bailiff',
  [AWPApplicationType.C79]:
    'https://www.gov.uk/government/publications/form-c79-application-related-to-enforcement-of-a-child-arrangement-order',
  [AWPApplicationType.FC600]:
    'https://www.gov.uk/government/publications/ask-the-court-to-consider-an-allegation-of-contempt-of-court-form-fc600',
  [AWPApplicationType.FL407]:
    'https://www.gov.uk/government/publications/form-fl407a-application-for-a-warrant-of-arrest-forced-marriage-protection-order',
  [AWPApplicationType.C1]: 'https://www.gov.uk/government/publications/form-c1-application-for-an-order',
  [AWPApplicationType.C3]:
    'https://www.gov.uk/government/publications/form-c3-application-for-an-order-authorising-search-for-taking-charge-of-and-delivery-of-a-child',
  [AWPApplicationType.C4]:
    'https://www.gov.uk/government/publications/form-c4-application-for-an-order-for-disclosure-of-a-childs-whereabouts',
  [AWPApplicationType.FP25]: 'https://www.gov.uk/government/publications/form-fp25-witness-summons',
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
    downloadUrl: downloadUrls[applicationType],
  };
};
