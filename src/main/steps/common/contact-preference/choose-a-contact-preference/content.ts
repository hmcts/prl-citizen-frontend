/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any*/
import { CaseWithId } from '../../../../app/case/case';
import { ContactPreference } from '../../../../app/case/definition';
import { UserDetails } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { getPartyDetails } from '../../../tasklistresponse/utils';
import { interpolate } from '../../string-parser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Case number {caseNumber}',
  title: 'Contact Preferences',
  paragraphs: [
    'You can choose to receive case updates by email or post.',
    'If you receive updates by email, the updates will also be available to view in your dashboard.',
    'This includes updates on:',
  ],
  bullets: ['court orders', 'hearings', 'decisions in your case'],
  contactPreferenceLabel: 'How would you prefer to be contacted?',
  contactPreferenceHintText: 'Select one of these options.',
  labelDigital: 'Digital',
  labelDitigalHintText: 'All communication from the court will be sent by email.',
  labelPost: 'Post',
  labelPostHintText: 'All communication from the court will be sent by post.',
  continue: 'Save and continue',
  errors: {
    preferredModeOfContact: {
      required: 'Please select a contact preference',
    },
  },
});

export const cy = () => ({
  caption: 'Rhif yr achos {caseNumber}',
  title: 'Dewisiadau cyswllt',
  paragraphs: [
    'Gallwch ddewis cael diweddariadau ynghylch yr achos drwy e-bost neu drwy’r post.',
    'Os byddwch yn dewis cael diweddariadau drwy e-bost, byddwch hefyd yn gallu gweld y diweddariadau yn eich dangosfwrdd.',
    'Mae hyn yn cynnwys diweddariadau ar:',
  ],
  bullets: ['gorchmynion llys', 'gwrandawiadau', 'penderfyniadau ynghylch eich achos'],
  contactPreferenceLabel: 'Sut hoffech inni gysylltu â chi?',
  contactPreferenceHintText: 'Dewiswch un o’r opsiynau hyn.',
  labelDigital: 'Digidol',
  labelDitigalHintText: 'Fe anfonir pob cyfathrebiad gan y llys drwy e-bost.',
  labelPost: 'Drwy’r post',
  labelPostHintText: 'Fe anfonir pob cyfathrebiad gan y llys drwy’r post.',
  continue: 'Cadw a pharhau',
  errors: {
    preferredModeOfContact: {
      required: 'Dewiswch sut hoffech inni gysylltu â chi',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    partyContactPreference: {
      type: 'radios',
      classes: 'govuk-radios',
      validator: atLeastOneFieldIsChecked,
      label: l => l.contactPreferenceLabel,
      labelSize: 'm',
      hint: l => l.contactPreferenceHintText,
      values: [
        {
          label: l => l.labelDigital,
          name: 'partyContactPreference',
          value: ContactPreference.EMAIL,
          hint: l => l.labelDitigalHintText,
        },
        {
          label: l => l.labelPost,
          name: 'partyContactPreference',
          value: ContactPreference.POST,
          hint: l => l.labelPostHintText,
        },
      ],
    },
  },
  onlycontinue: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const caseData = content.userCase as CaseWithId;
  const partyDetails = getPartyDetails(caseData, content.userIdamId as UserDetails['id']);

  if (!partyDetails?.email) {
    form.fields['partyContactPreference'].values[0].disabled = true;
  } else {
    delete form.fields['partyContactPreference'].values[0].disabled;
  }

  return {
    ...translations,
    form,
    caption: interpolate(translations.caption, { caseNumber: caseData.id! }),
  };
};
