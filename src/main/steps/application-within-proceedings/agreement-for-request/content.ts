import { AWPApplicationReason, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getApplicationDetails, getApplicationListUrl } from '../utils';

export const en = {
  title: 'Get agreement for your request',
  gettingAgreement:
    'If you are able to, getting agreement from the other person in the case will reduce the fee you may have to pay.',
  provideProof: 'You will need to provide proof of their agreement.',
  otherPersonAgree: 'Does the other person in the case agree with this request?',
  otherPersonAgreeDate: 'Does the other person in the case agree with the date change?',
  yes: 'Yes',
  no: 'No',
  onlyContinue: 'Continue',
  cancel: 'Cancel',
  errors: {
    awp_agreementForRequest: {
      required: 'Select whether the other person in the case agrees with your request',
    },
  },
};

export const cy: typeof en = {
  title: 'Cael cytundeb ar gyfer eich cais',
  gettingAgreement:
    'Os gallwch gael yr unigolyn arall yn yr achos i gytuno â’ch cais, bydd y ffi y bydd rhaid i chi efallai ei thalu yn llai.',
  provideProof: 'Bydd angen i chi ddarparu prawf eu bod yn cytuno â’ch cais.',
  otherPersonAgree: 'A yw’r unigolyn arall yn yr achos yn cytuno â’r cais hwn?',
  otherPersonAgreeDate: 'A yw’r unigolyn arall yn yr achos yn cytuno i newid y dyddiad?',
  yes: 'Ydy',
  no: 'Nac ydy',
  onlyContinue: 'Parhau',
  cancel: 'Canslo',
  errors: {
    awp_agreementForRequest: {
      required: 'Dewiswch p’un a yw’r unigolyn arall yn yr achos yn cytuno â’ch cais',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    awp_agreementForRequest: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.otherPersonAgree,
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
    href: getApplicationListUrl(content.additionalData?.req?.params?.partyType),
  });

  return {
    ...translations,
    form,
    caption: applicationDetails?.reasonText,
    otherPersonAgree:
      applicationDetails?.applicationReason === AWPApplicationReason.DELAY_CANCEL_HEARING_DATE
        ? translations.otherPersonAgreeDate
        : translations.otherPersonAgree,
  };
};
