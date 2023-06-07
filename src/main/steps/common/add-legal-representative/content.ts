import { getCasePartyType } from '../../prl-cases/dashboard/utils';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { getApplicant, getApplicantName } from '../../applicant/task-list/content';
import { getRespondent, getRespondentName } from '../../respondent/task-list/content';
import { PartyType } from '../../../app/case/definition';

const en = {
  title: 'Adding a legal representative',
  partyName: '',
  continue: 'Continue',
  legalRepresentativeInformationLine1:
    'If you have hired a legal representative,  you will need to give them some information so they can access your case.',
  legalRepresentativeInformationLine2: 'Give your legal representative the following information:',
  legalRepresentativeInformationLine3: 'Your case reference number: ',
  legalRepresentativeInformationLine4: 'Your name: ',
  legalRepresentativeInformationLine5:
    'They will use this information to tell the court that they are now representing you in this claim.',
};

const cy: typeof en = {
  title: 'Adding a legal representative-welsh',
  partyName: '',
  continue: 'Continue-welsh',
  legalRepresentativeInformationLine1:
    'If you have hired a legal representative,  you will need to give them some information so they can access your case.-welsh',
  legalRepresentativeInformationLine2: 'Give your legal representative the following information:-welsh',
  legalRepresentativeInformationLine3: 'Your case reference number-welsh: ',
  legalRepresentativeInformationLine4: 'Your name-welsh: ',
  legalRepresentativeInformationLine5:
    'They will use this information to tell the court that they are now representing you in this claim.-welsh',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},

  onlyContinue: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const { userCase, user } = content.additionalData?.req.session;
  const partyType = getCasePartyType(userCase, user.id);
  partyType === PartyType.APPLICANT
    ? translations.partyName = getApplicantName(getApplicant(userCase, user.id))
    : translations.partyName = getRespondentName(getRespondent(userCase, user.id));

  return {
    ...translations,
    form,
  };
};
