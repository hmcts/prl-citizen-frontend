/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { RAProvider } from '../../../../modules/reasonable-adjustments';
import { C100_URL } from '../../../../steps/urls';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Attending the court',
  headingTitle: 'Would you be able to take part in hearings by video and phone?',
  paragraph1: 'If your case goes to a hearing, it can take place either:',
  paragraph2: 'Some hearings use a combination of these methods. The approach taken will be decided by a judge.',
  line1: "in person, in a room at a venue ('face-to-face')",
  line2: 'by video (where you can join from a place suitable to you)',
  line3: 'by phone',
  select_all_apply: 'Select all that apply',
  videoHearing: 'Yes, I can take part in video hearings',
  phoneHearing: 'Yes, I can take part in phone hearings',
  noVideoAndPhoneHearing: 'No, I cannot take part in either video or phone hearings',
  noVideoAndPhoneHearingReason: 'If you choose this option please tell us why in case we can assist you',
  noVideoAndPhoneHearing_subfield: 'Explain why you are unable to take part in video or phone hearings',
  errors: {
    ra_noVideoAndPhoneHearing_subfield: {
      required: 'Explain why you are unable to take part in neither video or phone hearings',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    ra_typeOfHearing: {
      required: 'Select whether you can take part in a video or phone hearing',
    },
  },
});

export const cy = () => ({
  caption: 'Mynychu’r llys',
  headingTitle: 'A fyddech chi’n gallu cymryd rhan mewn gwrandawiadau drwy fideo a dros y ffôn?',
  paragraph1: 'Os bydd eich achos yn mynd i wrandawiad, gellir ei gynnal naill ai:',
  paragraph2:
    "Mae rhai gwrandawiadau yn defnyddio cyfuniad o'r dulliau hyn. Y Barnwr fydd yn penderfynu pa ddull fydd yn cael ei ddefnyddio.",
  line1: "yn bersonol, mewn ystafell mewn lleoliad penodol ('wyneb yn wyneb')",
  line2: "trwy fideo (lle gallwch chi ymuno o leoliad sy'n addas i chi)",
  line3: 'dros y ffôn',
  select_all_apply: "Dewiswch bob un sy'n berthnasol",
  videoHearing: 'Gallaf gymryd rhan mewn gwrandawiad fideo',
  phoneHearing: 'Gallaf gymryd rhan mewn gwrandawiad dros y ffôn',
  noVideoAndPhoneHearing: 'Ni allaf gymryd rhan mewn gwrandawiad fideo na gwrandawiad dros y ffôn',
  noVideoAndPhoneHearingReason: 'Os dewiswch yr opsiwn hwn, dywedwch wrthym pam rhag ofn y gallwn eich cynorthwyo',
  noVideoAndPhoneHearing_subfield:
    'Esboniwch pam nad ydych yn gallu cymryd rhan mewn gwrandawiad drwy fideo na gwrandawiad dros y ffôn',
  errors: {
    ra_noVideoAndPhoneHearing_subfield: {
      required: 'Esboniwch pam nad ydych yn gallu cymryd rhan mewn gwrandawiad drwy fideo na gwrandawiad dros y ffôn',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
    ra_typeOfHearing: {
      required: 'Dewiswch a allwch gymryd rhan mewn naill ai gwrandawiad drwy fideo neu wrandawiad dros y ffôn',
    },
  },
});

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: (userCase: Partial<CaseWithId>, req: AppRequest): FormFields => {
    const isC100Journey = req.originalUrl.startsWith(C100_URL);

    return {
      ra_typeOfHearing: {
        type: 'checkboxes',
        hint: l => l.select_all_apply,
        validator: atLeastOneFieldIsChecked,
        values: [
          {
            name: 'ra_typeOfHearing',
            label: l => l.videoHearing,
            value: isC100Journey ? 'videoHearing' : 'videohearings',
          },
          {
            name: 'ra_typeOfHearing',
            label: l => l.phoneHearing,
            value: isC100Journey ? 'phoneHearing' : 'phonehearings',
          },
          {
            divider: l => l.divider,
          },
          {
            name: 'ra_typeOfHearing',
            label: l => l.noVideoAndPhoneHearing,
            value: isC100Journey ? 'noVideoAndPhoneHearing' : 'nohearings',
            hint: l => l.noVideoAndPhoneHearingReason,
            exclusive: true,
            subFields: {
              ra_noVideoAndPhoneHearing_subfield: {
                type: 'textarea',
                label: l => l.noVideoAndPhoneHearing_subfield,
                labelSize: null,
                attributes: {
                  rows: 3,
                },
                validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
              },
            },
          },
        ],
      },
    };
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  return RAProvider.utils.generateContentForLocalComponent(content, languages, form);
};
