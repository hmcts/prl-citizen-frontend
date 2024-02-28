import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

console.info('** FOR SONAR **');

const en = {
  section: '',
  title: 'Safety concerns',
  line1: 'The court needs to know if anyone who spends time with the children poses a risk to their safety or yours.',
  line2:
    'We use ‘children’ as a general term to avoid repetition. In this service it applies to whether it is about a child or children.',
  line3:
    'The questions in this section will determine if you or the children have experienced - or are at risk of experiencing - any form of harm.',
  line4:
    'Harm to a child means ill treatment, or damage to their health or development. This could include damage suffered from seeing another person being harmed.',
  line5: 'Why do we need this information and what will we do with it?',
  line6:
    'The court needs to know if any of the other people in this application, or anyone connected to them who has contact with the children, poses a risk to the safety of the children.',
  line7:
    'If you can provide this information now, it will make it easier for the court and support services to make sure your case is handled correctly.',
  line8:
    'If you dont want to provide details of the abuse right now, you will be able to do so when you speak to the Children and Family Court Advisory Support Service (Cafcass).',
  line9:
    'An advisor from Cafcass or Cafcass Cymru will look at your answers during safeguarding checks, and may need to ask you some more questions.',
  line10:
    'As part of this process they will get in touch with organisations such as the police and local authorities, for any information about you, the other people in the case and the children.',
  line11:
    'They will provide this information to the court before your first hearing. The judge will take their assessment into account when deciding what is best for the children.',
  line12:
    'The information you provide in this section will also be shared with the applicant, so they can respond to what you have said.',

  continue: 'Continue',
  findOut:
    'Find out about the <a href="https://www.nspcc.org.uk/preventing-abuse/child-abuse-and-neglect/" class="govuk-link" rel="external" target="_blank">signs of child abuse</a> and <a href="https://www.refuge.org.uk/get-help-now/help-for-women/recognising-abuse/" class="govuk-link" rel="external" target="_blank">domestic abuse</a>.',
  cafcass:
    'The <a href="https://www.cafcass.gov.uk/" class="govuk-link" rel="external" target="_blank">Children and Family Court Advisory and Support Service (Cafcass)</a> in England, and <a href="https://www.gov.wales/cafcass-cymru" class="govuk-link" rel="external" target="_blank">Cafcass Cymru</a> in Wales protects the interests of children involved in family court cases.',
};

const cy: typeof en = {
  section: '',
  title: 'Pryderon diogelwch',
  line1:
    'The court needs to know if anyone who spends time with the children poses a risk to their safety or yours. -welsh',
  line2:
    'We use ‘children’ as a general term to avoid repetition. In this service it applies to whether it is about a child or children. -welsh',
  line3:
    'The questions in this section will determine if you or the children have experienced - or are at risk of experiencing - any form of harm. -welsh',
  line4:
    'Harm to a child means ill treatment, or damage to their health or development. This could include damage suffered from seeing another person being harmed. -welsh',
  line5: 'Why do we need this information and what will we do with it? -welsh',
  line6:
    'The court needs to know if any of the other people in this application, or anyone connected to them who has contact with the children, poses a risk to the safety of the children. -welsh',
  line7:
    'If you can provide this information now, it will make it easier for the court and support services to make sure your case is handled correctly. -welsh',
  line8:
    'If you dont want to provide details of the abuse right now, you will be able to do so when you speak to the Children and Family Court Advisory Support Service (Cafcass). -welsh',
  line9:
    'An advisor from Cafcass or Cafcass Cymru will look at your answers during safeguarding checks, and may need to ask you some more questions. -welsh',
  line10:
    'As part of this process they will get in touch with organisations such as the police and local authorities, for any information about you, the other people in the case and the children. -welsh',
  line11:
    'They will provide this information to the court before your first hearing. The judge will take their assessment into account when deciding what is best for the children. -welsh',
  line12:
    'The information you provide in this section will also be shared with the applicant, so they can respond to what you have said. -welsh',

  continue: 'Parhau',
  findOut:
    'Find out about the <a href="https://www.nspcc.org.uk/preventing-abuse/child-abuse-and-neglect/" class="govuk-link" rel="external" target="_blank">signs of child abuse</a> and <a href="https://www.refuge.org.uk/get-help-now/help-for-women/recognising-abuse/" class="govuk-link" rel="external" target="_blank">domestic abuse</a>. -welsh',
  cafcass:
    'The <a href="https://www.cafcass.gov.uk/" class="govuk-link" rel="external" target="_blank">Children and Family Court Advisory and Support Service (Cafcass)</a> in England, and <a href="https://www.gov.wales/cafcass-cymru" class="govuk-link" rel="external" target="_blank">Cafcass Cymru</a> in Wales protects the interests of children involved in family court cases. -welsh',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},

  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
