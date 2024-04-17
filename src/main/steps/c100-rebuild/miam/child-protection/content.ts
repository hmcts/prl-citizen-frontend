import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  section: 'MIAM exemptions',
  title: 'Child protection concerns',
  needMoreDetails1: 'You need to give the court more information about your concerns.',
  subTitle: 'Which child protection concern applies?',
  localAuthority:
    'The children in the application (or another child in the household) are the subject of a child protection plan put in place by the local authority',
  childProtectionPlan:
    'The children in the application (or another child in the household) is the subject of enquiries by a local authority under section 47 of the Children Act 1989 Act',
  childProtectionPlanHint:
    'This may mean that a local authority is carrying out enquiries because of concerns the children are suffering or might suffer significant harm.',
  none: 'None of these',
  errors: {
    miam_childProtectionEvidence: {
      required: 'Select what evidence you have of child protection concerns.',
    },
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  section: 'Esemptiadau MIAM',
  title: 'Pryderon amddiffyn plant',
  needMoreDetails1: 'Mae angen i chi roi mwy o wybodaeth am eich pryderon i’r llys.',
  subTitle: '<h1 class="govuk-heading-m govuk-!-margin-bottom-7">Pa bryder amddiffyn plant sy’n berthnasol?</h1>',
  localAuthority:
    'Mae’r plant yn y cais (neu blentyn arall ar yr aelwyd) yn destun cynllun amddiffyn plant a roddwyd ar waith gan yr awdurdod lleol',
  childProtectionPlan:
    'Mae’r plant yn y cais (neu blentyn arall ar yr aelwyd) yn destun ymholiadau gan awdurdod lleol o dan adran 47 Deddf Plant 1989',
  childProtectionPlanHint:
    'Fe allai hynny olygu bod awdurdod lleol yn cynnal ymholiadau oherwydd pryderon fod y plant yn dioddef neu y gallant ddioddef niwed sylweddol.',
  none: 'Dim un o’r rhain',
  errors: {
    miam_childProtectionEvidence: {
      required: 'Dewiswch pa dystiolaeth sydd gennych o bryderon amddiffyn plant.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_childProtectionEvidence: {
        type: 'radios',
        classes: 'govuk-radios',
        values: [
          {
            label: l => l.localAuthority,
            value: "localAuthority",
          },
          {
            label: l => l.childProtectionPlan,
            hint: l => l.childProtectionPlanHint,
            value: "childProtectionPlan",
          },
          {
            divider: true,
          },
          {
            label: l => l.none,
            value: "none",
          },

        ],
        validator: isFieldFilledIn,
      
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};
export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
