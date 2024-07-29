import { PartyType, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { applyParms } from '../../../../steps/common/url-parser';
import { DOWNLOAD_DOCUMENT_BY_TYPE, RESPOND_TO_APPLICATION } from '../../../../steps/urls';
export * from './routeGuard';

export const en = {
  caption: 'Respond to allegations of harm and violence',
  title: 'The allegations',
  content1: 'Before responding, review the allegations made by the applicant:',
  content2: 'Allegations of harm and violence (C1A) (Opens in new tab)',
  content3:
    'If you do not agree with the allegations made by the applicant, you can respond and give your point of view. All the people in this application will be able to see your comments.',
  content4: "If you choose not to respond to the allegations now, you'll still be able to respond in court.",
  yes: 'Yes',
  no: 'No',
  wishToRespondLabel: "Do you wish to respond to the applicant's allegations of harm?",
  errors: {
    aoh_wishToRespond: {
      required: 'Select yes if you want to respond now',
    },
  },
};

export const cy: typeof en = {
  caption: 'Ymateb i honiadau o niwed a thrais',
  title: 'Yr honiadau',
  content1: 'Cyn ymateb, adolygwch yr honiadau a wnaed gan y ceisydd:',
  content2: 'Allegations of harm and violence (C1A) (Opens in new tab) - welsh',
  content3:
    'Os nad ydych yn cytuno â’r honiadau a wnaed gan y ceisydd, gallwch ymateb a rhoi ei barn chi. Bydd pawb sy’n rhan o’r cais hwn yn gallu gweld eich sylwadau.',
  content4: 'Os byddwch yn dewis peidio ag ymateb i’r honiadau nawr, byddwch dal yn gallu ymateb yn y llys.',
  yes: 'Ydw',
  no: 'Nac ydyw',
  wishToRespondLabel: 'Ydych chi eisiau ymateb i honiadau o niwed y ceisydd?',
  errors: {
    aoh_wishToRespond: {
      required: 'Dewiswch ‘Ydw’ os ydych eisiau ymateb nawr',
    },
  },
};

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    aoh_wishToRespond: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.wishToRespondLabel,
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
    href: RESPOND_TO_APPLICATION,
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    aohDocumentUrl: applyParms(DOWNLOAD_DOCUMENT_BY_TYPE, {
      partyType: PartyType.RESPONDENT,
      documentType: 'aoh-document',
    }),
    form,
  };
};
