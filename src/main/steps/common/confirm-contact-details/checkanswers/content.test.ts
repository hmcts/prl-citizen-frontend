/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent, en as enContent, generatePageContent } from '../../common.content';

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
  title: 'Darllenwch yr wybodaeth i wneud yn siŵr ei bod yn gywir, ac ychwanegwch unrhyw fanylion sydd ar goll',
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
    citizenUserSafeToCall: 'Pa bryd y mae’n ddiogel eich ffonio (dewisol)',
  },
  completeSection: 'Llenwch yr adran hon',
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

  test('should set correct url address text when post code is entered for english', () => {
    expect(
      generateContent({
        ...commonContent,
        userCase: { citizenUserAddressPostcode: 'SW11AA', citizenUserDateOfBirth: new Date() },
      } as unknown as CommonContent).sections
    ).toStrictEqual([
      {
        rows: [
          {
            actions: {
              items: [
                {
                  href: 'addresshistory',
                  text: 'Edit',
                  visuallyHiddenText: 'Address history',
                },
              ],
            },
            key: {
              text: 'Address history',
            },
            value: {},
          },
        ],
        title: '',
      },
    ]);
  });

  test('should set correct url address text when post code is entered for welsh', () => {
    expect(
      generateContent({
        ...commonContent,
        userCase: { citizenUserAddressPostcode: 'SW11AA', citizenUserDateOfBirth: new Date() },
        language: 'cy',
      } as unknown as CommonContent).sections
    ).toStrictEqual([
      {
        rows: [
          {
            actions: {
              items: [
                {
                  href: 'addresshistory',
                  text: 'Golygu',
                  visuallyHiddenText: 'Hanes cyfeiriad',
                },
              ],
            },
            key: {
              text: 'Hanes cyfeiriad',
            },
            value: {},
          },
        ],
        title: '',
      },
    ]);
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit?.text as Function)(enContent)).toBe('Save and continue');
  });
});
