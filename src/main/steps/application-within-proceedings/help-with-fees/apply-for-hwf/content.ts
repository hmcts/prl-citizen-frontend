import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { getApplicationDetails } from '../../../../steps/application-within-proceedings/utils';
import { interpolate } from '../../../../steps/common/string-parser';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';

export const en = {
  title: 'Apply for help with fees',
  applyBefore: 'You must apply for help with fees before submitting your application.',
  nextSteps: 'Next steps',
  bulletPoints: [
    'Go to <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" rel="external" target="_blank">apply for help with fees (opens in a new tab)</a>',
    'Enter {applicationType} when you are asked to enter a court or tribunal number',
    'Complete the help with fees application',
    'Return to complete your {applicationType} application to {reasonText}',
    'Enter your help with fees reference number',
  ],
  onlyContinue: 'Continue',
  cancel: 'Cancel',
};

export const cy: typeof en = {
  title: 'Apply for help with fees (welsh)',
  applyBefore: 'You must apply for help with fees before submitting your application. (welsh)',
  nextSteps: 'Next steps (welsh)',
  bulletPoints: [
    'Go to <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" rel="external" target="_blank">apply for help with fees (opens in a new tab)</a> (welsh)',
    'Enter {applicationType} when you are asked to enter a court or tribunal number (welsh)',
    'Complete the help with fees application (welsh)',
    'Return to complete your {applicationType} application to {reasonText} (welsh)',
    'Enter your help with fees reference number (welsh)',
  ],
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

const generateBulletPoints = (translations, applicationDetails) => {
  const bulletPoints: string[] = [];

  translations.bulletPoints.forEach(bulletPoint => {
    bulletPoints.push(
      interpolate(bulletPoint, {
        applicationType: applicationDetails!.applicationType,
        reasonText: applicationDetails!.reasonText.toLowerCase(),
      })
    );
  });

  return bulletPoints;
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
    bulletPoints: generateBulletPoints(translations, applicationDetails),
    caption: applicationDetails?.reasonText,
  };
};
