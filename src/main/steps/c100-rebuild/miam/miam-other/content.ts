import { Miam_notAttendingReasons } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = {
  caption: 'MIAM exemptions',
  title: 'Other reason for not attending a MIAM',
  lines: 'Depending on your reason why you cannot attend a MIAM, you might need to provide evidence.',
  subTitle: 'What other reason do you have for not attending a MIAM?',
  applyingForWithoutNoticeHearing: 'You’re applying for a ‘without notice’ hearing',
  applyingForWithoutNoticeHearingHint:
    'Hearings which take place without notice to the other people will only be justified where your case is exceptionally urgent or there is good reason not to tell the other people about your application (either because they could take steps to obstruct the application or because doing so may expose you or the children to a risk of harm)',
  under18: 'You or one of the respondents is under 18 years old',
  canNotAccessMediator: 'You cannot access a mediator',
  noneOfTheAbove: 'None of these',
  errors: {
    miam_notAttendingReasons: {
      required: 'Select what other reason you have for not attending a MIAM',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = {
  caption: 'Esemptiadau MIAM',
  title: 'Rheswm arall dros beidio â mynychu MIAM',
  lines: 'Gan ddibynnu ar eich rheswm pam na allwch chi fynychu MIAM, efallai y bydd angen i chi ddarparu tystiolaeth.',
  subTitle: 'Pa reswm arall sydd gennych dros beidio â mynychu MIAM?',
  applyingForWithoutNoticeHearing: 'Rydych yn gwneud cais am wrandawiad ‘heb rybudd',
  applyingForWithoutNoticeHearingHint:
    'Bydd gwrandawiadau sy’n digwydd heb rybudd i’r bobl eraill ond yn cael eu cyfiawnhau lle mae brys eithriadol ynglŷn â’ch achos, neu fod rheswm da dros beidio â dweud wrth y bobl eraill am eich cais (naill ai oherwydd y gallant gymryd camau i rwystro’r cais neu oherwydd y gallai gwneud hynny achosi niwed i chi neu’r plant).',
  under18: 'Rydych chi neu un o’r atebwyr o dan 18 oed',
  canNotAccessMediator: 'Ni allwch gael mynediad at gyfryngwr',
  noneOfTheAbove: 'Dim un o’r rhain',
  errors: {
    miam_notAttendingReasons: {
      required: 'Dewiswch pa reswm arall sydd gennych dros beidio â mynychu MIAM',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_notAttendingReasons: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.applyingForWithoutNoticeHearing,
          hint: l => l.applyingForWithoutNoticeHearingHint,
          value: Miam_notAttendingReasons.applyingForWithoutNoticeHearing,
        },
        {
          label: l => l.under18,
          value: Miam_notAttendingReasons.under18,
        },
        {
          label: l => l.canNotAccessMediator,
          value: Miam_notAttendingReasons.canNotAccessMediator,
        },
        {
          divider: l => l.divider,
        },
        {
          label: l => l.noneOfTheAbove,
          value: Miam_notAttendingReasons.none,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
