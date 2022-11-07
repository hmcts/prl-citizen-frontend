import { CommonContent } from '../../../../steps/common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const EN = 'en';
const CY = 'cy';
const commonContent = {
  language: EN,
  dateFormat: {
    day: 'Day',
    month: 'Month',
    year: 'Year',
  },
} as CommonContent;

const enContent = {
    title: 'Safety concerns',
    title_desc:'The court needs to know about any violent or abusive behaviour that puts you or the children at risk of harm.',
    heading1:'Abusive behaviour',
    line1: 'The court needs to know about any violent or abusive behaviour by the other people in this application.',
    line2:"This could be abuse that occured in the past, or abuse that is happening now.",
    line3: 'Abuse is when someone causes you or the children harm or distress.',
    line4: "Harm to a child means ill treatment or damage to the child's health and development. This could include, for example, damage suffered from seeing or hearing the ill treatment of another person.",
    line5:"Abuse could be:",
    listItem1: 'physical or sexual',
    listItem2: 'psychological',
    listItem3: 'emotional',
    listItem4: 'violent or threatening behaviour',
    listItem5: 'controlling or coercive behaviour',
    listItem6: 'economic, meaning that they limit your ability to acquire, use or maintain money or other property, or acquire goods or services.',
    line6:'It could also take other forms, such as abducting the children.',
    line7p1:"If you are not sure if their behaviour is abusive, see the guidance on ", 
    line7p2:"types of abusive behaviour ",
    line7p3:"and the signs of ",
    line7p4:"child abuse.",
    heading2:'How the court will use this information',
    line1h2:'The court needs to know about this behaviour, to make sure that any orders are in the best interests of you and the children.',
    line2h2:'The court will use the information you provide to handle your case correctly.',
    warning: 'The information that you give in this section will also be shared with the other people in this application, so they are able to respond to what you have said.',
    heading3:"If you don't feel ready to describe the abuse at this stage",
    line1h3p1:"If you don't feel ready to talk about the abuse right now, you can do so when you speak to ",
    line1h3p2:"Cafcass ",
    line1h3p3:"Cafcass Cymru.",
    line2h3:"It will not harm your application if you give details of the abuse later in the process.",
    dropdown:"How Cafcass can support you in your case",
    dropdown_content1p1:"Children and Family Court Advisory and Support Service (Cafcass)",
    dropdown_content1p2:"Cafcass Cymru",
    dropdown_content1p3:", in Wales, protect and promote the interests of children involved in family court cases. An advisor from Cafcass or Cafcass Cymru will look at your answers as part of their safeguarding checks, and may need to ask you further questions.",
    dropdown_content2:"As part of their enquiries they will contact organisations such as the police and local authorities for any relevant information about you, any other person and the children.",
    dropdown_content3:"They will submit information to the court before your first hearing. Their assessment helps the judge make a decision that is in the best interests of the children",
    line3h3:"We will now ask you some questions about the abusive behaviour.",
    line4h3:"Take your time filling in the information and write as much as you feel able to.",
    continue: 'Continue',
};


const cyContent = {
  title: 'Safety concerns - welsh',
  title_desc:'The court needs to know about any violent or abusive behaviour that puts you or the children at risk of harm. - welsh',
  heading1:'Abusive behaviour - welsh',
  line1: 'The court needs to know about any violent or abusive behaviour by the other people in this application. - welsh',
  line2:"This could be abuse that occured in the past, or abuse that is happening now. - welsh",
  line3: 'Abuse is when someone causes you or the children harm or distress. - welsh',
  line4: "Harm to a child means ill treatment or damage to the child's health and development. This could include, for example, damage suffered from seeing or hearing the ill treatment of another person. - welsh",
  line5:"Abuse could be: - welsh",
  listItem1: 'physical or sexual - welsh',
  listItem2: 'psychological - welsh',
  listItem3: 'emotional - welsh',
  listItem4: 'violent or threatening behaviour - welsh',
  listItem5: 'controlling or coercive behaviour - welsh',
  listItem6: 'economic, meaning that they limit your ability to acquire, use or maintain money or other property, or acquire goods or services. - welsh',
  line6:'It could also take other forms, such as abducting the children. - welsh',
  line7p1:"If you are not sure if their behaviour is abusive, see the guidance on  - welsh", 
  line7p2:"types of abusive behaviour  - welsh",
  line7p3:"and the signs of  - welsh",
  line7p4:"child abuse. - welsh",
  heading2:'How the court will use this information - welsh',
  line1h2:'The court needs to know about this behaviour, to make sure that any orders are in the best interests of you and the children. - welsh',
  line2h2:'The court will use the information you provide to handle your case correctly. - welsh',
  warning: 'The information that you give in this section will also be shared with the other people in this application, so they are able to respond to what you have said. - welsh',
  heading3:"If you don't feel ready to describe the abuse at this stage - welsh",
  line1h3p1:"If you don't feel ready to talk about the abuse right now, you can do so when you speak to -welsh",
  line1h3p2:"Cafcass - welsh",
  line1h3p3:"Cafcass Cymru. - welsh",
  line2h3:"It will not harm your application if you give details of the abuse later in the process. - welsh",
  dropdown:"How Cafcass can support you in your case - welsh",
  dropdown_content1p1:"Children and Family Court Advisory and Support Service (Cafcass) -  welsh",
  dropdown_content1p2:"Cafcass Cymru - welsh",
  dropdown_content1p3:", in Wales, protect and promote the interests of children involved in family court cases. An advisor from Cafcass or Cafcass Cymru will look at your answers as part of their safeguarding checks, and may need to ask you further questions. - welsh",
  dropdown_content2:"As part of their enquiries they will contact organisations such as the police and local authorities for any relevant information about you, any other person and the children. - welsh",
  dropdown_content3:"They will submit information to the court before your first hearing. Their assessment helps the judge make a decision that is in the best interests of the children - welsh",
  line3h3:"We will now ask you some questions about the abusive behaviour. - welsh",
  line4h3:"Take your time filling in the information and write as much as you feel able to. - welsh",
  continue: 'Continue - welsh',
  };

  
describe('safety concerns guidance', () => {
  test('should return correct english content', () => {
    const generatedContent = generateContent({ ...commonContent });

    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.continue).toEqual(enContent.continue);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({
      ...commonContent,
      language: CY,
    });

    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.continue).toEqual(cyContent.continue);
  });
});
