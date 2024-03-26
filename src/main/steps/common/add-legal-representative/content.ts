import { PartyType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { getApplicant, getApplicantName } from '../../applicant/task-list';
import { getCasePartyType } from '../../prl-cases/dashboard/utils';
import { getRespondent, getRespondentName } from '../../respondent/task-list';

console.info('** FOR SONAR **');

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
  title: 'Ychwanegu cynrychiolydd cyfreithiol',
  partyName: '',
  continue: 'Parhau',
  legalRepresentativeInformationLine1:
    'Os oes gennych gynrychiolydd cyfreithiol, bydd angen ichi roi rhywfaint o wybodaeth iddynt fel y gallant gael mynediad i’ch achos.',
  legalRepresentativeInformationLine2: 'Rhowch yr wybodaeth ganlynol i’ch cynrychiolydd cyfreithiol:',
  legalRepresentativeInformationLine3: 'Cyfeirnod eich achos: ',
  legalRepresentativeInformationLine4: 'Eich enw: ',
  legalRepresentativeInformationLine5:
    'Byddant yn defnyddio’r wybodaeth hon i ddweud wrth y llys eu bod yn eich cynrychioli yn yr hawliad hwn.',
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
  const { userCase, user } = content.additionalData?.req.session ?? {};
  const partyType = getCasePartyType(userCase, user.id);
  translations.partyName =
    partyType === PartyType.APPLICANT
      ? getApplicantName(getApplicant(userCase, user.id))
      : getRespondentName(getRespondent(userCase, user.id));

  return {
    ...translations,
    form,
  };
};
