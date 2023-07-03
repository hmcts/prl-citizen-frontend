import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Safety concerns',
  title: 'Have you suffered or are you at risk of suffering domestic violence or abuse?',
  line1: 'Only include abuse by the people in this application or someone connected to them.',
  line2: 'Domestic violence or abuse includes incidents or a pattern of incidents of abusive or violent behaviour.',
  line3: 'This may include:',
  line4: 'controlling, threatening or coercive behaviour',
  line5: 'violence',
  line6: 'abuse',
  line7:
    'The incidents must have taken place between people who are aged 16 or over, who are current (or former) intimate partners or family members.',
  line8: 'Domestic violence or abuse can occur no matter what their gender or sexuality of the people involved.',
  line9: 'Examples include:',
  line10: 'psychological abuse',
  line11: 'financial abuse',
  line12: 'emotional abuse',
  line13: 'physical abuse',
  line14: 'sexual abuse',
  line15:
    'It also includes culturally specific forms of abuse, including forced marriage, honour-based violence and dowry-related abuse.',
  summery1: 'Why do we need this information and what will we do with it?',
  summery2:
    'The court needs to know if any of the other people in this application, or anyone connected to them who has contact with the children, poses a risk to the safety of the children.',
  summery3:
    'If you provide information about this now, it will make it easier for the court and Cafcass to make sure your case is dealt with appropriately at the earliest opportunity. If you do not want to provide details of the abuse at this stage, you will be able to do so when you speak to Cafcass or at a later stage in the court proceedings.',
  summery4:
    'The <a href="https://www.cafcass.gov.uk/" class="govuk-link" rel="external" target="_blank">Children and Family Court Advisory and Support Service (Cafcass)</a>, in England, and <a href="https://www.gov.wales/cafcass-cymru" class="govuk-link" rel="external" target="_blank">Cafcass Cymru</a>, in Wales, protect and promote the interests of children involved in family court cases. An advisor from Cafcass or Cafcass Cymru will look at your answers as part of their safeguarding checks, and may need to ask you further questions.',
  summery5:
    'As part of their enquiries they will contact organisations such as the police and local authorities for any relevant information about you, any other person and the children.',
  summery6:
    'They will submit information to the court before your first hearing. Their assessment helps the judge make a decision that is in the best interests of the children.',
  summery7:
    'The information you provide in this section will also be shared with the respondents so that they have the opportunity to respond to your allegations.',
  one: 'Yes',
  two: 'No',
  saveAndContinue: 'Save and Continue',
};

const cyContent = {
  section: 'Pryderon diogelwch',
  title: 'Have you suffered or are you at risk of suffering domestic violence or abuse? -welsh',
  line1: 'Only include abuse by the people in this application or someone connected to them. -welsh',
  line2:
    'Domestic violence or abuse includes incidents or a pattern of incidents of abusive or violent behaviour. -welsh',
  line3: 'This may include: -welsh',
  line4: 'controlling, threatening or coercive behaviour -welsh',
  line5: 'violence -welsh',
  line6: 'abuse -welsh',
  line7:
    'The incidents must have taken place between people who are aged 16 or over, who are current (or former) intimate partners or family members. -welsh',
  line8: 'Domestic violence or abuse can occur no matter what their gender or sexuality of the people involved. -welsh',
  line9: 'Examples include: -welsh',
  line10: 'cam-drin seicolegol',
  line11: 'cam-drin ariannol',
  line12: 'cam-drin emosiynol',
  line13: 'cam-drin corfforol',
  line14: 'cam-drin rhywiol',
  line15:
    'It also includes culturally specific forms of abuse, including forced marriage, honour-based violence and dowry-related abuse. -welsh',
  summery1: 'Why do we need this information and what will we do with it? -welsh',
  summery2:
    'The court needs to know if any of the other people in this application, or anyone connected to them who has contact with the children, poses a risk to the safety of the children. -welsh',
  summery3:
    'If you provide information about this now, it will make it easier for the court and Cafcass to make sure your case is dealt with appropriately at the earliest opportunity. If you do not want to provide details of the abuse at this stage, you will be able to do so when you speak to Cafcass or at a later stage in the court proceedings. -welsh',
  summery4:
    'The <a href="https://www.cafcass.gov.uk/" class="govuk-link" rel="external" target="_blank">Children and Family Court Advisory and Support Service (Cafcass)</a>, in England, and <a href="https://www.gov.wales/cafcass-cymru" class="govuk-link" rel="external" target="_blank">Cafcass Cymru</a>, in Wales, protect and promote the interests of children involved in family court cases. An advisor from Cafcass or Cafcass Cymru will look at your answers as part of their safeguarding checks, and may need to ask you further questions. -welsh',
  summery5:
    'As part of their enquiries they will contact organisations such as the police and local authorities for any relevant information about you, any other person and the children. -welsh',
  summery6:
    'They will submit information to the court before your first hearing. Their assessment helps the judge make a decision that is in the best interests of the children. -welsh',
  summery7:
    'The information you provide in this section will also be shared with the respondents so that they have the opportunity to respond to your allegations. -welsh',
  one: 'Yes -welsh',
  two: 'No -welsh',
  saveAndContinue: 'Save and Continue -welsh',
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('doemstic_abuse_risk content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual(
      'Have you suffered or are you at risk of suffering domestic violence or abuse?'
    );
    expect(generatedContent.section).toEqual('Safety concerns');
    expect(generatedContent.line1).toEqual(
      'Only include abuse by the people in this application or someone connected to them.'
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain detailsKnown field', () => {
    const safetyConcerns = fields.safetyConcerns as FormOptions;
    expect(safetyConcerns.type).toBe('radios');
    expect(safetyConcerns.classes).toBe('govuk-radios');
    expect((safetyConcerns.section as Function)(generatedContent)).toBe(enContent.section);
    expect((safetyConcerns.values[0].label as LanguageLookup)(generatedContent)).toBe(enContent.one);
    expect((safetyConcerns.values[1].label as LanguageLookup)(generatedContent)).toBe(enContent.two);
  });

  test('should onlyContinue continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Save and Continue');
  });
});
