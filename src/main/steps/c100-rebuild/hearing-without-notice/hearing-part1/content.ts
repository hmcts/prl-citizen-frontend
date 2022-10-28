import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Are you asking for a without notice hearing?',
  line1:
    'Hearings which take place without notice to the other people will only be justified where your case is exceptionally urgent, or there is good reason not to tell the other people about your application (either because they could take steps to obstruct the application or because doing so may expose you or the children to a risk of harm).',
  warningText: {
    text: 'If you ask for a without notice hearing, the court may require you to attend on the same day as you submit your application. They will contact you to tell you when you need to go to the court.',
    iconFallbackText: 'Warning',
  },
  one: 'Yes',
  two: 'No',
  errors: {
    hwn_hearingPart1: {
      required: "Select yes if you're asking for a without notice",
    },
  },
});

const cy = () => ({
  title: "Ydych chi'n gofyn am wrandawiad heb rybudd?",
  line1:
    "Bydd gwrandawiadau sy'n digwydd heb rybudd i'r bobl eraill ond yn cael eu cyfiawnhau lle mae brys eithriadol ynglŷn â'ch achos, neu fod rheswm da dros beidio â dweud wrth y bobl eraill am eich cais (naill ai oherwydd y gallent gymryd camau i rwystro'r cais neu oherwydd y gallai gwneud hynny beri niwed i chi neu’r plant).",
  warningText: {
    text: "Os gofynnwch am wrandawiad heb rybudd, efallai y bydd y llys yn gofyn i chi fynychu ar yr un diwrnod ag y byddwch yn cyflwyno eich cais. Byddant yn cysylltu â chi i ddweud pryd y bydd angen i chi fynd i'r llys.",
    iconFallbackText: 'Warning',
  },
  one: 'Ydw',
  two: 'Nac ydw',
  errors: {
    hwn_hearingPart1: {
      required: "Select yes if you're asking for a without notice - welsh",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    hwn_hearingPart1: {
      type: 'radios',
      classes: 'govuk-radios',
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
