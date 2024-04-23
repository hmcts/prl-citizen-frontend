import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = {
  caption: 'MIAM exemptions',
  title: 'Previous MIAM attendance or non-court dispute resolution (NCDR)',
  content: 'You need to give the court evidence of why you cannot attend a MIAM.',
  evidenceForPreviousMIAM: 'What evidence do you have that you previously attended a MIAM or NCDR?',
  fourMonthsPriorAttended:
    'In the 4 months before making the application, you attended a MIAM or participated in another form of NCDR relating to the same (or substantially the same) dispute',
  fourMonthsPriorAttendedHint:
    'If you attended a MIAM or NCDR, you’ll need to provide a signed document from the mediator',
  miamExamptionApplied:
    'The application would be made in existing proceedings which are continuing and a MIAM exemption applied to the application for those proceedings',
  miamExamptionAppliedHint: 'You will need to provide a signed document from the mediator',
  noneOfThese: 'None of these',
  errors: {
    miam_previousAttendance: {
      required: 'Select what evidence you have that you previously attended a MIAM or NCDR',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy: typeof en = {
  caption: 'Esemptiadau MIAM',
  title: 'Wedi mynychu MIAM yn barod neu ddatrys anghydfod y tu allan i’r llys (NCDR)',
  content: 'Mae angen i chi roi tystiolaeth i’r llys pam na allwch fynychu MIAM.',
  evidenceForPreviousMIAM: 'Pa dystiolaeth sydd gennych eich bod eisoes wedi mynychu MIAM?',
  fourMonthsPriorAttended:
    'Yn y 4 mis cyn gwneud y cais, bu ichi fynychu MIAM neu gymryd rhan mewn math arall o NCDR yn ymwneud â’r un anghydfod (neu’r un anghydfod i raddau helaeth)',
  fourMonthsPriorAttendedHint:
    'Os ydych wedi mynychu MIAM neu NCDR, bydd angen i chi ddarparu dogfen wedi’i llofnodi gan y cyfryngwr',
  miamExamptionApplied:
    'Byddai’r cais hwn yn cael ei wneud mewn achos presennol sydd ar y gweill a bu ichi fynychu MIAM cyn cychwyn yr achos hwnnw',
  miamExamptionAppliedHint: 'Bydd angen i chi ddarparu dogfen wedi’i llofnodi gan y cyfryngwr',
  noneOfThese: 'Dim un o’r rhain',
  errors: {
    miam_previousAttendance: {
      required: 'Dewiswch pa dystiolaeth sydd gennych eich bod eisoes wedi mynychu MIAM neu NCDR',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_previousAttendance: {
      id: 'miam_previousAttendance',
      type: 'radios',
      label: l => l.evidenceForPreviousMIAM,
      labelSize: 'm',
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'miam_previousAttendance',
          label: l => l.fourMonthsPriorAttended,
          hint: l => l.fourMonthsPriorAttendedHint,
          value: 'fourMonthsPriorAttended',
        },
        {
          name: 'miam_previousAttendance',
          label: l => l.miamExamptionApplied,
          hint: l => l.miamExamptionAppliedHint,
          value: 'miamExamptionApplied',
        },
        {
          divider: l => l.divider,
        },
        {
          name: 'miam_previousAttendance',
          label: l => l.noneOfThese,
          value: 'none',
        },
      ],
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
