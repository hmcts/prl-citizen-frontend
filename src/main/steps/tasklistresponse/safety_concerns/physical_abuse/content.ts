import { TranslationFn } from '../../../../app/controller/GetController';


const en = {
  section: 'Safety concerns',
  title: 'Have you ever been physically abused?',
  example: 'Physical abuse includes actions such as:',
  punch: 'punching',
  choke: 'choking',
  kick: 'kicking',
  hitting: 'hitting with an object',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    'respondentSafetyConcerns.isPhysicallyAbused': {
      required: 'Please choose one of the following options ',
    },
  },
};

const cy: typeof en = {
  section: 'Safety concerns',
  title: 'Have you ever been physically abused?',
  example: 'Physical abuse includes actions such as:',
  punch: 'punching',
  choke: 'choking',
  kick: 'kicking',
  hitting: 'hitting with an object',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    'respondentSafetyConcerns.isPhysicallyAbused': {
      required: 'Please choose one of the following options ',
    },
  },
};

const languages = {
  en,
  cy,
};


export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const physicalAbuse = content.userCase?.respondentSafetyConcerns?.isPhysicallyAbused;
  return {
    ...translations,
    physicalAbuse,
  };
};
