import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

const en = {
  serviceName: 'Child arrangements',
  title: 'Safety concerns',
  caption:
    'The court needs to know about any violent or abusive behaviour that puts you or the children at risk of harm.',
  behaviourHeader: 'Abusive behaviour',
  abusiveBehaviours: [
    'The court needs to know about any violent or abusive behaviour by the other people in this application.',
    'This could be abuse that occured in the past, or abuse that is happening now.',
    'Abuse is when someone causes you or the children harm or distress.',
    "Harm to a child means ill treatment or damage to the child's health and development. This could include, for example, damage suffered from seeing or hearing the ill treatment of another person.",
  ],
  abuseCouldBe: 'Abuse could be:',
  abuseList: [
    'physical or sexual',
    'psychological',
    'emotional',
    'violent or threatening behaviour',
    'controlling or coercive behaviour',
    'economic, meaning that they limit your ability to acquire, use or maintain money or other property, or acquire goods or services.',
  ],
  otherFormsLine: 'It could also take other forms, such as abducting the children.',
  abusiveGuidance: 'If you are not sure if their behaviour is abusive, see the guidance on',
  andSignsOf: 'and the signs of ',
  typesOfAbusiveBehaviour:
    '<a href="https://supportnav.org.uk/what-is-domestic-abuse" class="govuk-link" target="_blank" aria-label="types of abusive behaviour">types of abusive behaviour</a>',
  childAbuse:
    '<a href="https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/" class="govuk-link" target="_blank" aria-label="child abuse.">child abuse.</a>',
  infoUsedByCourtHeader: 'How the court will use this information',
  infoList: [
    'The court needs to know about this behaviour, to make sure that any orders are in the best interests of you and the children.',
    'The court will use the information you provide to handle your case correctly.',
  ],
  warningText: {
    text: 'The information that you give in this section will also be shared with the other people in this application, so they are able to respond to what you have said.',
    iconFallbackText: 'Warning',
  },
  notReadyDescAbuseHeader: "If you don't feel ready to describe the abuse at this stage",
  cafcassLine1: "If you don't feel ready to talk about the abuse right now, you can do so when you speak to",
  cafcass: '<a href="https://www.cafcass.gov.uk/" class="govuk-link" target="_blank" aria-label="Cafcass">Cafcass</a>',
  cafcassCymru:
    '<a href="https://gov.wales/cafcass-cymru" class="govuk-link" target="_blank" aria-label="Cafcass Cymru">Cafcass Cymru</a>',
  cafcassLine2: 'It will not harm your application if you give details of the abuse later in the process.',
  cafcassSupportHeader: 'How Cafcass can support you in your case',
  cafcassSupportLines: [
    'The <a href="https://www.cafcass.gov.uk/" class="govuk-link" target="_blank" aria-label="Children and Family Court Advisory and Support Service (Cafcass)">Children and Family Court Advisory and Support Service (Cafcass)</a>, in England, and <a href="https://gov.wales/cafcass-cymru" class="govuk-link" target="_blank" aria-label="Cafcass Cymru">Cafcass Cymru</a>,  in Wales, protect and promote the interests of children involved in family court cases. An advisor from Cafcass or Cafcass Cymru will look at your answers as part of their safeguarding checks, and may need to ask you further questions.',
    'As part of their enquiries they will contact organisations such as the police and local authorities for any relevant information about you, any other person and the children.',
    'They will submit information to the court before your first hearing. Their assessment helps the judge make a decision that is in the best interests of the children',
  ],
  bottomLines: [
    'We will now ask you some questions about the abusive behaviour.',
    'Take your time filling in the information and write as much as you feel able to.',
  ],
};

const cy = {
  serviceName: 'Child arrangements - welsh',
  title: 'Safety concerns - welsh',
  caption:
    'The court needs to know about any violent or abusive behaviour that puts you or the children at risk of harm. - welsh',
  behaviourHeader: 'Abusive behaviour',
  abusiveBehaviours: [
    'The court needs to know about any violent or abusive behaviour by the other people in this application. - welsh',
    'This could be abuse that occured in the past, or abuse that is happening now. - welsh',
    'Abuse is when someone causes you or the children harm or distress. - welsh',
    "Harm to a child means ill treatment or damage to the child's health and development. This could include, for example, damage suffered from seeing or hearing the ill treatment of another person. - welsh",
  ],
  abuseCouldBe: 'Abuse could be: - welsh',
  abuseList: [
    'physical or sexual - welsh',
    'psychological - welsh',
    'emotional - welsh',
    'violent or threatening behaviour - welsh',
    'controlling or coercive behaviour - welsh',
    'economic, meaning that they limit your ability to acquire, use or maintain money or other property, or acquire goods or services. - welsh',
  ],
  otherFormsLine: 'It could also take other forms, such as abducting the children. - welsh',
  abusiveGuidance: 'If you are not sure if their behaviour is abusive, see the guidance on - welsh',
  andSignsOf: 'and the signs of - welsh',
  typesOfAbusiveBehaviour:
    '<a href="https://supportnav.org.uk/what-is-domestic-abuse" class="govuk-link" target="_blank" aria-label="types of abusive behaviour - welsh">types of abusive behaviour - welsh</a>',
  childAbuse:
    '<a href="https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/" class="govuk-link" target="_blank" aria-label="child abuse. - welsh">child abuse. - welsh</a>',
  infoUsedByCourtHeader: 'How the court will use this information - welsh',
  infoList: [
    'The court needs to know about this behaviour, to make sure that any orders are in the best interests of you and the children. - welsh',
    'The court will use the information you provide to handle your case correctly. - welsh',
  ],
  warningText: {
    text: 'The information that you give in this section will also be shared with the other people in this application, so they are able to respond to what you have said. - welsh',
    iconFallbackText: 'Warning - welsh',
  },
  notReadyDescAbuseHeader: "If you don't feel ready to describe the abuse at this stage - welsh",
  cafcassLine1: "If you don't feel ready to talk about the abuse right now, you can do so when you speak to - welsh",
  cafcass: '<a href="https://www.cafcass.gov.uk/" class="govuk-link" target="_blank" aria-label="Cafcass">Cafcass</a>',
  cafcassCymru:
    '<a href="https://gov.wales/cafcass-cymru" class="govuk-link" target="_blank" aria-label="Cafcass Cymru">Cafcass Cymru</a>',
  cafcassLine2: 'It will not harm your application if you give details of the abuse later in the process. - welsh',
  cafcassSupportHeader: 'How Cafcass can support you in your case',
  cafcassSupportLines: [
    'The <a href="https://www.cafcass.gov.uk/" class="govuk-link" target="_blank" aria-label="Children and Family Court Advisory and Support Service (Cafcass)">Children and Family Court Advisory and Support Service (Cafcass)</a>, in England, and <a href="https://gov.wales/cafcass-cymru" class="govuk-link" target="_blank" aria-label="Cafcass Cymru">Cafcass Cymru</a>,  in Wales, protect and promote the interests of children involved in family court cases. An advisor from Cafcass or Cafcass Cymru will look at your answers as part of their safeguarding checks, and may need to ask you further questions.',
    'As part of their enquiries they will contact organisations such as the police and local authorities for any relevant information about you, any other person and the children.',
    'They will submit information to the court before your first hearing. Their assessment helps the judge make a decision that is in the best interests of the children',
  ],
  bottomLines: [
    'We will now ask you some questions about the abusive behaviour. - welsh',
    'Take your time filling in the information and write as much as you feel able to. - welsh',
  ],
};

describe('C1A safety concerns guidance > applying-with > content', () => {
  const commonContent = { language: 'en' } as CommonContent;

  let generatedContent;
  let form;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test('should contain Save and continue button', () => {
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
