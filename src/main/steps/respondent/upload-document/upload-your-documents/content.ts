import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

const en = {
  section: 'Provide the document',
  title: 'Provide the documents',
  declaration: 'I believe that the facts stated in these documents are true',
  consent: 'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
  continue: 'Continue',
  add: 'Submit',
  uploadFiles: 'Your documents',
  remove: 'Remove',
  textAreaDocUploadText1: 'You can use this box to:',
  textAreaDocUploadText2: 'write a statement if you do not want to upload a document',
  textAreaDocUploadText3: 'give the court more information about the documents you are uploading',
  uplodFileText1:
    'If you are uploading documents from a computer, name the files clearly. For example, letter-from-school.doc.',
  uplodFileText2: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.',
  uplodFileText3: 'How to take a picture of a document on your phone and upload it',
  uplodFileText4: 'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
  uplodFileText5: 'Take a picture of the whole document. You should be able to see its edges.',
  uplodFileText6: 'Check you can read all the writing, including the handwriting.',
  uplodFileText7: 'Email or send the photo or scan to the device you are using now.',
  uplodFileText8: 'Upload it here.',
  uploadFileHeading: 'Upload a file',
  uploadFile: 'Upload file',
  statementOfTruth: 'Statement of truth',
  warning: 'Warning',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    declarationCheck: {
      required: 'Please confirm the declaration',
    },
  },
};

const cy: typeof en = {
  section: 'Provide the document (welsh)',
  title: 'Darparwch y dogfennau',
  declaration: 'Credaf fod y ffeithiau a nodir yn y dogfennau hyn yn wir',
  consent:
    'Mae hyn yn cadarnhau bod yr wybodaeth yr ydych yn ei chyflwyno yn wir ac yn gywir, hyd eithaf eich gwybodaeth. Gelwir hwn yn eich ‘datganiad gwirionedd',
  continue: 'Parhau',
  add: 'Cyflwyno',
  uploadFiles: 'Eich dogfennau',
  remove: 'Dileu',
  textAreaDocUploadText1: 'Gallwch ddefnyddio’r blwch hwn i:',
  textAreaDocUploadText2: 'ysgrifennu datganiad os nad ydych eisiau cyflwyno dogfen',
  textAreaDocUploadText3: 'rhoi mwy o wybodaeth i’r llys am y dogfennau rydych yn eu cyflwyno',
  uplodFileText1:
    'Os ydych chi’n llwytho dogfennau o gyfrifiadur, rhowch enwau clir i’r ffeiliau. Er enghraifft, llythyr-gan-yr-ysgol.doc.',
  uplodFileText2: 'Rhaid i ffeiliau derfynu â JPG, BMP, PNG,TIF, PDF, DOC neu DOCX.',
  uplodFileText3: 'Sut i dynnu llun o ddogfen ar eich ffôn a’i lwytho',
  uplodFileText4:
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
  uplodFileText5: "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
  uplodFileText6: 'Gwiriwch eich bod yn gallu gweld yr ysgrifen i gyd, gan gynnwys y llawysgrifen.',
  uplodFileText7: 'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
  uplodFileText8: 'Llwythwch y ffeil yma.',
  uploadFileHeading: 'Llwytho ffeil',
  uploadFile: 'Llwytho ffeil i fyny',
  statementOfTruth: 'Datganiad Gwirionedd',
  warning: 'Rhybudd',
  warningText:
    'Gellir dwyn achos dirmyg llys yn erbyn unrhyw un sy’n gwneud datganiad anwir, neu sy’n achosi i ddatganiad anwir gael ei wneud mewn dogfen a ddilysir gan ddatganiad gwirionedd heb gredu’n onest ei fod yn wir.',
  errors: {
    declarationCheck: {
      required: 'Cadarnhewch y datganiad',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: () => {
    const checkboxes: { id: string; value: string }[] = [];

    checkboxes.push({
      id: 'sot',
      value: 'StatementOfTruth',
    });

    return {
      declarationCheck: {
        type: 'checkboxes',
        values: [
          {
            name: 'declarationCheck',
            label: l => l.declaration,
            value: 'declaration',
          },
        ],
        validator: atLeastOneFieldIsChecked,
      },
      consentConfirm: {
        type: 'label',
        classes: 'govuk-label',
        label: l => l.consent,
        labelSize: 'm',
      },
    };
  },
  onlyContinue: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const { parentDocType, docType } = content.additionalData!.req.query;
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    parentDocType,
    docType,
  };
};
