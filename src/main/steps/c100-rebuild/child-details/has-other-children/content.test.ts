import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  title: 'Do you or any respondents have other children who are not part of this application?',
  one: YesOrNo.YES,
  two: YesOrNo.NO,
  errors: {
    ocd_hasOtherChildren: {
      required: 'Select yes if you have other children',
    },
  },
  needInfoTitle: 'Why do we need this information and what will we do with it?',
  riskToChildrenInfo:
    'The court needs to know if any of the other people in this application, or anyone connected to them who has contact with the children, poses a risk to the safety of the children.',
  abuseRiskInfo:
    'If you provide information about this now, it will make it easier for the court and Cafcass to make sure your case is dealt with appropriately at the earliest opportunity. If you do not want to provide details of the abuse at this stage, you will be able to do so when you speak to Cafcass or at a later stage in the court proceedings.',
  cafcassLinksInfo:
    'The <a href="https://www.cafcass.gov.uk/" class="govuk-link" rel="external" target="_blank">Children and Family Court Advisory and Support Service (Cafcass)</a>, in England, and <a href="https://cafcass.gov.wales/" class="govuk-link" rel="external" target="_blank">Cafcass Cymru</a>, in Wales, protect and promote the interests of children involved in family court cases. An advisor from Cafcass or Cafcass Cymru will look at your answers as part of their safeguarding checks, and may need to ask you further questions.',
  enquiryContactInfo:
    'As part of their enquiries they will contact organisations such as the police and local authorities for any relevant information about you, any other person and the children.',
  hearingSumissionInfo:
    'They will submit information to the court before your first hearing. Their assessment helps the judge make a decision that is in the best interests of the children.',
  sharedRespondentinfo:
    'The information you provide in this section will also be shared with the respondents so that they have the opportunity to respond to your allegations.',
};

const cy = {
  title: 'Do you or any respondents have other children who are not part of this application?',
  one: YesOrNo.YES,
  two: YesOrNo.NO,
  errors: {
    ocd_hasOtherChildren: {
      required: 'Select yes if you have other children',
    },
  },
  needInfoTitle: 'Why do we need this information and what will we do with it?',
  riskToChildrenInfo:
    'The court needs to know if any of the other people in this application, or anyone connected to them who has contact with the children, poses a risk to the safety of the children.',
  abuseRiskInfo:
    'If you provide information about this now, it will make it easier for the court and Cafcass to make sure your case is dealt with appropriately at the earliest opportunity. If you do not want to provide details of the abuse at this stage, you will be able to do so when you speak to Cafcass or at a later stage in the court proceedings.',
  cafcassLinksInfo:
    'The <a href="https://www.cafcass.gov.uk/" class="govuk-link" rel="external" target="_blank">Children and Family Court Advisory and Support Service (Cafcass)</a>, in England, and <a href="https://cafcass.gov.wales/" class="govuk-link" rel="external" target="_blank">Cafcass Cymru</a>, in Wales, protect and promote the interests of children involved in family court cases. An advisor from Cafcass or Cafcass Cymru will look at your answers as part of their safeguarding checks, and may need to ask you further questions.',
  enquiryContactInfo:
    'As part of their enquiries they will contact organisations such as the police and local authorities for any relevant information about you, any other person and the children.',
  hearingSumissionInfo:
    'They will submit information to the court before your first hearing. Their assessment helps the judge make a decision that is in the best interests of the children.',
  sharedRespondentinfo:
    'The information you provide in this section will also be shared with the respondents so that they have the opportunity to respond to your allegations.',
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent) as Record<string, never>;
    form = generatedContent.form as FormContent | undefined;
    fields = form.fields as FormFields;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain detailsKnown field', () => {
    const ocd_otherChildren = fields.ocd_hasOtherChildren as FormOptions;
    expect(ocd_otherChildren.type).toBe('radios');
    expect(ocd_otherChildren.classes).toBe('govuk-radios');
    expect((ocd_otherChildren.values[0].label as LanguageLookup)(generatedContent)).toBe(YesOrNo.YES);
    expect((ocd_otherChildren.values[1].label as LanguageLookup)(generatedContent)).toBe(YesOrNo.NO);
  });

  test('should contain continue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
