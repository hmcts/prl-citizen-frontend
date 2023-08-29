import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { interpolate } from '../../../steps/common/string-parser';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { APPLICATION_SIGNPOSTING_URL, getApplicationDetails } from '../utils';

export const en = {
  title: 'Upload your application',
  fillForm: 'You will need to fill in the form {applicationType} and upload it when submitting this request.',
  alreadyCompleted: 'Have you already completed the {applicationType} form?',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_completedForm: {
      required: 'You must select if you have the form {applicationType} ready to upload',
    },
  },
};

export const cy: typeof en = {
  title: 'Upload your application (welsh)',
  fillForm: 'You will need to fill in the form {applicationType} and upload it when submitting this request. (welsh)',
  alreadyCompleted: 'Have you already completed the {applicationType} form? (welsh)',
  yes: 'Yes (welsh)',
  no: 'No (welsh)',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_completedForm: {
      required: 'You must select if you have the form {applicationType} ready to upload (welsh)',
    },
  },
};

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
    fillForm: interpolate(translations.fillForm, { applicationType: applicationDetails!.applicationType }),
    alreadyCompleted: interpolate(translations.alreadyCompleted, {
      applicationType: applicationDetails!.applicationType,
    }),
    caption: applicationDetails?.reasonText,
    errors: {
      ...translations.errors,
      awp_completedForm: {
        ...translations.errors.awp_completedForm,
        required: interpolate(translations.errors.awp_completedForm.required, {
          applicationType: applicationDetails!.applicationType,
        }),
      },
    },
  };
};
