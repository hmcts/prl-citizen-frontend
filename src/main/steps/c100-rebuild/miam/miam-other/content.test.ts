import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
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
    miam_not_attending_reasons: {
      required: 'Confirm if any of the other valid reasons for not attending a MIAM apply in your case',
    },
    miam_no_mediator_access_subfields: {
      required: 'Select why you cannot access a mediator',
    },
  },
};

const cy = {
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
    miam_not_attending_reasons: {
      required: 'Confirm if any of the other valid reasons for not attending a MIAM apply in your case - welsh',
    },
    miam_no_mediator_access_subfields: {
      required: 'Select why you cannot access a mediator - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('miam should contain miam other reasons content', () => {
  let form;
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain miam other reasons field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const miamNotAttendingReasonsField = fields.miam_not_attending_reasons as FormOptions;
    expect(miamNotAttendingReasonsField.type).toBe('checkboxes');
    expect((miamNotAttendingReasonsField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);

    expect((miamNotAttendingReasonsField.values[0].label as LanguageLookup)(generatedContent)).toBe(
      en.noSufficientContactDetails
    );
    expect((miamNotAttendingReasonsField.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.applyingForWithoutNoticeHearing
    );
    expect((miamNotAttendingReasonsField.values[2].label as LanguageLookup)(generatedContent)).toBe(
      en.canNotAccessMediator
    );
    expect((miamNotAttendingReasonsField.values[2].hint as LanguageLookup)(generatedContent)).toBe(
      en.canNotAccessMediatorHint
    );
    expect((miamNotAttendingReasonsField.values[3].label as LanguageLookup)(generatedContent)).toBe(
      en.notAttendingAsInPrison
    );
    expect((miamNotAttendingReasonsField.values[4].label as LanguageLookup)(generatedContent)).toBe(
      en.notHabituallyResident
    );
    expect((miamNotAttendingReasonsField.values[4].hint as LanguageLookup)(generatedContent)).toBe(
      en.notHabituallyResidentHint
    );
    expect((miamNotAttendingReasonsField.values[5].label as LanguageLookup)(generatedContent)).toBe(en.under18);
    expect((miamNotAttendingReasonsField.values[7].label as LanguageLookup)(generatedContent)).toBe(en.noneOfTheAbove);
    expect(miamNotAttendingReasonsField.values[7].behaviour).toBe('exclusive');

    (miamNotAttendingReasonsField.validator as Function)('noSufficientContactDetails');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('noSufficientContactDetails');

    const noMediatorAccessSubField = miamNotAttendingReasonsField.values[2].subFields
      ?.miam_no_mediator_access_subfields as FormOptions;
    expect(noMediatorAccessSubField.type).toBe('checkboxes');
    expect((noMediatorAccessSubField.values[0].label as LanguageLookup)(generatedContent)).toBe(
      en.mediatorDoesNotHaveDisabilityAccess
    );
    expect((noMediatorAccessSubField.values[0].hint as LanguageLookup)(generatedContent)).toBe(
      en.mediatorDoesNotHaveDisabilityAccessHint1
    );
    expect((noMediatorAccessSubField.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.noMediatorAppointment
    );
    expect((noMediatorAccessSubField.values[1].hint as LanguageLookup)(generatedContent)).toBe(
      en.mediatorDoesNotHaveDisabilityAccessHint2
    );
    expect((noMediatorAccessSubField.values[2].label as LanguageLookup)(generatedContent)).toBe(
      en.noAuthorisedFamilyMediator
    );

    (noMediatorAccessSubField.validator as Function)('noMediatorAppointment');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('noMediatorAppointment');
  });

  test('should contain Continue and save and comeback later button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
