import { Miam_noMediatorReasons } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = {
  caption: 'MIAM exemptions',
  title: 'Cannot access a mediator',
  lines: 'Depending on your reason why you cannot attend a MIAM, you might need to provide evidence.',
  subtitle: 'Why can you not access a mediator?',
  noAppointmentAvailable:
    'You are unable to attend a MIAM online or by video link because the  mediators contacted are unable to conduct a MIAM within 15 business days of the date of contact.',
  evidenceHint:
    'You will need to provide evidence you’ve contacted at least 5 mediators within 15 miles of where you live.',
  giveDetails: 'Give details of the mediators you’ve contacted',
  giveDetailsHint:
    'Include the names, addresses, telephone numbers or e-mail addresses for the mediators and when you contacted them.',
  disability:
    'You have a disability or other inability that prevents you from attending a MIAM in person, online or by video link, and the contacted mediators are unable to provide appropriate facilities for you to attend.',
  noMediatorIn15mile:
    'There is no mediator within 15 miles of your home and you cannot attend the MIAM online or by video link.',
  explain: 'Explain why you cannot attend a MIAM',
  inPrison:
    'You are in prison or any other institution and there are no facilities for you to attend a MIAM online or by video link.',
  bailThatPreventContact: 'You are subject to conditions of bail that prevent contact with the other person.',
  releaseFromPrisonOnLicence:
    'You have been released from prison on licence, and you have a non-contact licence condition which includes someone who is a party to the application',
  noneOfTheAbove: 'None of these',
  errors: {
    miam_noMediatorReasons: {
      required: 'Select why you cannot access a mediator',
    },
    miam_noAppointmentAvailableDetails: {
      required: 'Give details of the mediators you’ve contacted',
    },
    miam_unableToAttainDueToDisablityDetails: {
      required: 'Give details of the mediators you’ve contacted',
    },
    miam_noMediatorIn15mileDetails: {
      required: 'Give details of the mediators you’ve contacted',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = {
  caption: 'Esemptiadau MIAM',
  title: 'Ni allwch gael mynediad at gyfryngwr',
  lines: 'Gan ddibynnu ar eich rheswm pam na allwch chi fynychu MIAM, efallai y bydd angen i chi ddarparu tystiolaeth.',
  subtitle: 'Pam na allwch chi gael mynediad at gyfryngwr?',
  noAppointmentAvailable:
    'Ni allwch fynychu MIAM ar-lein neu drwy gyswllt fideo oherwydd ni all y cyfryngwyr y bu ichi gysylltu â nhw gynnal MIAM o fewn 15 diwrnod busnes i ddyddiad y cyswllt.',
  evidenceHint:
    'Bydd angen i chi ddarparu tystiolaeth eich bod wedi cysylltu ag o leiaf 5 cyfryngwr o fewn 15 milltir i ble rydych yn byw.',
  giveDetails: 'Rhowch fanylion y cyfryngwr rydych wedi cysylltu ag o/â hi',
  giveDetailsHint:
    'Dylech gynnwys enwau, cyfeiriadau, rhifau ffôn neu gyfeiriadau e-bost y cyfryngwyr a pha bryd y gwnaethoch gysylltu â nhw',
  disability:
    'Mae gennych anabledd neu analluogrwydd arall sy’n eich atal rhag mynychu MIAM yn bersonol, ar-lein neu drwy gyswllt fideo, ac ni all y cyfryngwyr y bu ichi gysylltu â nhw ddarparu cyfleusterau i chi fynychu.',
  noMediatorIn15mile:
    'Nid oes yna gyfryngwr o fewn 15 milltir i’ch cartref ac ni allwch fynychu MIAM ar-lein neu drwy gyswllt fideo.',
  explain: 'Eglurwch pam na allwch chi fynychu MIAM',
  inPrison:
    'Rydych yn y carchar neu mewn unrhyw fath arall o sefydliad ac nid oes yna gyfleusterau i chi fynychu MIAM ar-lein neu drwy gyswllt fideo.',
  bailThatPreventContact: 'Rydych yn destun amodau mechniaeth sy’n eich atal rhag cysylltu â’r unigolyn arall.',
  releaseFromPrisonOnLicence:
    'Rydych wedi cael eich rhyddhau o’r carchar ar drwydded, ac mae gennych amod dim cysylltu ar eich trwydded sy’n cynnwys rhywun sy’n barti i’r cais',
  noneOfTheAbove: 'Dim un o’r rhain',
  errors: {
    miam_noMediatorReasons: {
      required: 'Dewiswch pam na allwch chi gael mynediad at gyfryngwr',
    },
    miam_noAppointmentAvailableDetails: {
      required: 'Rhowch fanylion y cyfryngwr rydych wedi cysylltu ag o/â hi',
    },
    miam_unableToAttainDueToDisablityDetails: {
      required: 'Rhowch fanylion y cyfryngwr rydych wedi cysylltu ag o/â hi',
    },
    miam_noMediatorIn15mileDetails: {
      required: 'Rhowch fanylion y cyfryngwr rydych wedi cysylltu ag o/â hi',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_noMediatorReasons: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.noAppointmentAvailable,
          hint: l => l.evidenceHint,
          value: Miam_noMediatorReasons.noAppointmentAvailable,
          subFields: {
            miam_noAppointmentAvailableDetails: {
              type: 'textarea',
              labelSize: 's',
              label: l => l.giveDetails,
              hint: l => l.giveDetailsHint,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          label: l => l.disability,
          hint: l => l.evidenceHint,
          value: Miam_noMediatorReasons.disability,
          subFields: {
            miam_unableToAttainDueToDisablityDetails: {
              type: 'textarea',
              label: l => l.giveDetails,
              labelSize: 's',
              hint: l => l.giveDetailsHint,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          label: l => l.noMediatorIn15mile,
          value: Miam_noMediatorReasons.noMediatorIn15mile,
          subFields: {
            miam_noMediatorIn15mileDetails: {
              type: 'textarea',
              labelSize: 's',
              label: l => l.explain,
              hint: l => l.explain,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          label: l => l.inPrison,
          value: Miam_noMediatorReasons.inPrison,
        },
        {
          label: l => l.bailThatPreventContact,
          value: Miam_noMediatorReasons.bailThatPreventContact,
        },
        {
          label: l => l.releaseFromPrisonOnLicence,
          value: Miam_noMediatorReasons.releaseFromPrisonOnLicence,
        },
        {
          divider: true,
        },
        {
          label: l => l.noneOfTheAbove,
          value: Miam_noMediatorReasons.none,
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
