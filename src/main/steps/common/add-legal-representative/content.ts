import { YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { getApplicantName } from '../../applicant/task-list/content';
import { getRespondentName } from '../../respondent/task-list/content';

const en = {
  section: 'Adding a legal representative',
  partyName: '',
  caseRefernce: '',
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
  section: 'Adding a legal representative-welsh',
  partyName: '',
  caseRefernce: '',
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
  const req: AppRequest = content.additionalData?.req;
  let partyName;
  if (YesOrNo.YES === req.query.isApplicant) {
    partyName = getApplicantName(req.session.userCase, req.session.user.id);
  } else {
    partyName = getRespondentName(req.session.userCase, req.session.user.id);
  }
  translations.legalRepresentativeInformationLine3 =
    translations.legalRepresentativeInformationLine3 + req.session.userCase.id;
  translations.legalRepresentativeInformationLine4 = translations.legalRepresentativeInformationLine4 + partyName;
  return {
    ...translations,
    form,
  };
};
