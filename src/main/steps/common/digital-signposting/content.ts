import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = {
  title: 'Get help with completing forms online',
  informationLine1:
    'Who you can contact depends on the type of help you need.',
  informationLine2: 'If online forms are not working or you have a technical query',
  informationLine3: 'If something is not working with the online form, or you need technical guidance, contact the Courts and Tribunals Service Centre.',
  informationLine4: 'They cannot give you legal advice.',
  courtsAndTribunalsHeader: 'Courts and Tribunals Service Centre',
  telephoneLabel: 'Telephone',
  telephoneNumber: '0300 323 0185',
  timesOpen: 'Monday to Friday, 9am to 5pm.',
  timesClosed: 'Closed on bank holidays.',
  onlineFormsHeader: 'If you need help using online forms',
  onlineFormsInformation: 'If you do not have access to the internet or do not feel confident using it, contact We Are Group. You may be eligible for a free appointment.',
  weAreGroup: 'We Are Group',
  weAreGroupEmailLabel: 'Email',
  weAreGroupEmail: 'support@wearegroup.com',
  weAreGroupTelephoneLabel: 'Telephone',
  weAreGroupTelephone: '03300 160 051',
  weAreGroupTimesOpenAndClosed: 'Monday to Friday, 9am to 5pm. Closed on bank holidays.',
  weAreGroupText: 'Text FORM to 60777 and someone will call you back',
  callChargesLink: 'Find out about call charges (opens in a new tab)'
};

const cy: typeof en = {
  title: 'Cymorth gyda chwblhau ffurflenni ar-lein',
  informationLine1:
    'Mae’r math o gymorth y gallwch ei gael yn dibynnu ar y math o gymorth sydd ei angen arnoch.',
  informationLine2: 'Os nad yw ffurflenni ar-lein yn gweithio neu os oes gennych gwestiwn technegol',
  informationLine3: 'Os nad yw rhywbeth yn gweithio gyda’r ffurflen ar-lein, neu os oes angen arweiniad technegol arnoch, cysylltwch â Chanolfan Gwasanaeth y Llysoedd a’r Tribiwnlysoedd.',
  informationLine4: 'Ni allant roi cyngor cyfreithiol i chi.',
  courtsAndTribunalsHeader: 'Canolfan Gwasanaeth y Llysoedd a’r Tribiwnlysoedd',
  telephoneLabel: 'Ffôn',
  telephoneNumber: '0300 323 0185',
  timesOpen: 'Dydd Llun i Ddydd Gwener, 9am i 5pm.',
  timesClosed: 'Ar gau ar wyliau banc.',
  onlineFormsHeader: 'Os oes angen help arnoch i ddefnyddio ffurflenni ar-lein',
  onlineFormsInformation: 'Os nad oes gennych fynediad i’r rhyngrwyd neu os nad ydych yn teimlo’n hyderus wrth ei ddefnyddio, cysylltwch â We Are Group. Efallai y byddwch yn gymwys i gael apwyntiad am ddim.',
  weAreGroup: 'We Are Group',
  weAreGroupEmailLabel: 'E-bost',
  weAreGroupEmail: 'support@wearegroup.com',
  weAreGroupTelephoneLabel: 'Ffôn',
  weAreGroupTelephone: '03300 160 051',
  weAreGroupTimesOpenAndClosed: 'Dydd Llun i Ddydd Gwener, 9am i 5pm. Ar gau ar wyliau banc.',
  weAreGroupText: 'Text FORM to 60777 and someone will call you back',
  callChargesLink: 'Find out about call charges (opens in a new tab)'
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},

  goBack: {
    text: l => l.back,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
