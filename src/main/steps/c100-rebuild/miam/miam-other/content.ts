import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  serviceName: 'Child Arrangements',
  caption: 'MIAM exemptions',
  title: 'Can you confirm that any of the other valid reasons for not attending a MIAM apply in your case?',
  lines: [
    'If you are seeking a MIAM exemption, you will need to give more details.',
    'The court needs this information to decide if you need to attend a MIAM.',
  ],
  select_all_apply: 'Select all that apply to you',
  noSufficientContactDetails:
    'You do not have sufficient contact details for the other people in this application (the respondents) to enable a family mediator to contact any of them for the purpose of scheduling the MIAM',
  applyingForWithoutNoticeHearing: 'You’re applying for a without notice hearing',
  applyingForWithoutNoticeHearingHint:
    'Hearings which take place without notice to the other people will only be justified where your case is exceptionally urgent or there is good reason not to tell the other people about your application (either because they could take steps to obstruct the application or because doing so may expose you or the children to a risk of harm)',
  canNotAccessMediator: 'You cannot access a mediator',
  canNotAccessMediatorHint:
    'This may mean that you live further than 15 miles from a mediator, you are not able to get an appointment for a MIAM within 15 working days or you or the other people in this application (the respondents) have a disability and the mediator does not have disabled access. Select the specific reason why you cannot access a mediator.',
  mediatorDoesNotHaveDisabilityAccess:
    'You or the other person has a disability and the mediator does not have disabled access',
  mediatorDoesNotHaveDisabilityAccessHint1: `You will need to provide: <ul class="govuk-list govuk-list--bullet govuk-!-margin-top-2 govuk-hint">
  <li>evidence you’ve contacted 3 mediators within 15 miles who all state they do not have disabled access</li>
  <li>names and contact details of the mediators, including dates of contact</li>
        </ul>`,
  mediatorDoesNotHaveDisabilityAccessHint2: `You will need to provide: <ul class="govuk-list govuk-list--bullet govuk-!-margin-top-2 govuk-hint">
  <li>evidence you’ve contacted 3 mediators within 15 miles who all state they cannot offer an appointment within 15 days</li>
  <li>names and contact details of the mediators, including dates of contact</li>
        </ul>`,
  noMediatorAppointment:
    'You or the other person has contacted 3 mediators within 15 miles and cannot get an appointment within 15 working days',
  noAuthorisedFamilyMediator: 'There is no authorised family mediator with an office within 15 miles of your home',
  notAttendingAsInPrison:
    'You or all of the prospective respondents cannot attend a MIAM because one of you is in prison or any other institution; subject to bail conditions that prevent contact with each other; or subject to a licence with a prohibited contact with each other',
  notHabituallyResident: 'You or all of the prospective respondents are not habitually resident in England and Wales',
  notHabituallyResidentHint:
    'This may include working, owning property, having children in school or if family life mainly takes place outside England or Wales',
  under18: 'You or the prospective respondents are under 18 years old',
  noneOfTheAbove: 'None of the above',
  errors: {
    miam_notAttendingReasons: {
      required: 'Confirm if if any of the other valid reasons for not attending a MIAM apply in your case',
    },
    miam_notAttendingReasons_canNotAccessMediator: {
      required: 'Select why you cannot access a mediator',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'MIAM exemptions - welsh',
  title: 'Can you confirm that any of the other valid reasons for not attending a MIAM apply in your case? - welsh',
  lines: [
    'If you are seeking a MIAM exemption, you will need to give more details. - welsh',
    'The court needs this information to decide if you need to attend a MIAM. - welsh',
  ],
  select_all_apply: 'Select all that apply to you - welsh',
  noSufficientContactDetails:
    'You do not have sufficient contact details for the other people in this application (the respondents) to enable a family mediator to contact any of them for the purpose of scheduling the MIAM - welsh',
  applyingForWithoutNoticeHearing: 'You’re applying for a without notice hearing - welsh',
  applyingForWithoutNoticeHearingHint:
    'Hearings which take place without notice to the other people will only be justified where your case is exceptionally urgent or there is good reason not to tell the other people about your application (either because they could take steps to obstruct the application or because doing so may expose you or the children to a risk of harm) - welsh',
  canNotAccessMediator: 'You cannot access a mediator - welsh',
  canNotAccessMediatorHint:
    'This may mean that you live further than 15 miles from a mediator, you are not able to get an appointment for a MIAM within 15 working days or you or the other people in this application (the respondents) have a disability and the mediator does not have disabled access. Select the specific reason why you cannot access a mediator. - welsh',
  mediatorDoesNotHaveDisabilityAccess:
    'You or the other person has a disability and the mediator does not have disabled access - welsh',
  mediatorDoesNotHaveDisabilityAccessHint1: `You will need to provide: - welsh <ul class="govuk-list govuk-list--bullet govuk-!-margin-top-2 govuk-hint">
  <li>evidence you’ve contacted 3 mediators within 15 miles who all state they do not have disabled access - welsh</li>
  <li>names and contact details of the mediators, including dates of contact - welsh</li>
        </ul>`,
  mediatorDoesNotHaveDisabilityAccessHint2: `You will need to provide: <ul class="govuk-list govuk-list--bullet govuk-!-margin-top-2 govuk-hint">
  <li>evidence you’ve contacted 3 mediators within 15 miles who all state they cannot offer an appointment within 15 days - welsh</li>
  <li>names and contact details of the mediators, including dates of contact - welsh</li>
        </ul>`,
  noMediatorAppointment:
    'You or the other person has contacted 3 mediators within 15 miles and cannot get an appointment within 15 working days - welsh',
  noAuthorisedFamilyMediator:
    'There is no authorised family mediator with an office within 15 miles of your home - welsh',
  notAttendingAsInPrison:
    'You or all of the prospective respondents cannot attend a MIAM because one of you is in prison or any other institution; subject to bail conditions that prevent contact with each other; or subject to a licence with a prohibited contact with each other - welsh',
  notHabituallyResident:
    'You or all of the prospective respondents are not habitually resident in England and Wales - welsh',
  notHabituallyResidentHint:
    'This may include working, owning property, having children in school or if family life mainly takes place outside England or Wales - welsh',
  under18: 'You or the prospective respondents are under 18 years old - welsh',
  noneOfTheAbove: 'None of the above - welsh',
  errors: {
    miam_notAttendingReasons: {
      required: 'Confirm if if any of the other valid reasons for not attending a MIAM apply in your case - welsh',
    },
    miam_notAttendingReasons_canNotAccessMediator: {
      required: 'Select why you cannot access a mediator - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    miam_notAttendingReasons: {
      id: 'miam_notAttendingReasons',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'miam_notAttendingReasons',
          label: l => l.noSufficientContactDetails,
          value: 'noSufficientContactDetails',
        },
        {
          name: 'miam_notAttendingReasons',
          label: l => l.applyingForWithoutNoticeHearing,
          hint: l => l.applyingForWithoutNoticeHearingHint,
          value: 'applyingForWithoutNoticeHearing',
        },
        {
          name: 'miam_notAttendingReasons',
          label: l => l.canNotAccessMediator,
          hint: l => l.canNotAccessMediatorHint,
          value: 'canNotAccessMediator',
          subFields: {
            miam_notAttendingReasons_canNotAccessMediator: {
              id: 'miam_notAttendingReasons_canNotAccessMediator',
              type: 'checkboxes',
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'miam_notAttendingReasons_canNotAccessMediator',
                  label: l => l.mediatorDoesNotHaveDisabilityAccess,
                  value: 'mediatorDoesNotHaveDisabilityAccess',
                  hint: l => l.mediatorDoesNotHaveDisabilityAccessHint1,
                },
                {
                  name: 'miam_notAttendingReasons_canNotAccessMediator',
                  label: l => l.noMediatorAppointment,
                  value: 'noMediatorAppointment',
                  hint: l => l.mediatorDoesNotHaveDisabilityAccessHint2,
                },
                {
                  name: 'miam_notAttendingReasons_canNotAccessMediator',
                  label: l => l.noAuthorisedFamilyMediator,
                  value: 'noAuthorisedFamilyMediator',
                },
              ],
            },
          },
        },
        {
          name: 'miam_notAttendingReasons',
          label: l => l.notAttendingAsInPrison,
          value: 'notAttendingAsInPrison',
        },
        {
          name: 'miam_notAttendingReasons',
          label: l => l.notHabituallyResident,
          hint: l => l.notHabituallyResidentHint,
          value: 'notHabituallyResident',
        },
        {
          name: 'miam_notAttendingReasons',
          label: l => l.under18,
          value: 'under18',
        },
        {
          divider: 'or',
        },
        {
          name: 'miam_notAttendingReasons',
          label: l => l.noneOfTheAbove,
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
