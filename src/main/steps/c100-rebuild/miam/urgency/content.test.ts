import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  caption: 'MIAM exemptions',
  title: 'Urgency',
  content1: 'You need to provide more details, so the court can decide if your application is urgent.',
  content2: 'If your application is urgent, this does not mean that your case will be over sooner.',
  whyIsApplicationUrgent: 'Why is your application urgent?',
  freedomPhysicalSafety: 'There is a risk to your life, freedom or physical safety',
  freedomPhysicalSafetyInFamily: 'There is a risk to your family’s life, freedom or physical safety',
  riskSafetyInHome: "There is a risk to the safety of your home or your family's home",
  riskOfHarmToChildren: 'Any delay caused by attending a MIAM would cause a risk of harm to the children',
  unlawfullyRemovedFromUK:
    'Any delay caused by attending a MIAM would cause a risk that the children will be unlawfully removed from the UK or unlawfully kept overseas',
  riskOfUnfairCourtDecision:
    'Any delay caused by attending a MIAM would cause a significant risk of an unfair court decision (miscarriage of justice)',
  riskUnreasonableFinancialHardship:
    'Any delay caused by attending a MIAM would cause a risk of significant financial hardship',
  riskOfIrretrievableProblems:
    'Any delay caused by attending a MIAM would cause a risk of irretrievable problems, including irretrievable loss of evidence in the case',
  riskOfCourtProceedingsDispute:
    'There is a significant risk of court proceedings related to the dispute starting or taking place in a country other than England or Wales',
  noneOfThese: 'None of these',
  errors: {
    miam_urgency: {
      required: 'Select a reason why your application is urgent',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const cy: typeof en = {
  caption: 'Esemptiadau MIAM',
  title: 'Cais brys',
  content1: 'Mae angen i chi ddarparu mwy o fanylion fel y gall y llys benderfynu os yw eich cais yn un brys.',
  content2: 'Os yw eich cais yn un brys, nid yw hyn yn golygu y bydd eich achos drosodd yn gynt.',
  whyIsApplicationUrgent: 'Pam bod eich cais yn un brys?',
  freedomPhysicalSafety: "Mae perygl i'ch bywyd, rhyddid neu ddiogelwch corfforol",
  freedomPhysicalSafetyInFamily: 'Mae perygl i’ch bywyd teuluol, rhyddid neu ddiogelwch corfforol',
  riskSafetyInHome: 'Mae yna risg i ddiogelwch eich cartref neu gartref eich teulu',
  riskOfHarmToChildren: 'Byddai unrhyw oedi a achosir trwy fynychu MIAM yn achosi risg o niwed i’r plant',
  unlawfullyRemovedFromUK:
    'Byddai unrhyw oedi a achosir trwy fynychu MIAM yn achosi risg y bydd y plant yn cael eu tynnu’n anghyfreithlon o’r DU neu eu cadw dramor yn anghyfreithlon',
  riskOfUnfairCourtDecision:
    'Byddai unrhyw oedi a achosir trwy fynychu MIAM yn achosi risg sylweddol o benderfyniad annheg gan y llys (camweinyddiad cyfiawnder)',
  riskUnreasonableFinancialHardship:
    'Byddai unrhyw oedi a achosir trwy fynychu MIAM yn achosi risg o galedi ariannol sylweddol',
  riskOfIrretrievableProblems:
    'Byddai unrhyw oedi a achosir trwy fynychu MIAM yn achosi risg o broblemau anadferadwy, gan gynnwys colli tystiolaeth yn yr achos',
  riskOfCourtProceedingsDispute:
    "Mae yna risg sylweddol bod achos llys sy'n gysylltiedig â’r anghydfod yn dechrau neu’n digwydd mewn gwlad heblaw Cymru neu Loegr",
  noneOfThese: 'Dim un o’r rhain',
  errors: {
    miam_urgency: {
      required: 'Dewiswch pam bod eich cais yn un brys',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('maim > urgency > content', () => {
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

  test('should contain miam_urgency field', () => {
    const miam_urgency = fields.miam_urgency as FormOptions;
    expect(miam_urgency.type).toBe('radios');

    expect((miam_urgency.values[0].label as LanguageLookup)(generatedContent)).toBe(en.freedomPhysicalSafety);
    expect((miam_urgency.values[1].label as LanguageLookup)(generatedContent)).toBe(en.freedomPhysicalSafetyInFamily);
    expect((miam_urgency.values[2].label as LanguageLookup)(generatedContent)).toBe(en.riskSafetyInHome);
    expect((miam_urgency.values[3].label as LanguageLookup)(generatedContent)).toBe(en.riskOfHarmToChildren);
    expect((miam_urgency.values[4].label as LanguageLookup)(generatedContent)).toBe(en.unlawfullyRemovedFromUK);
    expect((miam_urgency.values[5].label as LanguageLookup)(generatedContent)).toBe(en.riskOfUnfairCourtDecision);
    expect((miam_urgency.values[6].label as LanguageLookup)(generatedContent)).toBe(
      en.riskUnreasonableFinancialHardship
    );
    expect((miam_urgency.values[7].label as LanguageLookup)(generatedContent)).toBe(en.riskOfIrretrievableProblems);
    expect((miam_urgency.values[8].label as LanguageLookup)(generatedContent)).toBe(en.riskOfCourtProceedingsDispute);
    expect((miam_urgency.values[10].label as LanguageLookup)(generatedContent)).toBe(en.noneOfThese);

    (miam_urgency.validator as Function)('riskOfCourtProceedingsDispute');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('riskOfCourtProceedingsDispute');
  });

  test('should contain continue button', () => {
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
