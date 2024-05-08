/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { Validator, atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { CommonContent, en as enContent, generatePageContent } from '../../../../common/common.content';
import { languages as commonLanguages } from '../content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  caption: 'MIAM exemptions',
  title: 'Evidence of domestic abuse',
  selectTheEvidence:
    'Select the evidence you have to support your claim. If you are unable to provide evidence, you will be able to explain why later.',
  needToGiveEvidence: 'You need to give the court evidence of why you cannot attend a MIAM.',
  detailsPara:
    "A 'party' is someone named in this application. It could refer to you, or the other people in the application (the ‘respondents’).",
  whatEvidence: 'What evidence of domestic abuse do you have?',
  selectAllEvidence: 'Select all evidence that applies',
  selectAllLetters: 'Select all letters that you have',
  policeInvolvement_hint:
    'Select all evidence you have to support your claim. If you are unable to provide evidence, you will be able to explain why later.',
  courtInvolvement_hint:
    'A court has made an order against a party in the application (or someone close to you or them) in connection to domestic abuse',
  letterFromAuthority_hint:
    'For example, if a local authority or housing association has confirmed there is or has been a risk of domestic abuse.',
  letterFromSupportService_hint:
    'This could be an independent domestic violence advisor (IDVA) confirming support to you or another party to the application',
  financialAbuse_hint:
    'For example, preventing someone going to work, withholding money, or putting debts in someone else’s name. Evidence could include a copy of a credit card account, loan document or bank statements.',
  noneOfOptions: 'None of the above',
  errors: {
    miam_domesticAbuse: {
      required: 'Select the evidence you have of domestic abuse',
    },
    miam_domesticAbuse_policeInvolvement_subfields: {
      required: 'Select evidence of how the police have been involved',
    },
    miam_domesticAbuse_courtInvolvement_subfields: {
      required: 'Select evidence of how the court has already been involved',
    },
    miam_domesticAbuse_letterOfBeingVictim_subfields: {
      required:
        'Select what letters you have confirming that you or someone who is a party to the application are (or have been) a victim of domestic abuse',
    },
    miam_domesticAbuse_letterFromAuthority_subfields: {
      required: 'Select what letters you have from a local authority or other agency confirming a risk of harm',
    },
    miam_domesticAbuse_letterFromSupportService_subfields: {
      required:
        'Select what letters you have from a domestic violence or abuse support service, specialist or organisation',
    },
  },
};

const cy = {
  caption: 'Esemptiadau MIAM',
  title: 'Tystiolaeth o gam-drin domestig',
  selectTheEvidence:
    'Dewiswch y dystiolaeth sydd gennych i gefnogi eich hawliad. Os na allwch ddarparu tystiolaeth, byddwch yn gallu egluro pam yn hwyrach ymlaen.',
  needToGiveEvidence: 'Mae angen i chi roi tystiolaeth i’r llys pam na allwch fynychu MIAM.',
  detailsPara:
    '‘Parti’ yw rhywun sy’n cael ei enwi yn y cais hwn. Gall gyfeirio atoch chi, neu’r bobl eraill yn y cais (yr ‘atebwyr’).',
  whatEvidence: 'Pa dystiolaeth o gam-drin domestig sydd gennych chi?',
  selectAllEvidence: 'Dewiswch bob tystiolaeth sy’n berthnasol',
  policeInvolvement_hint:
    'Dewiswch yr holl dystiolaeth sydd gennych i gefnogi eich hawliad. Os na allwch ddarparu tystiolaeth, byddwch yn gallu egluro pam yn hwyrach ymlaen.',
  courtInvolvement_hint:
    'Mae’r llys wedi gwneud gorchymyn yn erbyn parti yn y cais (neu rywun sy’n agos atoch chi, neu nhw) mewn cysylltiad â cham-drin domestig.',
  letterFromAuthority_hint:
    'Er enghraifft, os yw awdurdod lleol neu gymdeithas dai wedi cadarnhau bod yna risg o gam-drin domestig neu fod risg o gamdriniaeth ddomestig wedi bod yn y gorffennol.',
  letterFromSupportService_hint:
    'Gallai hyn fod yn gynghorydd trais domestig annibynnol (IDVA) yn cadarnhau cymorth i chi neu barti arall i’r cais',
  financialAbuse_hint:
    'Er enghraifft, atal rhywun rhag mynd i’r gwaith, cadw arian oddi wrthynt, neu fynd i ddyled yn enw rhywun arall. Gallai tystiolaeth gynnwys copi o gyfrif cerdyn credyd, dogfen fenthyciadau neu gyfriflenni banc.',
  noneOfOptions: 'Dim un o’r rhain',
  errors: {
    miam_domesticAbuse: {
      required: "Dewiswch pa un o'r dystiolaeth ganlynol o gam-drin domestig neu drais sydd gennych",
    },
    miam_domesticAbuse_policeInvolvement_subfields: {
      required: 'Dewiswch pa dystiolaeth sydd gennych fod yr heddlu wedi bod ynghlwm â hyn',
    },
    miam_domesticAbuse_courtInvolvement_subfields: {
      required: 'Dewiswch pa dystiolaeth sydd gennych fod y llys wedi bod ynghlwm â hyn',
    },
    miam_domesticAbuse_letterOfBeingVictim_subfields: {
      required:
        "Dewiswch pa lythyr sydd gennych sy'n cadarnhau eich bod chi neu'r bobl eraill yn y cais (neu bobl sydd wedi bod yn rhan o’r cais) yn ddioddefwr trais domestig neu gamdriniaeth",
    },
    miam_domesticAbuse_letterFromAuthority_subfields: {
      required: 'Dewiswch pa lythyr gan awdurdod lleol neu asiantaeth arall yn cadarnhau risg o niwed sydd gennych',
    },
    miam_domesticAbuse_letterFromSupportService_subfields: {
      required:
        'Dewiswch pa lythyr gan wasanaeth cymorth trais domestig neu gamdriniaeth, arbenigwr neu sefydliad sydd gennych',
    },
  },
};

describe('C100-rebuild > MIAM >  domestic-abuse > domestic-abuse', () => {
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

  test('should contain miam domesticabuse involvement field', () => {
    const miam_domesticabuse_involvement_field = fields?.miam_domesticAbuse as FormOptions;
    const subFields0 = miam_domesticabuse_involvement_field.values[0].subFields
      ?.miam_domesticAbuse_policeInvolvement_subfields as FormOptions;
    const subFields1 = miam_domesticabuse_involvement_field.values[1].subFields
      ?.miam_domesticAbuse_courtInvolvement_subfields as FormOptions;
    const subFields2 = miam_domesticabuse_involvement_field.values[2].subFields
      ?.miam_domesticAbuse_letterOfBeingVictim_subfields as FormOptions;
    const subFields3 = miam_domesticabuse_involvement_field.values[3].subFields
      ?.miam_domesticAbuse_letterFromAuthority_subfields as FormOptions;
    const subFields4 = miam_domesticabuse_involvement_field.values[4].subFields
      ?.miam_domesticAbuse_letterFromSupportService_subfields as FormOptions;
    expect(miam_domesticabuse_involvement_field.type).toBe('checkboxes');

    expect((miam_domesticabuse_involvement_field.label as LanguageLookup)(generatedContent)).toBe(en.whatEvidence);
    expect((miam_domesticabuse_involvement_field.hint as LanguageLookup)(generatedContent)).toBe(en.selectTheEvidence);
    expect((miam_domesticabuse_involvement_field.values[0].hint as LanguageLookup)(generatedContent)).toBe(
      en.policeInvolvement_hint
    );
    expect((miam_domesticabuse_involvement_field.values[0].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.policeInvolvement
    );
    expect((subFields0.hint as LanguageLookup)(generatedContent)).toBe(
      `<p class="govuk-body">${en.selectAllEvidence}</p>`
    );
    expect((subFields0.values[0].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.policeInvolvement_subFields['evidenceOfSomeoneArrest']
    );
    expect((subFields0.values[1].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.policeInvolvement_subFields['evidenceOfPolice']
    );
    expect((subFields0.values[2].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.policeInvolvement_subFields['evidenceOfOnGoingCriminalProceeding']
    );
    expect((subFields0.values[3].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.policeInvolvement_subFields['evidenceOfConviction']
    );
    expect((subFields0.values[4].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.policeInvolvement_subFields['evidenceOfSection24Notice']
    );
    expect((subFields0.values[5].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.policeInvolvement_subFields['evidenceOfSection22Notice']
    );
    expect(subFields0.type).toBe('checkboxes');
    expect(miam_domesticabuse_involvement_field.values[0].value).toBe('policeInvolvement');

    expect((miam_domesticabuse_involvement_field.values[1].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.courtInvolvement
    );
    expect((miam_domesticabuse_involvement_field.values[1].hint as LanguageLookup)(generatedContent)).toBe(
      en.courtInvolvement_hint
    );
    expect(miam_domesticabuse_involvement_field.values[1].value).toBe('courtInvolvement');
    expect((subFields1.hint as LanguageLookup)(generatedContent)).toBe(
      `<p class="govuk-body">${en.selectAllEvidence}</p>`
    );
    expect((subFields1.values[0].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.courtInvolvement_subFields['boundedByCourtAction']
    );
    expect((subFields1.values[1].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.courtInvolvement_subFields['protectionInjuction']
    );
    expect((subFields1.values[1].hint as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.courtInvolvement_subFields['protectionInjuctionHint']
    );
    expect((subFields1.values[2].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.courtInvolvement_subFields['undertaking']
    );
    expect((subFields1.values[2].hint as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.courtInvolvement_subFields['undertakingHint']
    );
    expect((subFields1.values[3].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.courtInvolvement_subFields['ukDomesticViolence']
    );
    expect((subFields1.values[4].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.courtInvolvement_subFields['ukPotentialVictim']
    );

    expect((miam_domesticabuse_involvement_field.values[2].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterOfBeingVictim
    );
    expect(miam_domesticabuse_involvement_field.values[2].value).toBe('letterOfBeingVictim');
    expect((subFields2.hint as LanguageLookup)(generatedContent)).toBe(
      `<p class="govuk-body">${en.selectAllLetters}</p>`
    );
    expect((subFields2.values[0].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterOfBeingVictim_subFields['letterFromHealthProfessional']
    );
    expect((subFields2.values[0].hint as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterOfBeingVictim_subFields['letterFromHealthProfessionalHint']
    );
    expect((subFields2.values[1].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterOfBeingVictim_subFields['referralLetterFromHealthProfessional']
    );
    expect((subFields2.values[1].hint as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterOfBeingVictim_subFields['referralLetterFromHealthProfessionalHint']
    );

    expect((miam_domesticabuse_involvement_field.values[3].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterFromAuthority
    );
    expect((miam_domesticabuse_involvement_field.values[3].hint as LanguageLookup)(generatedContent)).toBe(
      en.letterFromAuthority_hint
    );
    expect(miam_domesticabuse_involvement_field.values[3].value).toBe('letterFromAuthority');
    expect((subFields3.hint as LanguageLookup)(generatedContent)).toBe(
      `<p class="govuk-body">${en.selectAllLetters}</p>`
    );
    expect((subFields3.values[0].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterFromAuthority_subFields['letterFromMultiAgencyMember']
    );
    expect((subFields3.values[1].hint as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterFromAuthority_subFields['letterFromOfficer_hint']
    );
    expect((subFields3.values[1].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterFromAuthority_subFields['letterFromOfficer']
    );
    expect((subFields3.values[2].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterFromAuthority_subFields['letterFromPublicAuthority']
    );
    expect((subFields3.values[2].hint as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterFromAuthority_subFields['letterFromPublicAuthorityHint']
    );

    expect((miam_domesticabuse_involvement_field.values[4].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterFromSupportService
    );
    expect((miam_domesticabuse_involvement_field.values[4].hint as LanguageLookup)(generatedContent)).toBe(
      en.letterFromSupportService_hint
    );
    expect(miam_domesticabuse_involvement_field.values[4].value).toBe('letterFromSupportService');
    expect((subFields4.hint as LanguageLookup)(generatedContent)).toBe(
      `<p class="govuk-body">${en.selectAllLetters}</p>`
    );
    expect((subFields4.values[0].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterFromSupportService_subFields['letterFromDomesticViolenceAdvisor']
    );
    expect((subFields4.values[1].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterFromSupportService_subFields['letterFromSexualViolenceAdvisor']
    );
    expect((subFields4.values[2].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterFromSupportService_subFields['letterFromOrgDomesticViolenceSupport']
    );
    expect((subFields4.values[2].hint as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterFromSupportService_subFields['letterFromOrgDomesticViolenceSupportHint']
    );
    expect((subFields4.values[3].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterFromSupportService_subFields['letterFromOrgDomesticViolenceInUk']
    );
    expect((subFields4.values[3].hint as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.letterFromSupportService_subFields['letterFromOrgDomesticViolenceInUkHint']
    );

    expect((miam_domesticabuse_involvement_field.values[5].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.ILRDuetoDomesticAbuse
    );
    expect(miam_domesticabuse_involvement_field.values[5].value).toBe('ILRDuetoDomesticAbuse');

    expect((miam_domesticabuse_involvement_field.values[6].label as LanguageLookup)(generatedContent)).toBe(
      commonLanguages.en.financialAbuse
    );
    expect((miam_domesticabuse_involvement_field.values[6].hint as LanguageLookup)(generatedContent)).toBe(
      en.financialAbuse_hint
    );
    expect(miam_domesticabuse_involvement_field.values[6].value).toBe('financialAbuse');

    expect((miam_domesticabuse_involvement_field.values[7].divider as Function)(enContent)).toBe('or');

    expect((miam_domesticabuse_involvement_field.values[8].label as LanguageLookup)(generatedContent)).toBe(
      en.noneOfOptions
    );
    expect(miam_domesticabuse_involvement_field.values[8].behaviour).toBe('exclusive');

    (miam_domesticabuse_involvement_field.validator as Validator)('courtInvolvement');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('courtInvolvement');

    (subFields0.validator as Validator)('evidenceOfSomeoneArrest');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('evidenceOfSomeoneArrest');

    (subFields1.validator as Validator)('boundedByCourtAction');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('boundedByCourtAction');

    (subFields2.validator as Validator)('letterFromHealthProfessional');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('letterFromHealthProfessional');

    (subFields3.validator as Validator)('letterFromMultiAgencyMember');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('letterFromMultiAgencyMember');

    (subFields4.validator as Validator)('letterFromDomesticViolenceAdvisor');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('letterFromDomesticViolenceAdvisor');
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain SaveAndComeLater button', () => {
    expect(
      (form.saveAndComeLater.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
