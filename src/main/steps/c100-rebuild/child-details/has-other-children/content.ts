import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = () => ({
  title: 'Do you or any respondents have other children who are not part of this application?',
  one: 'Yes',
  two: 'No',
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
});

const cy = () => ({
  title: 'A oes gennych chi neu unrhyw atebwyr blant eraill nad ydynt yn rhan o’r cais hwn?',
  one: 'Oes',
  two: 'Nac Oes',
  errors: {
    ocd_hasOtherChildren: {
      required: 'Select yes if you have other children',
    },
  },
  needInfoTitle: 'Pam ein bod angen yr wybodaeth hon a beth fyddwn yn ei wneud gyda hi?',
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
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    ocd_hasOtherChildren: {
      type: 'radios',
      classes: 'govuk-radios',
      section: l => l.section,
      hint: l => l.hint,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },

  submit: {
    text: l => l.onlyContinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
