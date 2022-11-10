import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = () => ({
  section: 'Safety concerns',
  title: 'Contact between the children and the other people in this application',
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
    c1A_supervisionAgreementDetails: {
      required: 'Select whether you agree to the children spending time with the other people in this application',
    },
    c1A_agreementOtherWaysDetails: {
      required:
        'Select yes if you agree to the other people in this application being in touch with the children in other ways',
    },
  },
});
const cy = () => ({
  section: 'Pryderon diogelwch',
  title: "Cyswllt rhwng y plant a'r bobl eraill yn y cais hwn",
  subtitle:
    "Bydd y llys yn tybio ei bod yn dda i les y plant gael y ddau riant yn rhan o'u bywydau, oni bai bod tystiolaeth sy'n dangos y byddai hyn yn achosi niwed i'r plant.",
  selectSupervisionAgreementLabel: "Ydych chi'n cytuno i'r plant dreulio amser gyda'r bobl eraill yn y cais hwn?",
  one: 'Ydw',
  two: 'Ydw, ond byddai’n well gennyf i’r cyswllt gael ei oruchwylio',
  three: "Nac ydw, byddai'n well gennyf pe na bai’r bobl eraill yn treulio amser gyda'r plant",
  supervisionAgreementOtherWaysLabel:
    "Ydych chi'n cytuno i'r bobl eraill yn y cais hwn fod mewn cysylltiad â'r plant mewn ffyrdd eraill?",
  supervisionAgreementOtherWaysHint: 'Er enghraifft, dros y ffôn, drwy anfon negeseuon testun neu drwy e-bost',
  yes: 'Ydw',
  no: 'Nac ydw',
  errors: {
    c1A_supervisionAgreementDetails:
      'Select whether you agree to the children spending time with the other people in this application - welsh',
    c1A_agreementOtherWaysDetails:
      'Select yes if you agree to the other people in this application being in touch with the children in other ways - welsh',
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_supervisionAgreementDetails: {
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
    c1A_agreementOtherWaysDetails: {
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
