import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { interpolate } from '../../../steps/common/string-parser';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { APPLICATION_SIGNPOSTING_URL, getApplicationDetails } from '../utils';

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
  title: 'Lawrlwytho ffurflen',
  explainRequest: 'Gallwch egluro eich cais drwy lenwi ac uwchlwytho ffurflen',
  nextSteps: 'Y camau nesaf',
  listItems: [
    'Lawrlwythwch ffurflen  {applicationType} o <a href="{downloadUrl}" target="_blank" class="govuk-link">GOV.UK (yn agor mewn tab newydd)</a>',
    'Llenwch y ffurflen gais',
    'Cadwch y ffurflen gais ar eich dyfais',
    'Dychwelwch i uwchlwytho’ch ffurflen gais',
  ],
  warning: 'Rhybudd',
  warningText: 'Bydd angen i chi ddychwelyd i uwchlwytho’ch ffurflen gais er mwyn i’ch cais fod yn gyflawn.',
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
    request.session
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
