import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = {
  section: 'Safety concerns',
  title: 'Your safety',
  line1:
    'The court needs to know if you have suffered, or are at risk of suffering, any form of domestic violence or abuse.',
  line2: 'The following questions will ask whether you have suffered, or are at risk of suffering, any form of harm.',
  line3: 'Find out about the signs of domestic violence or abuse',

  continue: 'Continue',
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
};

const cy: typeof en = {
  section: 'Pryderon diogelwch',
  title: 'Eich diogelwch',
  line1:
    'The court needs to know if you have suffered, or are at risk of suffering, any form of domestic violence or abuse. -welsh',
  line2:
    'The following questions will ask whether you have suffered, or are at risk of suffering, any form of harm. -welsh',
  line3: 'Rhagor o wybodaeth am arwyddion o drais neu gamdriniaeth ddomestig',

  continue: 'Parhau',
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
