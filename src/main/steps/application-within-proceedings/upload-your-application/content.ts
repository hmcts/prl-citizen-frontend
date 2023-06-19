import { AWPApplicationType, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getApplicationDetails } from '../utils';

export const en = (applicationType?: AWPApplicationType): object => ({
  title: 'Upload your application',
  fillForm: 'You will need to fill in the form',
  uploadIt: 'and upload it when submitting this request.',
  alreadyCompleted: 'Have you already completed the ' + applicationType + ' form?',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_completedForm: {
      required: 'You must select if you have the form ' + applicationType + ' ready to upload',
    },
  },
});

export const cy: typeof en = (applicationType?: AWPApplicationType) => ({
  title: 'Upload your application (welsh)',
  fillForm: 'You will need to fill in the form (welsh)',
  uploadIt: 'and upload it when submitting this request. (welsh)',
  alreadyCompleted: 'Have you already completed the ' + applicationType + ' form? (welsh)',
  yes: 'Yes (welsh)',
  no: 'No (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_completedForm: {
      required: 'You must select if you have the form ' + applicationType + ' ready to upload (welsh)',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    awp_completedForm: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.alreadyCompleted,
      labelSize: 'm',
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
    href: '/',
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
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

  const translations = languages[content.language](applicationDetails?.applicationType);

  return {
    ...translations,
    form,
    applicationType: applicationDetails?.applicationType,
    caption: applicationDetails?.reasonText,
  };
};
