import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  serviceName: 'Child Arrangements',
  caption: 'Reasonable adjustments',
  headingTitle: 'I need to bring support with me to a court hearing',
  line1: 'Consider in-person, phone or video, in case your preferred hearing type is not possible',
  select_all_apply: 'Select all that apply to you',
  supportWorkerCarer: 'A support worker or carer',
  supportWorkerCarer_subfield: 'Tell us who you will bring',
  friendFamilyMember: 'A friend or family member',
  friendFamilyMember_subfield: 'Tell us who you will bring',
  assistanceGuideDog: 'Assistance / guide dog',
  therapyAnimal: 'Therapy animal',
  therapyAnimal_subfield: 'Describe what you need',
  supportCourtOther: 'Other',
  supportCourtOther_subfield: 'Describe what you need',
  supportCourtNoOption: 'No, I do not need any support at this time',
  errors: {
    ra_supportWorkerCarer_subfield: {
      required: 'Enter the name of the support worker or carer you will bring',
    },
    ra_friendFamilyMember_subfield: {
      required: 'Enter the name of a friend or family member you will bring',
    },
    ra_therapyAnimal_subfield: {
      required: 'Describe which therapy animal you will bring',
    },
    ra_supportCourtOther_subfield: {
      required: 'Describe which support you need to bring with you to a hearing ',
    },
    ra_supportCourt: {
      required: 'Select which support you need to bring with you to a hearing',
    },
  },
};

const cy = {
  serviceName: 'Trefniadau plant',
  caption: 'Addasiadau rhesymol',
  headingTitle: 'Rwyf eisiau dod â rhywun efo fi i fy nghefnogi mewn gwrandawiad llys',
  line1:
    'Ystyriwch wrandawiad wyneb yn wyneb, dros y ffôn neu drwy fideo, rhag ofn nad yw’r math o wrandawiad a ffefrir gennych yn bosibl',
  select_all_apply: "Dewiswch bob un sy'n berthnasol i chi",
  supportWorkerCarer: 'Gweithiwr cymorth neu ofalwr',
  supportWorkerCarer_subfield: 'Dywedwch wrthym pwy fyddwch yn dod efo chi',
  friendFamilyMember: "ffrind neu aelod o'r teulu",
  friendFamilyMember_subfield: 'Dywedwch wrthym pwy fyddwch yn dod efo chi',
  assistanceGuideDog: 'Ci cymorth / ci tywys',
  therapyAnimal: 'Anifail therapi',
  therapyAnimal_subfield: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  supportCourtOther: 'Arall',
  supportCourtOther_subfield: 'Disgrifiwch yr hyn sydd ei angen arnoch',
  supportCourtNoOption: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  errors: {
    ra_supportWorkerCarer_subfield: {
      required: "Rhowch enw'r gweithiwr cymorth neu'r gofalwr y byddwch yn dod efo chi",
    },
    ra_friendFamilyMember_subfield: {
      required: "Rhowch enw ffrind neu aelod o'r teulu byddwch yn dod efo chi",
    },
    ra_therapyAnimal_subfield: {
      required: 'Disgrifiwch pa anifail therapi y byddwch yn dod efo chi',
    },
    ra_supportCourtOther_subfield: {
      required: 'Disgrifiwch pa gefnogaeth sydd angen arnoch i chi ddod efo chi i’r gwrandawiad',
    },
    ra_supportCourt: {
      required: 'Dewiswch pa gefnogaeth rydych angen dod efo chi i’r gwrandawiad',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('applicant personal details > applying-with > content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain specialArrangements field', () => {
    const supportCourtField = fields.ra_supportCourt as FormOptions;
    const supportWorkerCarer_subfields = supportCourtField.values[0].subFields
      ?.ra_supportWorkerCarer_subfield as FormOptions;

    expect(supportCourtField.type).toBe('checkboxes');
    expect(supportWorkerCarer_subfields.type).toBe('textarea');
    expect((supportWorkerCarer_subfields?.label as Function)(generatedContent)).toBe(en.supportWorkerCarer_subfield);

    (supportCourtField.validator as Function)('supportWorkerCarer');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('supportWorkerCarer');

    (supportWorkerCarer_subfields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    const friendFamilyMemberSubFields = supportCourtField.values[1].subFields
      ?.ra_friendFamilyMember_subfield as FormOptions;

    expect(supportCourtField.type).toBe('checkboxes');
    expect(friendFamilyMemberSubFields.type).toBe('textarea');
    expect((friendFamilyMemberSubFields?.label as Function)(generatedContent)).toBe(en.friendFamilyMember_subfield);

    (friendFamilyMemberSubFields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    const therapyAnimal_subfields = supportCourtField.values[3].subFields?.ra_therapyAnimal_subfield as FormOptions;

    expect(therapyAnimal_subfields.type).toBe('textarea');
    expect((therapyAnimal_subfields?.label as Function)(generatedContent)).toBe(en.therapyAnimal_subfield);

    (therapyAnimal_subfields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    const supportCourtOther_subfields = supportCourtField.values[4].subFields
      ?.ra_supportCourtOther_subfield as FormOptions;

    expect(supportCourtOther_subfields.type).toBe('textarea');
    expect((supportCourtOther_subfields?.label as Function)(generatedContent)).toBe(en.supportCourtOther_subfield);

    (supportCourtOther_subfields.validator as Function)('test text area');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text area');

    expect(supportCourtField.type).toBe('checkboxes');
    expect(friendFamilyMemberSubFields.type).toBe('textarea');
    expect((friendFamilyMemberSubFields?.label as Function)(generatedContent)).toBe(en.friendFamilyMember_subfield);

    expect((supportCourtField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((supportCourtField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.supportWorkerCarer);
    expect((supportCourtField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.friendFamilyMember);
    expect((supportCourtField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.assistanceGuideDog);
    expect((supportCourtField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.therapyAnimal);
    expect((supportCourtField.values[4].label as LanguageLookup)(generatedContent)).toBe(en.supportCourtOther);
    expect((supportCourtField.values[6].label as LanguageLookup)(generatedContent)).toBe(en.supportCourtNoOption);

    expect(supportCourtField.values[6].behaviour).toBe('exclusive');
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
