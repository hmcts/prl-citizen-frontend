import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../common.content';

import { generateContent } from './content';

const en = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  contactdetailpriv:
    'if you do not want to share your contact details with the other person in the case,update the section',
  contactdetailprivlinktext: 'keeping your contact details private',
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

const cy: typeof en = {
  section: 'Gwiriwch eich manylion cyswllt',
  title: 'Read the information to make sure it is correct, and add any missing details (Welsh)',
  contactdetailpriv:
    'Os nad ydych eisiau rhannu eich manylion cyswllt gyda’r unigolyn arall yn yr achos, diweddarwch yr adran',
  contactdetailprivlinktext: 'Cadw eich manylion cyswllt yn breifat',
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
    citizenUserSafeToCall: 'When it is safe to call you (optional)',
  },
  completeSection: 'Complete this section (welsh)',
  errors: {},
};

describe('address confirmation > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
