import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  caption: 'MIAM exemptions',
  headingTitle: 'Do you have any of the following evidence of domestic violence or abuse?',
  select_all_apply: 'Select all that apply',
  childrenInvolvedCourtCase: 'Do you have any of the following evidence of domestic violence or abuse?',
  courtOrderProtection: 'Have you had a court order made for your protection?',
  inset:
    '<div class="govuk-inset-text"><p class="govuk-body">If you are seeking a MIAM exemption, you will need to give more details. </p><p class="govuk-body">The court needs this information to decide if you need to attend a MIAM.</p></div>',
  p: 'A prospective party is someone named in this application. It could refer to you, or the other people in the application (the respondents).<br>',
  policeInvolvement: 'The police have been involved',
  policeInvolvement_hint:
    'This may mean that someone in the application (you or the respondents) have been arrested, cautioned, charged or convicted for domestic or child abuse offences. Select all evidence you have to support your claim.',
  policeInvolvement_subFields: {
    evidenceOfSomeoneArrest:
      'Evidence that someone in the application has been arrested for a domestic violence offence',
    evidenceOfPolice: 'Evidence of a police caution for a domestic violence offence',
    evidenceOfOnGoingCriminalProceeding: 'Evidence of ongoing criminal proceedings for a domestic violence offence',
    evidenceOfConviction: 'Evidence of a conviction for a domestic violence offence',
    evidenceOFProtectionNotice: 'A domestic violence protection notice issued against someone in the application',
  },
  courtInvolvement: 'A court has already been involved',
  courtInvolvement_subFields: {
    evidenceOfSomeoneArrest:
      'Evidence that someone in the application has been arrested for a domestic violence offence',
    evidenceOfPolice: 'Evidence of a police caution for a domestic violence offence',
    evidenceOfOnGoingCriminalProceeding: 'Evidence of ongoing criminal proceedings for a domestic violence offence',
    evidenceOfConviction: 'Evidence of a conviction for a domestic violence offence',
    evidenceOFProtectionNotice: 'A domestic violence protection notice issued against someone in the application',
  },
  courtInvolvement_hint:
    'A court has made an order against you or the other people in the application (or someone close to you, or them) in connection to domestic violence and abuse. Select all evidence you have to support your claim.',
  letterOfBeingVictim:
    'A letter confirms that you or the other people in the application are (or have been) a victim of domestic violence or abuse',
  letterOfBeingVictim_subFields: {
    evidenceOfSomeoneArrest:
      'Evidence that someone in the application has been arrested for a domestic violence offence',
    evidenceOfPolice: 'Evidence of a police caution for a domestic violence offence',
    evidenceOfOnGoingCriminalProceeding: 'Evidence of ongoing criminal proceedings for a domestic violence offence',
    evidenceOfConviction: 'Evidence of a conviction for a domestic violence offence',
    evidenceOFProtectionNotice: 'A domestic violence protection notice issued against someone in the application',
  },
  letterOfBeingVictim_hint:
    'This may mean that a health professional has confirmed injuries that are (or were) a result of domestic violence and abuse. Select which evidence of this you can provide.',
  letterFromAuthority: 'A letter from a local authority or other agency confirms a risk of harm',
  letterFromAuthority_hint:
    'For example, a local authority or housing association has confirmed there is or has been a risk of domestic violence or abuse. Select which evidence of this you can provide.',
  letterFromSupportService: 'A letter from a domestic violence or abuse support service, specialist or organisation',
  letterFromSupportService_hint:
    'This could be an independent domestic violence or abuse adviser confirming support to you or the other people in this application (the respondents). Select which evidence of this you can provide.',
  ILRDuetoDomesticAbuse:
    'You or any of the other people in this application (the respondents) have been granted indefinite leave to remain in the UK as a victim of domestic violence or abuse',
  ILRDuetoDomesticAbuse_hint: 'A letter from the Home Office will have confirmed that leave was granted',
  financiallyAbuse:
    'You have evidence that you or the other people in the application (the respondents) have been (or are at risk of being) financially abused by the other party',
  financiallyAbuse_hint:
    'Financial abuse is a way of controlling someone being able to earn, spend or keep their own money. For example, preventing someone going to work, withholding money, or putting debts in someone else’s name. Evidence could include: <ul class="govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2"> <li>a copy of a credit card account, loan document or bank statements</li><li>a letter from a domestic violence support organisation</li><li>emails, text messages or a diary kept by the victim</li> </ul>',
  noneOfOptions: 'None of the above',
  errors: {
    miam_domesticabuse_involvement: {
      required: 'Select which of the following evidence of domestic violence or abuse you have',
    },
    miam_domesticabuse_involvement_subfields: {
      required: 'Select what evidence of police involvement you have',
    },
  },
});

const cy = () => ({
  caption: 'MIAM exemption - welsh',
  headingTitle: 'Do you have any of the following evidence of domestic violence or abuse?',
  select_all_apply: 'Select all that apply - welsh',
  childrenInvolvedCourtCase: 'Have the children been involved in a court case? - welsh',
  courtInvolvement_subFields: {
    evidenceOfSomeoneArrest:
      'Evidence that someone in the application has been arrested for a domestic violence offence - welsh',
    evidenceOfPolice: 'Evidence of a police caution for a domestic violence offence - welsh',
    evidenceOfOnGoingCriminalProceeding:
      'Evidence of ongoing criminal proceedings for a domestic violence offence - welsh',
    evidenceOfConviction: 'Evidence of a conviction for a domestic violence offence - welsh',
    evidenceOFProtectionNotice:
      'A domestic violence protection notice issued against someone in the application - welsh',
  },
  courtOrderProtection: 'Have you had a court order made for your protection? - welsh',
  inset:
    '<div class="govuk-inset-text"><p class="govuk-body">If you are seeking a MIAM exemption, you will need to give more details. - welsh </p><p class="govuk-body">The court needs this information to decide if you need to attend a MIAM. - welsh</p></div>',
  p: 'A prospective party is someone named in this application. It could refer to you, or the other people in the application (the respondents). - welsh <br>',
  policeInvolvement: 'The police have been involved - welsh',
  policeInvolvement_hint:
    'This may mean that someone in the application (you or the respondents) have been arrested, cautioned, charged or convicted for domestic or child abuse offences. Select all evidence you have to support your claim. - welsh',
  courtInvolvement: 'A court has already been involved - welsh',
  courtInvolvement_hint:
    'A court has made an order against you or the other people in the application (or someone close to you, or them) in connection to domestic violence and abuse. Select all evidence you have to support your claim.',
  letterOfBeingVictim:
    'A letter confirms that you or the other people in the application are (or have been) a victim of domestic violence or abuse - welsh',
  letterOfBeingVictim_hint:
    'This may mean that a health professional has confirmed injuries that are (or were) a result of domestic violence and abuse. Select which evidence of this you can provide.',
  letterFromAuthority: 'A letter from a local authority or other agency confirms a risk of harm - welsh',
  letterFromAuthority_hint:
    'For example, a local authority or housing association has confirmed there is or has been a risk of domestic violence or abuse. Select which evidence of this you can provide.',
  letterFromSupportService:
    'A letter from a domestic violence or abuse support service, specialist or organisation - welsh',
  letterFromSupportService_hint:
    'This could be an independent domestic violence or abuse adviser confirming support to you or the other people in this application (the respondents). Select which evidence of this you can provide.',
  ILRDuetoDomesticAbuse:
    'You or any of the other people in this application (the respondents) have been granted indefinite leave to remain in the UK as a victim of domestic violence or abuse - welsh',
  ILRDuetoDomesticAbuse_hint: 'A letter from the Home Office will have confirmed that leave was granted',
  financiallyAbuse:
    'You have evidence that you or the other people in the application (the respondents) have been (or are at risk of being) financially abused by the other party - welsh',
  financiallyAbuse_hint:
    'Financial abuse is a way of controlling someone being able to earn, spend or keep their own money. For example, preventing someone going to work, withholding money, or putting debts in someone else’s name. Evidence could include: <ul class="govuk-list govuk-list--bullet govuk-hint govuk-!-margin-top-2"> <li>a copy of a credit card account, loan document or bank statements</li><li>a letter from a domestic violence support organisation</li><li>emails, text messages or a diary kept by the victim</li> </ul>',
  noneOfOptions: 'None of the above - welsh',
  errors: {
    miam_domesticabuse_involvement: {
      required: 'Select which of the following evidence of domestic violence or abuse you have - welsh',
    },
    miam_domesticabuse_involvement_subfields: {
      required: 'Select what evidence of police involvement you have- welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_domesticabuse_involvement: {
      id: 'miam_domesticabuse_involvement',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'miam_domesticabuse_involvement',
          label: l => l.policeInvolvement,
          hint: l => l.policeInvolvement_hint,
          value: 'policeInvolvement',
          subFields: {
            miam_domesticabuse_involvement_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              values: [
                {
                  name: 'miam_domesticabuse_involvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfSomeoneArrest'],
                  value: 'evidenceOfSomeoneArrest',
                },
                {
                  name: 'miam_domesticabuse_involvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfPolice'],
                  value: 'evidenceOfPolice',
                },
                {
                  name: 'miam_domesticabuse_involvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfOnGoingCriminalProceeding'],
                  value: 'evidenceOfOnGoingCriminalProceeding',
                },
                {
                  name: 'miam_domesticabuse_involvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfConviction'],
                  value: 'evidenceOfConviction',
                },
                {
                  name: 'miam_domesticabuse_involvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOFProtectionNotice'],
                  value: 'evidenceOFProtectionNotice',
                },
              ],
            },
          },
        },
        {
          name: 'miam_domesticabuse_involvement',
          label: l => l.courtInvolvement,
          hint: l => l.courtInvolvement_hint,
          value: 'courtInvolvement',
          subFields: {
            miam_domesticabuse_courtInvolvement_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              values: [
                {
                  name: 'miam_domesticabuse_courtInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfSomeoneArrest'],
                  value: 'evidenceOfSomeoneArrest',
                },
                {
                  name: 'miam_domesticabuse_courtInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfPolice'],
                  value: 'evidenceOfPolice',
                },
                {
                  name: 'miam_domesticabuse_courtInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfOnGoingCriminalProceeding'],
                  value: 'evidenceOfOnGoingCriminalProceeding',
                },
                {
                  name: 'miam_domesticabuse_courtInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfConviction'],
                  value: 'evidenceOfConviction',
                },
                {
                  name: 'miam_domesticabuse_courtInvolvement_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOFProtectionNotice'],
                  value: 'evidenceOFProtectionNotice',
                },
              ],
            },
          },
        },
        {
          name: 'miam_domesticabuse_involvement',
          label: l => l.letterOfBeingVictim,
          hint: l => l.letterFromAuthority_hint,
          value: 'letterOfBeingVictim',
          subFields: {
            miam_domesticabuse_letterOfBeingVictim_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              values: [
                {
                  name: 'miam_domesticabuse_letterOfBeingVictim_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfSomeoneArrest'],
                  value: 'evidenceOfSomeoneArrest',
                },
                {
                  name: 'miam_domesticabuse_letterOfBeingVictim_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfPolice'],
                  value: 'evidenceOfPolice',
                },
                {
                  name: 'miam_domesticabuse_letterOfBeingVictim_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfOnGoingCriminalProceeding'],
                  value: 'evidenceOfOnGoingCriminalProceeding',
                },
                {
                  name: 'miam_domesticabuse_letterOfBeingVictim_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfConviction'],
                  value: 'evidenceOfConviction',
                },
                {
                  name: 'miam_domesticabuse_letterOfBeingVictim_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOFProtectionNotice'],
                  value: 'evidenceOFProtectionNotice',
                },
              ],
            },
          },
        },
        {
          name: 'miam_domesticabuse_involvement',
          label: l => l.letterFromAuthority,
          hint: l => l.letterFromAuthority_hint,
          value: 'letterFromAuthority',
          subFields: {
            miam_domesticabuse_letterFromAuthority_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              values: [
                {
                  name: 'miam_domesticabuse_letterFromAuthority_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfSomeoneArrest'],
                  value: 'evidenceOfSomeoneArrest',
                },
                {
                  name: 'miam_domesticabuse_letterFromAuthority_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfPolice'],
                  value: 'evidenceOfPolice',
                },
                {
                  name: 'miam_domesticabuse_letterFromAuthority_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfOnGoingCriminalProceeding'],
                  value: 'evidenceOfOnGoingCriminalProceeding',
                },
                {
                  name: 'miam_domesticabuse_letterFromAuthority_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfConviction'],
                  value: 'evidenceOfConviction',
                },
                {
                  name: 'miam_domesticabuse_letterFromAuthority_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOFProtectionNotice'],
                  value: 'evidenceOFProtectionNotice',
                },
              ],
            },
          },
        },
        {
          name: 'miam_domesticabuse_involvement',
          label: l => l.letterFromSupportService,
          hint: l => l.letterFromSupportService_hint,
          value: 'letterFromSupportService',
          subFields: {
            miam_domesticabuse_courtInvolvement_subfields: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              values: [
                {
                  name: 'miam_domesticabuse_letterFromSupportService_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfSomeoneArrest'],
                  value: 'evidenceOfSomeoneArrest',
                },
                {
                  name: 'miam_domesticabuse_letterFromSupportService_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfPolice'],
                  value: 'evidenceOfPolice',
                },
                {
                  name: 'miam_domesticabuse_letterFromSupportService_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfOnGoingCriminalProceeding'],
                  value: 'evidenceOfOnGoingCriminalProceeding',
                },
                {
                  name: 'miam_domesticabuse_letterFromSupportService_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOfConviction'],
                  value: 'evidenceOfConviction',
                },
                {
                  name: 'miam_domesticabuse_letterFromSupportService_subfields',
                  label: l => l.policeInvolvement_subFields['evidenceOFProtectionNotice'],
                  value: 'evidenceOFProtectionNotice',
                },
              ],
            },
          },
        },
        {
          name: 'miam_domesticabuse_involvement',
          label: l => l.ILRDuetoDomesticAbuse,
          hint: l => l.ILRDuetoDomesticAbuse_hint,
          value: 'ILRDuetoDomesticAbuse',
        },
        {
          name: 'miam_domesticabuse_involvement',
          label: l => l.financiallyAbuse,
          hint: l => l.financiallyAbuse_hint,
          value: 'financiallyAbuse',
        },
        {
          divider: 'or',
        },
        {
          name: 'miam_domesticabuse_involvement',
          label: l => l.noneOfOptions,
          value: 'none',
          behaviour: 'exclusive',
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
