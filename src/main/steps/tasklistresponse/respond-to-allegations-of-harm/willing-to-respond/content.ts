import { YesOrNo } from 'app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

export const en = {
  section: 'Respond to allegations of harm and violence',
  title: 'The allegations',
  reviewBeforeResponding: 'Before responding, review the allegations made by the applicant:',
  linkToAoH: '<a href="#" class="govuk-link" target="_blank">Allegations of harm and violence (C1A) (Opens in new tab)</a>',
  disclaimer:
    'If you do not agree with the allegations made by the applicant, you can respond and give your point of view. All the people in this application will be able to see your comments.',
  disclaimer_2: "If you choose not to respond to the allegations now, you'll still be able to respond in court.",
  wishToRespondLabel: "Do you wish to respond to the applicant's allegations of harm?",
  one: 'Yes',
  two: 'No',
  onlyContinue: 'Continue',
  errors: {
    detailsKnown: {
      required: 'Select yes if you want to respond now',
    },
  },
};

export const cy: typeof en = {
  section: 'Ymateb i honiadau o niwed a thrais',
  title: 'Yr honiadau',
  reviewBeforeResponding: 'Cyn ymateb, adolygwch yr honiadau a wnaed gan y ceisydd:',
  linkToAoH: '<a href="#" class="govuk-link" target="_blank">Allegations of harm and violence (C1A) (Opens in new tab) - welsh</a>',
  disclaimer:
    'Os nad ydych yn cytuno â’r honiadau a wnaed gan y ceisydd, gallwch ymateb a rhoi ei barn chi. Bydd pawb sy’n rhan o’r cais hwn yn gallu gweld eich sylwadau.',
  disclaimer_2: 'Os byddwch yn dewis peidio ag ymateb i’r honiadau nawr, byddwch dal yn gallu ymateb yn y llys.',
  wishToRespondLabel: 'Ydych chi eisiau ymateb i honiadau o niwed y ceisydd?',
  one: 'Ydw',
  two: 'Nac ydyw',
  onlyContinue: 'Continue - welsh',
  errors: {
    detailsKnown: {
      required: 'Dewiswch ‘Ydw’ os ydych eisiau ymateb nawr',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    wishToRespond: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.wishToRespondLabel,
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
