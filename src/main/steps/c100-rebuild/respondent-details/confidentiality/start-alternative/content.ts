/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { C100RebuildPartyDetails, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../../app/form/validation';
import { interpolate } from '../../../../common/string-parser';
import { getPartyDetails } from '../../../people/util';

export const en = {
  caption: "Keeping {firstName} {lastName}'s contact details private",
  headingTitle: 'Keeping contact details private',
  paragraphOne:
    "The information you give us will be shared with the other people named in this application. This includes {firstName} {lastName}'s contact details, unless you ask the court to keep them private.",
  paragraphTwo:
    'You can request this if, for example, you believe sharing these details may lead to unwanted contact or a risk of harm to {firstName} {lastName} or the children.',
  keepContactDetailsPrivate:
    "Do you want to request to keep {firstName} {lastName}'s contact details private from the other people named in the application?",
  yes: 'Yes',
  no: 'No',
  whichDetailsPrivate: 'Select which contact details you want to keep private',
  address: 'Address',
  telephoneNumber: 'Telephone number',
  email: 'Email',
  errors: {
    startAlternative: {
      required: "Select yes if you want to keep {firstName} {lastName}'s details private, or no if not.",
    },
    contactDetailsPrivateAlternative: {
      required: 'Select which contact details you want to keep private.',
    },
  },
};

//TODO remember to put welsh translations here
export const cy = {
  caption: 'Cadw manylion cyswllt {firstName} {lastName} yn breifat',
  headingTitle: 'Cadw manylion cyswllt yn breifat',
  paragraphOne:
    "Bydd yr wybodaeth a roddwch i ni yn cael ei rhannu gyda'r bobl eraill a enwir yn y cais hwn. Mae hyn yn cynnwys manylion cyswllt {firstName} {lastName}, oni bai eich bod yn gofyn i'r llys eu cadw'n breifat.",
  paragraphTwo:
    "Gallwch ofyn am hyn os, er enghraifft, rydych chi'n credu y gallai rhannu'r manylion hyn arwain at gyswllt diangen neu risg o niwed i {firstName} {lastName} neu'r plant.",
  keepContactDetailsPrivate:
    'Ydych chi eisiau gofyn am gadw manylion cyswllt {firstName} {lastName} yn breifat gan y bobl eraill a enwir yn y cais?',
  yes: 'Ydw',
  no: 'Nac ydw',
  whichDetailsPrivate: "Dewiswch pa fanylion cyswllt yr hoffech eu cadw'n breifat",
  address: 'Cyfeiriad',
  telephoneNumber: 'Rhif Ffôn',
  email: 'E-bost',
  errors: {
    startAlternative: {
      required:
        'Dewiswch ydw os ydych eisiau gofyn am gadw manylion {firstName} {lastName} yn breifat, neu nac ydw os nad ydych eisiau gofyn am hyn.',
    },
    contactDetailsPrivateAlternative: {
      required: "Dewiswch pa fanylion cyswllt yr hoffech eu cadw'n breifat.",
    },
  },
};

const languages = {
  en,
  cy,
};

const fields = {
  startAlternative: {
    type: 'radios',
    classes: 'govuk-radios',
    label: l => l.keepContactDetailsPrivate,
    labelSize: 's',
    values: [
      {
        label: l => l.yes,
        value: YesOrNo.YES,
        subFields: {
          contactDetailsPrivateAlternative: {
            type: 'checkboxes',
            label: l => l.keepContactDetailsPrivate,
            labelHidden: true,
            hint: l => l.whichDetailsPrivate,
            validator: value => atLeastOneFieldIsChecked(value),
            values: [
              { name: 'contactDetailsPrivateAlternative', label: l => l.address, value: 'address' },
              { name: 'contactDetailsPrivateAlternative', label: l => l.telephoneNumber, value: 'telephone' },
              { name: 'contactDetailsPrivateAlternative', label: l => l.email, value: 'email' },
            ],
          },
        },
      },
      {
        label: l => l.no,
        value: YesOrNo.NO,
      },
    ],
    validator: value => isFieldFilledIn(value),
  },
};

export const form: FormContent = {
  fields,
  onlyContinue: {
    text: l => l.onlyContinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const { errors: originalErrors } = translations;
  const respondentId = content.additionalData?.req.params.respondentId ?? '';
  const respondentDetails = getPartyDetails(
    respondentId,
    content.userCase?.resp_Respondents
  ) as C100RebuildPartyDetails;
  const { firstName = '', lastName = '' } = respondentDetails || {};
  const nameData = { firstName, lastName };
  const injectName = (str: string) => interpolate(str, nameData);

  return {
    ...translations,
    form,
    caption: injectName(translations.caption),
    paragraphOne: injectName(translations.paragraphOne),
    paragraphTwo: injectName(translations.paragraphTwo),
    keepContactDetailsPrivate: injectName(translations.keepContactDetailsPrivate),
    errors: {
      startAlternative: {
        required: injectName(originalErrors.startAlternative.required),
      },
      contactDetailsPrivateAlternative: {
        required: originalErrors.contactDetailsPrivateAlternative.required,
      },
    },
  };
};
