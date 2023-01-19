import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { typeofcaseuser } from '../../../../common/typeofcaseuser';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  section: 'Safety concerns',
  title: 'Contact between the children and the other people in this application',
  pagetitle: '',
  subtitle:
    "The court will presume it is good for the children's welfare to have both of their parents involved in their lives, unless there is evidence showing that this would cause harm to the children.",
  selectSupervisionAgreementLabel:
    'Do you agree to the children spending time with the other people in this application?',
  one: 'Yes',
  two: 'Yes, but I prefer that it is supervised',
  three: 'No, I would prefer the other people do not spend time with the children',
  supervisionAgreementOtherWaysLabel:
    'Do you agree to the other people in this application being in touch with the children in other ways?',
  supervisionAgreementOtherWaysHint: 'For example, by phone, text or email',
  yes: 'Yes',
  no: 'No',
  errors: {
    PRL_c1A_supervisionAgreementDetails: {
      required: 'Select whether you agree to the children spending time with the other people in this application',
    },
    PRL_c1A_agreementOtherWaysDetails: {
      required:
        'Select yes if you agree to the other people in this application being in touch with the children in other ways',
    },
  },
});
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  section: 'Safety concerns - welsh',
  title: 'Contact between the children and the other people in this application - welsh',
  pagetitle: '',
  subtitle:
    "The court will presume it is good for the children's welfare to have both of their parents involved in their lives, unless there is evidence showing that this would cause harm to the children. - welsh",
  selectSupervisionAgreementLabel:
    'Do you agree to the children spending time with the other people in this application? - welsh',
  one: 'Yes - welsh',
  two: 'Yes, but I prefer that it is supervised - welsh',
  three: 'No, I would prefer the other people do not spend time with the children - welsh',
  supervisionAgreementOtherWaysLabel:
    'Do you agree to the other people in this application being in touch with the children in other ways? - welsh',
  supervisionAgreementOtherWaysHint: 'For example, by phone, text or email - welsh',
  yes: 'Yes - welsh',
  no: 'No - welsh',
  errors: {
    PRL_c1A_supervisionAgreementDetails:
      'Select whether you agree to the children spending time with the other people in this application - welsh',
    PRL_c1A_agreementOtherWaysDetails:
      'Select yes if you agree to the other people in this application being in touch with the children in other ways - welsh',
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    PRL_c1A_supervisionAgreementDetails: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.selectSupervisionAgreementLabel,
      labelSize: 'm',
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
        },
        {
          label: l => l.two,
          value: 'Yes, but I prefer that it is supervised',
        },
        {
          label: l => l.three,
          value: 'No, I would prefer the other people do not spend time with the children',
        },
      ],
      validator: isFieldFilledIn,
    },
    PRL_c1A_agreementOtherWaysDetails: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.supervisionAgreementOtherWaysLabel,
      labelSize: 'm',
      hint: l => l.supervisionAgreementOtherWaysHint,
      section: l => l.section,
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
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, false);
  return {
    ...translations,
    form,
  };
};
