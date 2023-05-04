import { PageContent } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import {
  miam_cost_exemption_content_cy,
  miam_cost_exemption_content_en,
  miam_how_to_arrange_mediation_label_cy,
  miam_how_to_arrange_mediation_label_en,
  miam_how_to_arrange_mediation_link,
} from './miam-cost-exemptions';

const en = {
  title: 'Would you be willing to attend a MIAM?',
  one: 'Yes',
  two: 'No',
  explainWhyLabel: 'Explain why',
  miamCostExemptionsLabel: 'Help with MIAM costs and exemptions',
  miamCostExemptionsInfo: miam_cost_exemption_content_en,
  miamLabel: miam_how_to_arrange_mediation_label_en,
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
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
  title: 'Would you be willing to attend a MIAM?',
  one: 'Yes',
  two: 'No',
  explainWhyLabel: 'Explain why',
  miamCostExemptionsLabel: 'Help with MIAM costs and exemptions',
  miamCostExemptionsInfo: miam_cost_exemption_content_cy,
  miamLabel: miam_how_to_arrange_mediation_label_cy,
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  onlyContinue: 'Continue',
  errors: {
    miamWillingness: {
      required: 'Select yes if you are willing to attend a MIAM',
    },
    miamNotWillingExplnation: {
      required: 'Explain why',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
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
              type: 'link',
              link: miam_how_to_arrange_mediation_link,
              label: l => l.miamLabel,
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
