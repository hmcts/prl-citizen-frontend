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
    miam_notAttendingReasons: {
      required: 'Confirm if if any of the other valid reasons for not attending a MIAM apply in your case',
    },
    miam_noMediatorAccessSubfields: {
      required: 'Select why you cannot access a mediator',
    },
  },
};

const cy = {
  serviceName: 'Child Arrangements - welsh',
  caption: 'Esemptiadau MIAM',
  title:
    "A allwch chi gadarnhau bod unrhyw un o'r rhesymau dilys eraill dros beidio â mynychu MIAM yn berthnasol yn eich achos chi?",
  lines: [
    'Os ydych chi’n ceisio esemptiad rhag mynychu MIAM, bydd angen i chi ddarparu mwy o fanylion.',
    'Mae’r llys angen yr wybodaeth hon i benderfynu a oes angen i chi fynychu MIAM ai peidio.',
  ],
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  noSufficientContactDetails:
    'Nid oes gennych ddigon o fanylion cyswllt ar gyfer y bobl eraill yn y cais hwn (yr atebwyr) i alluogi cyfryngwr teulu i gysylltu ag unrhyw un ohonynt at ddiben trefnu’r MIAM',
  applyingForWithoutNoticeHearing: 'Rydych yn gwneud cais am wrandawiad heb rybudd',
  applyingForWithoutNoticeHearingHint:
    "Bydd gwrandawiadau sy'n digwydd heb rybudd i'r bobl eraill ond yn cael eu cyfiawnhau lle mae brys eithriadol ynglŷn â'ch achos, neu fod rheswm da dros beidio â dweud wrth y bobl eraill am eich cais (naill ai oherwydd y gallent gymryd camau i rwystro'r cais neu oherwydd y gallai gwneud hynny beri niwed i chi neu’r plant)",
  canNotAccessMediator: 'Ni allwch drefnu apwyntiad addas â chyfryngwr',
  canNotAccessMediatorHint:
    'Gall hyn olygu eich bod yn byw mwy na 15 milltir o gyfryngwr, ni allwch gael apwyntiad ar gyfer MIAM o fewn 15 diwrnod gwaith neu os oes gennych chi neu’r bobl eraill yn y cais hwn (yr atebwyr) anabledd ac nid oes gan y cyfryngwr fynediad i bobl anabl. Dewiswch y rheswm penodol pam na allwch fynd i weld cyfryngwr.',
  mediatorDoesNotHaveDisabilityAccess:
    'Mae gennych chi neu’r unigolyn arall anabledd ac nid oes gan y cyfryngwr fynediad i bobl anabl',
  mediatorDoesNotHaveDisabilityAccessHint1: `Bydd angen i chi ddarparu: <ul class="govuk-list govuk-list--bullet govuk-!-margin-top-2 govuk-hint">
  <li>tystiolaeth eich bod wedi cysylltu â 3 cyfryngwr o fewn 15 milltir sydd i gyd yn dweud nad oes ganddynt fynediad i bobl anabl</li>
  <li>enwau a manylion cyswllt y cyfryngwyr, gan gynnwys dyddiadau Cyswllt</li>
        </ul>`,
  mediatorDoesNotHaveDisabilityAccessHint2: `Bydd angen i chi ddarparu: <ul class="govuk-list govuk-list--bullet govuk-!-margin-top-2 govuk-hint">
  <li>tystiolaeth eich bod wedi cysylltu â 3 cyfryngwr o fewn 15 milltir sydd i gyd wedi dweud na allant gynnig apwyntiad i chi o fewn 15 diwrnod</li>
  <li>enwau a manylion cyswllt y cyfryngwyr, gan gynnwys dyddiadau Cyswllt</li>
        </ul>`,
  noMediatorAppointment:
    'Rydych chi neu’r unigolyn arall wedi cysylltu â 3 cyfryngwr o fewn 15 milltir ac ni allwch gael apwyntiad o fewn 15 diwrnod gwaith',
  noAuthorisedFamilyMediator:
    'Nid oes cyfryngwr teulu awdurdodedig gyda swyddfa ei hun ar gael o fewn 15 milltir i’ch cartref',
  notAttendingAsInPrison:
    'Ni allwch chi na’r holl ddarpar atebwyr fynychu MIAM oherwydd bod un ohonoch yn y carchar neu unrhyw sefydliad arall; yn destun amodau mechnïaeth sy’n atal cyswllt rhwng y naill a’r llall; neu’n destun trwydded gyda chyswllt gwaharddedig rhwng y naill a’r llall',
  notHabituallyResident: 'Nid ydych chi na’r holl ddarpar atebwyr yn preswylio’n arferol yng Nghymru neu Lloegr',
  notHabituallyResidentHint:
    'Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, neu bod eich prif fywyd teuluol y tu allan i Gymru neu Loegr',
  under18: "Rydych chi neu'r darpar atebwyr o dan 18 oed",
  noneOfTheAbove: "Dim un o'r uchod",
  errors: {
    miam_notAttendingReasons: {
      required: 'Confirm if if any of the other valid reasons for not attending a MIAM apply in your case - welsh',
    },
    miam_noMediatorAccessSubfields: {
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
    const miamNotAttendingReasonsField = fields.miam_notAttendingReasons as FormOptions;
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
      ?.miam_noMediatorAccessSubfields as FormOptions;
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
