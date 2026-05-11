// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { interpolate } from '../../../../common/string-parser';
import { getAddress } from '../common/utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: "Keeping {name}'s contact details private",
  headingTitle: "The court will keep {name}'s contact details private",
  paragraphOne: 'You have told us you want to keep these contact details private:',
  listOfBullets: ['{address}', '{telephoneNumber}', '{email}'],
  heading3: 'What the court will do',
  paragraphTwo:
    'The court will hold this information securely and will not share it with anyone except Cafcass or Cafcass Cymru and the local authority, if they are involved in your case, unless it is by order of the court.',
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  caption: 'Cadw manylion cyswllt {name} yn breifat',
  headingTitle: 'Bydd y llys yn cadw manylion cyswllt {name} yn breifat',
  paragraphOne: 'You have told us you want to keep these contact details private:',
  listOfBullets: ['{address}', '{telephoneNumber}', '{email}'],
  heading3: 'Beth fydd y llys yn ei wneud',
  paragraphTwo:
    "Bydd y llys yn cadw'r wybodaeth hon yn ddiogel ac ni fydd yn ei rhannu ag unrhyw un ac eithrio Cafcass neu Cafcass Cymru a'r awdurdod lleol, os ydynt yn ymwneud â'ch achos, oni bai ei fod trwy orchymyn y llys.",
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.onlyContinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const respondentID = content.additionalData?.req.params?.respondentId ?? '';
  const respondent = content.userCase?.resp_Respondents?.find(r => r.id === respondentID);

  if (!respondent) {
    return {
      ...translations,
      form,
    };
  }

  const { firstName = '', lastName = '' } = respondent || {};
  const fullName = `${firstName} ${lastName}`.trim();
  const fullAddress = '' + (respondent.isRespondentAddressConfidential === YesOrNo.YES ? getAddress(respondent) : '');
  const fullTelephoneNumber =
    '' +
    (respondent.isRespondentTelephoneNumberConfidential === YesOrNo.YES
      ? respondent.contactDetails?.telephoneNumber
      : '');
  const fullEmail =
    '' +
    (respondent.isRespondentEmailAddressConfidential === YesOrNo.YES ? respondent.contactDetails?.emailAddress : '');

  const injectName = (str: string) => interpolate(str, { name: fullName });
  const updateAddress = (str: string) => interpolate(str, { address: fullAddress });
  const updateTelephoneNumber = (str: string) => interpolate(str, { telephoneNumber: fullTelephoneNumber });
  const updateEmail = (str: string) => interpolate(str, { email: fullEmail });

  translations.listOfBullets[0] = updateAddress(translations.listOfBullets[0]);
  translations.listOfBullets[1] = updateTelephoneNumber(translations.listOfBullets[1]);
  translations.listOfBullets[2] = updateEmail(translations.listOfBullets[2]);

  return {
    ...translations,
    caption: injectName(translations.caption),
    headingTitle: injectName(translations.headingTitle),
    form,
  };
};
