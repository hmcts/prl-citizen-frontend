import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { interpolate } from '../../../steps/common/string-parser';
import { applyParms } from '../../../steps/common/url-parser';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS } from '../../../steps/urls';
import { getApplicationDetails } from '../utils';

export const en = {
  title: 'Download the form',
  explainRequest: 'You can explain your request by completing and uploading the form',
  nextSteps: 'Next steps',
  listItems: [
    'Download the form {applicationType} from <a href="{downloadUrl}" target="_blank" class="govuk-link">GOV.UK (opens in a new tab)</a>',
    'Complete the application form',
    'Save the application form onto your device',
    'Return to upload your application form',
  ],
  warning: 'Warning',
  warningText: 'You need to return to upload your application form for your request to be completed.',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
};

export const cy: typeof en = {
  title: 'Download the form (welsh)',
  explainRequest: 'You can explain your request by completing and uploading the form (welsh)',
  nextSteps: 'Next steps (welsh)',
  listItems: [
    'Download the form {applicationType} from <a href="{downloadUrl}" target="_blank" class="govuk-link">GOV.UK (opens in a new tab)</a> (welsh)',
    'Complete the application form (welsh)',
    'Save the application form onto your device (welsh)',
    'Return to upload your application form (welsh)',
  ],
  warning: 'Warning (welsh)',
  warningText: 'You need to return to upload your application form for your request to be completed. (welsh)',
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
    applicationType: applicationDetails?.applicationType,
    caption: applicationDetails?.reasonText,
    listItems: translations.listItems.map(listItem =>
      interpolate(listItem, {
        applicationType: applicationDetails!.applicationType,
        downloadUrl: applicationDetails!.applicationFormUrl,
      })
    ),
  };
};
