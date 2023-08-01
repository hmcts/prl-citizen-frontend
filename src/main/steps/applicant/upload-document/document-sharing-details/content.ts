import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { getDocumentMeta } from '../../../../steps/common/upload-document/util';

const emailId = 'example@test.com';

const en = {
  section: 'How your documents will be shared',
  email: emailId,
  continue: 'Continue',
  warning: 'Warning',
  warningTxt: 'When you upload a document, it will  be shared with the other people in the case.',
  documentSharedLine1:
    'If there is information that should not be shared, remove it from the document. If this is not possible, do not upload the document. Instead, you can ask  the court to restrict who can see the document. ',
  documentSharedLine2: 'The court will only agree to restrict who can see the document if:',
  documentSharedLine3: 'there is a good reason not to share the document, for example safety concerns',
  documentSharedLine4: 'the document is not something the judge needs to see',
  documentSharedLine5: 'an address that needs to be kept private is included in the document',
  documentSharedLine6: 'If you want the court to restrict who can see a document, email: ',
  documentSharedLine7: 'You must say why the document should be restricted.',
};

const cy: typeof en = {
  section: 'Sut fydd eich dogfennau’n cael eu rhannu',
  email: emailId,
  continue: 'Parhau',
  warning: 'Rhybudd',
  warningTxt: 'Pan fyddwch yn cyflwyno dogfen, bydd yn cael ei rhannu gyda’r bobl eraill yn yr achos.',
  documentSharedLine1:
    'Os yw’n cynnwys gwybodaeth na ddylid ei rhannu, dilëwch yr wybodaeth berthnasol o’r ddogfen. Os nad yw hyn yn bosibl, peidiwch â chyflwyno’r ddogfen. Yn hytrach, gallwch ofyn i’r llys atal rhai pobl rhag gallu gweld y ddogfen.',
  documentSharedLine2: 'Bydd y llys ond yn atal rhai pobl rhag gallu gweld y ddogfen:',
  documentSharedLine3: 'os oes rheswm da dros beidio â rhannu’r ddogfen, er enghraifft pryderon diogelwch',
  documentSharedLine4: 'nid yw’r ddogfen yn rhywbeth y mae’r barnwr angen ei gweld',
  documentSharedLine5: 'mae cyfeiriad sydd angen ei gadw’n breifat wedi’i gynnwys yn y ddogfen',
  documentSharedLine6: 'Os ydych eisiau i’r llys atal rhai pobl rhag gallu gweld dogfen, anfonwch neges e-bost i:',
  documentSharedLine7: 'Mae’n rhaid ichi ddweud pam na ddylai rhai pobl weld y ddogfen.',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},

  onlyContinue: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const { docCategory, docType } = content.additionalData!.req.params;
  const { category: caption, type: title } = getDocumentMeta(docCategory, docType, content.language);

  return {
    ...translations,
    form,
    caption,
    title,
  };
};
