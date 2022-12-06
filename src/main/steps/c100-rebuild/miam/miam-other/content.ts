import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
export * from './routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
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
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  serviceName: 'Trefniadau plant',
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
      required:
        "A allwch chi gadarnhau bod unrhyw un o'r rhesymau dilys eraill dros beidio â mynychu MIAM yn berthnasol yn eich achos chi?",
    },
    miam_noMediatorAccessSubfields: {
      required: 'Dewiswch pam na allwch fynd i weld cyfryngwr',
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
            miam_noMediatorAccessSubfields: {
              id: 'miam_noMediatorAccessSubfields',
              type: 'checkboxes',
              validator: atLeastOneFieldIsChecked,
              values: [
                {
                  name: 'miam_noMediatorAccessSubfields',
                  label: l => l.mediatorDoesNotHaveDisabilityAccess,
                  value: 'mediatorDoesNotHaveDisabilityAccess',
                  hint: l => l.mediatorDoesNotHaveDisabilityAccessHint1,
                },
                {
                  name: 'miam_noMediatorAccessSubfields',
                  label: l => l.noMediatorAppointment,
                  value: 'noMediatorAppointment',
                  hint: l => l.mediatorDoesNotHaveDisabilityAccessHint2,
                },
                {
                  name: 'miam_noMediatorAccessSubfields',
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
          divider: l => l.divider,
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
