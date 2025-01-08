import { CaseWithId } from '../../../../app/case/case';
import { CaseType, PartyType } from '../../../../app/case/definition';
import { UserDetails } from '../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { SummaryListContent } from '../../../../steps/c100-rebuild/check-your-answers/lib/lib';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { CommonContent } from '../../../common/common.content';
import { getFormattedDate, summaryList } from '../../../common/summary/utils';

export const enContent = {
  title: 'Check your details',
  subTitle: 'Read the information to make sure it is correct, and add any missing details',
  contactdetailpriv:
    'if you do not want to share your contact details with the other person in the case,update the section',
  contactdetailprivlinktext: 'keep your details private',
  link: '',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    citizenUserFullName: 'Name',
    citizenUserDateOfBirthText: 'Date of birth',
    citizenUserPlaceOfBirthText: 'Place of birth',
    citizenUserAddressText: 'Address',
    citizenUserAddressHistory: 'Address history',
    citizenUserPhoneNumberText: 'Phone number',
    citizenUserEmailAddressText: 'Email',
    citizenUserSafeToCall: 'When it is safe to call you (optional)',
  },
  completeSection: 'Complete this section',
  errors: {},
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const dob = userCase.citizenUserDateOfBirth;
  if (typeof dob !== 'string') {
    getFormattedDate(dob);
  }
  if (!userCase.citizenUserAddressPostcode) {
    urls.citizenUserAddressText = 'address/lookup';
  } else {
    urls.citizenUserAddressText = 'addressdetails';
  }

  return {
    ...enContent,
    language: content.language,
    sections: [
      summaryList(
        removeFields(userCase, content.additionalData?.req.session.user, enContent),
        userCase,
        urls,
        '',
        content.language
      ),
    ],
  };
};

export const cyContent: typeof enContent = {
  title: 'Gwiriwch eich manylion cyswllt',
  subTitle: 'Darllenwch yr wybodaeth i wneud yn siŵr ei bod yn gywir, ac ychwanegwch unrhyw fanylion sydd ar goll',
  contactdetailpriv:
    'Os nad ydych eisiau rhannu eich manylion cyswllt gyda’r unigolyn arall yn yr achos, diweddarwch yr adran',
  contactdetailprivlinktext: 'Cadw eich manylion yn breifat',
  link: '',
  sectionTitles: {
    applicationDetails: 'Manylion y cais',
  },
  keys: {
    citizenUserFullName: 'Enw',
    citizenUserDateOfBirthText: 'Dyddiad geni',
    citizenUserPlaceOfBirthText: 'Lleoliad geni',
    citizenUserAddressText: 'Cyfeiriad',
    citizenUserAddressHistory: 'Hanes cyfeiriad',
    citizenUserPhoneNumberText: 'Rhif ffôn',
    citizenUserEmailAddressText: 'Cyfeiriad e-bost',
    citizenUserSafeToCall: 'Pa bryd y mae’n ddiogel eich ffonio (dewisol)',
  },
  completeSection: 'Llenwch yr adran hon',
  errors: {},
};

const urls = {
  citizenUserFullName: 'personaldetails',
  citizenUserDateOfBirthText: 'personaldetails',
  citizenUserPlaceOfBirthText: 'personaldetails',
  citizenUserAddressText: 'addressdetails',
  citizenUserAddressHistory: 'addresshistory',
  citizenUserPhoneNumberText: 'contactdetails',
  citizenUserEmailAddressText: 'contactdetails',
  citizenUserSafeToCall: 'contactdetails',
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const dob = userCase.citizenUserDateOfBirth;
  if (dob !== null && dob !== undefined && typeof dob !== 'string') {
    getFormattedDate(dob);
  }
  if (!userCase.citizenUserAddressPostcode) {
    urls.citizenUserAddressText = 'address/lookup';
  } else {
    urls.citizenUserAddressText = 'addressdetails';
  }
  return {
    ...cyContent,
    language: content.language,
    sections: [
      summaryList(
        removeFields(userCase, content.additionalData?.req.session.user, cyContent),
        userCase,
        urls,
        '',
        content.language
      ),
    ],
  };
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
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

export const removeFields = (
  caseData: Partial<CaseWithId>,
  userDetails: UserDetails,
  content: SummaryListContent
): SummaryListContent => {
  const keys = { ...content.keys };

  if (caseData?.caseTypeOfApplication === CaseType.FL401) {
    delete keys.citizenUserPlaceOfBirthText;
    delete keys.citizenUserAddressHistory;

    if (getCasePartyType(caseData, userDetails.id) === PartyType.RESPONDENT) {
      delete keys.citizenUserSafeToCall;
    }
  } else {
    delete keys.citizenUserSafeToCall;
  }

  return { ...content, keys };
};
