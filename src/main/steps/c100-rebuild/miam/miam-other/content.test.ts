import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import {
  FormContent,
  //FormFields, FormOptions,
  LanguageLookup,
} from '../../../../app/form/Form';
//import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'MIAM exemptions',
  title: 'Other reason for not attending a MIAM',
  lines: 'Depending on your reason why you cannot attend a MIAM, you might need to provide evidence.',
  subTitle: 'What other reason do you have for not attending a MIAM?',
  applyingForWithoutNoticeHearing: 'You’re applying for a ‘without notice’ hearing',
  applyingForWithoutNoticeHearingHint:
    'Hearings which take place without notice to the other people will only be justified where your case is exceptionally urgent or there is good reason not to tell the other people about your application (either because they could take steps to obstruct the application or because doing so may expose you or the children to a risk of harm)',
  under18: 'You or one of the respondents is under 18 years old',
  canNotAccessMediator: 'You cannot access a mediator',
  noneOfTheAbove: 'None of these',
  errors: {
    miam_notAttendingReasons: {
      required: 'Select what other reason you have for not attending a MIAM',
    },
  },
};
const cy = {
  caption: 'Esemptiadau MIAM',
  title: 'Rheswm arall dros beidio â mynychu MIAM',
  lines: 'Gan ddibynnu ar eich rheswm pam na allwch chi fynychu MIAM, efallai y bydd angen i chi ddarparu tystiolaeth.',
  subTitle: 'Pa reswm arall sydd gennych dros beidio â mynychu MIAM?',
  applyingForWithoutNoticeHearing: 'Rydych yn gwneud cais am wrandawiad ‘heb rybudd',
  applyingForWithoutNoticeHearingHint:
    'Bydd gwrandawiadau sy’n digwydd heb rybudd i’r bobl eraill ond yn cael eu cyfiawnhau lle mae brys eithriadol ynglŷn â’ch achos, neu fod rheswm da dros beidio â dweud wrth y bobl eraill am eich cais (naill ai oherwydd y gallant gymryd camau i rwystro’r cais neu oherwydd y gallai gwneud hynny achosi niwed i chi neu’r plant).',
  under18: 'Rydych chi neu un o’r atebwyr o dan 18 oed',
  canNotAccessMediator: 'Ni allwch gael mynediad at gyfryngwr',
  noneOfTheAbove: 'Dim un o’r rhain',
  errors: {
    miam_notAttendingReasons: {
      required: 'Dewiswch pa reswm arall sydd gennych dros beidio â mynychu MIAM',
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
  // test.skip('should contain miam other reasons field', () => {
  //   const generatedContent = generateContent(commonContent) as Record<string, never>;
  //   form = generatedContent.form as FormContent;
  //   const fields = form.fields as FormFields;
  //   const miamNotAttendingReasonsField = fields.miam_notAttendingReasons as FormOptions;
  //   expect(miamNotAttendingReasonsField.type).toBe('checkboxes');
  //   expect((miamNotAttendingReasonsField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);

  //   expect((miamNotAttendingReasonsField.values[0].label as LanguageLookup)(generatedContent)).toBe(
  //     en.noSufficientContactDetails
  //   );
  //   expect((miamNotAttendingReasonsField.values[1].label as LanguageLookup)(generatedContent)).toBe(
  //     en.applyingForWithoutNoticeHearing
  //   );
  //   expect((miamNotAttendingReasonsField.values[2].label as LanguageLookup)(generatedContent)).toBe(
  //     en.canNotAccessMediator
  //   );
  //   expect((miamNotAttendingReasonsField.values[2].hint as LanguageLookup)(generatedContent)).toBe(
  //     en.canNotAccessMediatorHint
  //   );
  //   expect((miamNotAttendingReasonsField.values[3].label as LanguageLookup)(generatedContent)).toBe(
  //     en.notAttendingAsInPrison
  //   );
  //   expect((miamNotAttendingReasonsField.values[4].label as LanguageLookup)(generatedContent)).toBe(
  //     en.notHabituallyResident
  //   );
  //   expect((miamNotAttendingReasonsField.values[4].hint as LanguageLookup)(generatedContent)).toBe(
  //     en.notHabituallyResidentHint
  //   );
  //   expect((miamNotAttendingReasonsField.values[5].label as LanguageLookup)(generatedContent)).toBe(en.under18);
  //   expect((miamNotAttendingReasonsField.values[7].label as LanguageLookup)(generatedContent)).toBe(en.noneOfTheAbove);
  //   expect(miamNotAttendingReasonsField.values[7].behaviour).toBe('exclusive');

  //   (miamNotAttendingReasonsField.validator as Function)('noSufficientContactDetails');
  //   expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('noSufficientContactDetails');

  //   const noMediatorAccessSubField = miamNotAttendingReasonsField.values[2].subFields
  //     ?.miam_noMediatorAccessSubfields as FormOptions;
  //   expect(noMediatorAccessSubField.type).toBe('checkboxes');
  //   expect((noMediatorAccessSubField.values[0].label as LanguageLookup)(generatedContent)).toBe(
  //     en.mediatorDoesNotHaveDisabilityAccess
  //   );
  //   expect((noMediatorAccessSubField.values[0].hint as LanguageLookup)(generatedContent)).toBe(
  //     en.mediatorDoesNotHaveDisabilityAccessHint1
  //   );
  //   expect((noMediatorAccessSubField.values[1].label as LanguageLookup)(generatedContent)).toBe(
  //     en.noMediatorAppointment
  //   );
  //   expect((noMediatorAccessSubField.values[1].hint as LanguageLookup)(generatedContent)).toBe(
  //     en.mediatorDoesNotHaveDisabilityAccessHint2
  //   );
  //   expect((noMediatorAccessSubField.values[2].label as LanguageLookup)(generatedContent)).toBe(
  //     en.noAuthorisedFamilyMediator
  //   );

  //   (noMediatorAccessSubField.validator as Function)('noMediatorAppointment');
  //   expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('noMediatorAppointment');
  // });

  test('should contain Continue and save and comeback later button', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    form = generatedContent.form as FormContent;
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
