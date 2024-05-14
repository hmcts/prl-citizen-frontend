import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { Validator, isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { generateContent } from '../../miam/child-protection/content';

jest.mock('../../../../app/form/validation');

const en = {
  section: 'MIAM exemptions',
  title: 'Child protection concerns',
  needMoreDetails1: 'You need to give the court more information about your concerns.',
  subTitle: 'Which child protection concern applies?',
  localAuthority:
    'The children in the application (or another child in the household) are the subject of a child protection plan put in place by the local authority',
  childProtectionPlan:
    'The children in the application (or another child in the household) is the subject of enquiries by a local authority under section 47 of the Children Act 1989 Act',
  childProtectionPlanHint:
    'This may mean that a local authority is carrying out enquiries because of concerns the children are suffering or might suffer significant harm.',
  none: 'None of these',
  errors: {
    miam_childProtectionEvidence: {
      required: 'Select what evidence you have of child protection concerns.',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const cy = {
  section: 'Esemptiadau MIAM',
  title: 'Pryderon amddiffyn plant',
  needMoreDetails1: 'Mae angen i chi roi mwy o wybodaeth am eich pryderon i’r llys.',
  subTitle: 'Pa bryder amddiffyn plant sy’n berthnasol?',
  localAuthority:
    'Mae’r plant yn y cais (neu blentyn arall ar yr aelwyd) yn destun cynllun amddiffyn plant a roddwyd ar waith gan yr awdurdod lleol',
  childProtectionPlan:
    'Mae’r plant yn y cais (neu blentyn arall ar yr aelwyd) yn destun ymholiadau gan awdurdod lleol o dan adran 47 Deddf Plant 1989',
  childProtectionPlanHint:
    'Fe allai hynny olygu bod awdurdod lleol yn cynnal ymholiadau oherwydd pryderon fod y plant yn dioddef neu y gallant ddioddef niwed sylweddol.',
  none: 'Dim un o’r rhain',
  errors: {
    miam_childProtectionEvidence: {
      required: 'Dewiswch pa dystiolaeth sydd gennych o bryderon amddiffyn plant.',
    },
  },
};

describe('miam child protection', () => {
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

  test('should contain miam child protection involved fields', () => {
    const miam_domesticabuse_involvement_field = fields.miam_childProtectionEvidence as FormOptions;
    expect(miam_domesticabuse_involvement_field.type).toBe('radios');
    expect((miam_domesticabuse_involvement_field.values[0].label as LanguageLookup)(generatedContent)).toBe(
      en.localAuthority
    );
    expect((miam_domesticabuse_involvement_field.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.childProtectionPlan
    );
    expect((miam_domesticabuse_involvement_field.values[1].hint as LanguageLookup)(generatedContent)).toBe(
      en.childProtectionPlanHint
    );
    expect((miam_domesticabuse_involvement_field.values[3].label as LanguageLookup)(generatedContent)).toBe(en.none);

    (miam_domesticabuse_involvement_field.validator as Validator)('localAuthority');
    expect(isFieldFilledIn).toHaveBeenCalledWith('localAuthority');
  });

  test('should contain Continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain SaveAndComeLater button', () => {
    expect(
      (form.saveAndComeLater.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
