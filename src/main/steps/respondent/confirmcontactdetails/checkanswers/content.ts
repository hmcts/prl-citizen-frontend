import { FieldPrefix } from '../../../../app/case/case';
import { ApplyingWith, YesNoNotsure } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../../steps/common/common.content';

import {
  applicantSummaryList,
} from './utils';

export const enContent = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  change: 'Change',
  reason: 'Reason',
  applyingWith: {
    [ApplyingWith.ALONE]: "I'm applying on my own",
    [ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER]: "I'm applying with my spouse or civil partner",
    [ApplyingWith.WITH_SOME_ONE_ELSE]: "I'm applying with someone who is not my spouse or civil partner",
  },
  yesNoNotsure: {
    [YesNoNotsure.YES]: 'Yes',
    [YesNoNotsure.NO]: 'No',
    [YesNoNotsure.NOT_SURE]: 'Not sure',
  },
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    noOfApplicants: 'Number of applicants',
    dateChildMovedIn: 'Date child moved in',
    name: 'Name',
    phoneNumber: 'Phone number',
    emailAddress: 'Email address',
  },
  errors: {
    dateChildMovedIn: {
      lessThanTenWeeks: 'You can only submit 10 weeks after the date the child started living continuously with you',
    },
  },
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...enContent,
    language: content.language,
    sections: [
      applicantSummaryList(enContent, userCase, FieldPrefix.APPLICANT1),
    ],
  };
};

const cyContent: typeof enContent = {
  section: 'Check your details (Welsh)',
  title: 'Read the information to make sure it is correct, and add any missing details (Welsh)',
  change: 'Newid',
  reason: 'Rheswm',
  applyingWith: {
    [ApplyingWith.ALONE]: 'Rwy’n gwneud cais ar fy mhen fy hun',
    [ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER]: 'Rwy’n gwneud cais gyda fy mhriod neu fy mhartner sifil',
    [ApplyingWith.WITH_SOME_ONE_ELSE]: 'Rwy’n gwneud cais gyda rhywun nad ydynt yn briod neu’n bartner sifil i mi',
  },
  yesNoNotsure: {
    [YesNoNotsure.YES]: 'Ydy',
    [YesNoNotsure.NO]: 'Nac ydy',
    [YesNoNotsure.NOT_SURE]: 'Ddim yn siŵr',
  },
  sectionTitles: {
    applicationDetails: 'Manylion y cais',
  },
  keys: {
    noOfApplicants: 'Nifer y ceiswyr',
    dateChildMovedIn: 'Dyddiad wnaeth y plentyn symud i fyw gyda chi',
    name: 'Enw',
    phoneNumber: 'Rhif ffôn',
    emailAddress: 'Cyfeiriad e-bost',
  },
  errors: {
    dateChildMovedIn: {
      lessThanTenWeeks:
        'Rhaid i chi aros nes bydd 10 wythnos wedi mynd heibio ers i’r plentyn ddechrau byw gyda chi’n barhaus cyn cyflwyno eich cais',
    },
  },
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [
      applicantSummaryList(enContent, userCase, FieldPrefix.APPLICANT1),
    ],
  };
};

export const form: FormContent = {
  fields: {
  
  },
  submit: {
    text: l => l.continue,
  },
  editAnswers: {
    text: l => l.editAnswers,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
