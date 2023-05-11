import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
  headingTitle: 'Provide details of court cases you or the children have been involved in',
  select_all_apply:
    'Select all that apply to you or the children. If you have specific details, you will be able to provide that information shortly.',
  childArrangementOrder: 'A Child Arrangements Order',
  section8Hint: 'Section 8 Children Act 1989',
  schedule1Hint: 'Schedule 1 Children Act 1989',
  emergencyProtectionOrder: 'Emergency Protection Order',
  supervisionOrder: 'Supervision Order',
  careOrder: 'Care Order',
  childAbduction: 'Child Abduction',
  contactOrderForDivorce:
    'A contact or residence order made within proceedings for a divorce or dissolution of civil partnership',
  contactOrderForAdoption: 'A contact or residence order made in connection with an Adoption Order',
  childMaintenanceOrder: 'An order relating to child maintenance',
  financialOrder: 'Financial Order under Schedule 1 of the Children Act 1989',
  nonMolestationOrder: 'Non-molestation Order',
  occupationOrder: 'Occupation Order',
  forcedMarriageProtectionOrder: 'Forced Marriage Protection Order',
  restrainingOrder: 'Restraining order',
  otherInjuctionOrder: 'Other injunction order',
  undertakingOrder: 'Undertaking in place of an order',
  otherOrder: 'Other orders',
  errors: {
    courtProceedingsOrders: {
      required: 'Specify which court cases you or the children have been involved in',
    },
  },
};

const cy = {
  headingTitle: "Darparwch fanylion am achosion llys rydych chi neu'r plant wedi bod yn rhan ohonynt",
  select_all_apply:
    "Dewiswch bob un sy'n berthnasol i chi neu'r plant. Os oes gennych fanylion penodol, byddwch yn gallu darparu'r wybodaeth honno yn fuan.",
  childArrangementOrder: 'Gorchymyn Trefniadau Plant',
  section8Hint: 'Adran 8 Deddf Plant 1989',
  schedule1Hint: 'Schedule 1 Children Act 1989 - welsh',
  emergencyProtectionOrder: 'Gorchymyn Diogelu Brys',
  supervisionOrder: 'Gorchymyn Goruchwylio',
  careOrder: 'Gorchymyn Gofal',
  childAbduction: 'Herwgydio Plant',
  contactOrderForDivorce:
    'Gorchymyn cyswllt neu orchymyn preswyl a wneir o fewn achosion ysgariad neu ddiddymu partneriaeth sifil',
  contactOrderForAdoption: 'Gorchymyn cyswllt neu orchymyn preswyl a wnaed mewn cysylltiad â Gorchymyn Mabwysiadu',
  childMaintenanceOrder: 'Gorchymyn yn ymwneud â chynnal plant',
  financialOrder: 'Gorchymyn Ariannol o dan Atodlen 1 Deddf Plant 1989',
  nonMolestationOrder: 'Gorchymyn Rhag Molestu',
  occupationOrder: 'Gorchymyn Anheddu',
  forcedMarriageProtectionOrder: 'Gorchymyn Amddiffyn rhag Priodas dan Orfod',
  restrainingOrder: 'Restraining order - welsh',
  otherInjuctionOrder: 'Gorchymyn Gwaharddeb Arall',
  undertakingOrder: 'Ymgymeriad yn lle gorchymyn',
  otherOrder: 'Gorchmynion eraill',
  errors: {
    courtProceedingsOrders: {
      required: 'Specify which court cases you or the children have been involved in - welsh',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types */
describe('proceeding details screen', () => {
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

  test('should contain courtProceedingsOrders field', () => {
    const courtProceedingsOrderField = fields.courtProceedingsOrders as FormOptions;
    expect(courtProceedingsOrderField.type).toBe('checkboxes');

    expect((courtProceedingsOrderField.hint as LanguageLookup)(generatedContent)).toBe(en.select_all_apply);
    expect((courtProceedingsOrderField.values[0].label as LanguageLookup)(generatedContent)).toBe(
      en.childArrangementOrder
    );
    expect((courtProceedingsOrderField.values[0].hint as LanguageLookup)(generatedContent)).toBe(en.section8Hint);
    expect((courtProceedingsOrderField.values[1].label as LanguageLookup)(generatedContent)).toBe(
      en.emergencyProtectionOrder
    );
    expect((courtProceedingsOrderField.values[2].label as LanguageLookup)(generatedContent)).toBe(en.supervisionOrder);
    expect((courtProceedingsOrderField.values[3].label as LanguageLookup)(generatedContent)).toBe(en.careOrder);
    expect((courtProceedingsOrderField.values[4].label as LanguageLookup)(generatedContent)).toBe(en.childAbduction);
    expect((courtProceedingsOrderField.values[5].label as LanguageLookup)(generatedContent)).toBe(
      en.contactOrderForDivorce
    );
    expect((courtProceedingsOrderField.values[6].label as LanguageLookup)(generatedContent)).toBe(
      en.contactOrderForAdoption
    );
    expect((courtProceedingsOrderField.values[7].label as LanguageLookup)(generatedContent)).toBe(
      en.childMaintenanceOrder
    );
    expect((courtProceedingsOrderField.values[5].hint as LanguageLookup)(generatedContent)).toBe(en.section8Hint);
    expect((courtProceedingsOrderField.values[6].hint as LanguageLookup)(generatedContent)).toBe(en.section8Hint);
    expect((courtProceedingsOrderField.values[7].hint as LanguageLookup)(generatedContent)).toBe(en.schedule1Hint);
    expect((courtProceedingsOrderField.values[8].label as LanguageLookup)(generatedContent)).toBe(en.financialOrder);
    expect((courtProceedingsOrderField.values[9].label as LanguageLookup)(generatedContent)).toBe(
      en.nonMolestationOrder
    );
    expect((courtProceedingsOrderField.values[10].label as LanguageLookup)(generatedContent)).toBe(en.occupationOrder);
    expect((courtProceedingsOrderField.values[11].label as LanguageLookup)(generatedContent)).toBe(
      en.forcedMarriageProtectionOrder
    );
    expect((courtProceedingsOrderField.values[12].label as LanguageLookup)(generatedContent)).toBe(en.restrainingOrder);
    expect((courtProceedingsOrderField.values[13].label as LanguageLookup)(generatedContent)).toBe(
      en.otherInjuctionOrder
    );
    expect((courtProceedingsOrderField.values[14].label as LanguageLookup)(generatedContent)).toBe(en.undertakingOrder);
    expect((courtProceedingsOrderField.values[15].label as LanguageLookup)(generatedContent)).toBe(en.otherOrder);

    (courtProceedingsOrderField.validator as Function)('childMaintenanceOrder');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('childMaintenanceOrder');
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
