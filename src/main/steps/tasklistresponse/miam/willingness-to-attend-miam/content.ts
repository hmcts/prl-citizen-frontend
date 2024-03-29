import { PageContent } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import {
  miam_cost_exemption_content_cy,
  miam_cost_exemption_content_en,
  miam_how_to_arrange_mediation_label_cy,
  miam_how_to_arrange_mediation_label_en,
} from './miam-cost-exemptions';

const en = {
  title: 'Would you be willing to attend a MIAM?',
  one: 'Yes',
  two: 'No',
  explainWhyLabel: 'Explain why',
  miamCostExemptionsLabel: 'Help with MIAM costs and exemptions',
  miamCostExemptionsInfo: miam_cost_exemption_content_en,
  miamLabel: miam_how_to_arrange_mediation_label_en,
  onlyContinue: 'Continue',
  errors: {
    miamWillingness: {
      required: 'Select yes if you are willing to attend a MIAM',
    },
    miamNotWillingExplnation: {
      required: 'Explain why',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  title: "A fyddech chi'n fodlon mynychu MIAM?",
  one: 'Byddwn',
  two: 'Na fyddwn',
  explainWhyLabel: 'Eglurwch pam',
  miamCostExemptionsLabel: 'Help gyda chostau ac esemptiadau MIAM',
  miamCostExemptionsInfo: miam_cost_exemption_content_cy,
  miamLabel: miam_how_to_arrange_mediation_label_cy,
  onlyContinue: 'Parhau',
  errors: {
    miamWillingness: {
      required: 'Dewiswch ydw os ydych chi’n fodlon mynychu MIAM',
    },
    miamNotWillingExplnation: {
      required: 'Eglurwch pam',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miamDetails: {
      type: 'detailsHtml',
      label: l => l.miamCostExemptionsLabel,
      detailsHtml: l => l.miamCostExemptionsInfo,
    },
    miamWillingness: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: 'Yes',
          subFields: {
            miamHowToArrangeMediation: {
              type: 'textAndHtml',
              textAndHtml: l => l.miamLabel,
            },
          },
        },
        {
          label: l => l.two,
          value: 'No',
          subFields: {
            miamNotWillingExplnation: {
              type: 'textarea',
              label: l => l.explainWhyLabel,
              id: 'miam-explanation',
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent = (content: CommonContent): PageContent => ({
  ...languages[content.language],
  form,
});
