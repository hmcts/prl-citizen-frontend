import _ from 'lodash';

import { PartyType } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { interpolate } from '../../../../../steps/common/string-parser';
import { applyParms } from '../../../../../steps/common/url-parser';
import { FETCH_CASE_DETAILS } from '../../../../../steps/urls';
import { UploadDocumentCategory } from '../../definitions';
import { getUploadDocumentCategoryDetails } from '../../upload/utils';

export * from './routeGuard';

const en = {
  positionStatements: 'Position statement',
  witnessStatements: 'Witness statement',
  documentAvailableText: 'A new {docCategory} is generated/uploaded',
  declaration: 'I believe that the facts stated in these documents are true',
  consent: 'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
  submitButtonText: 'Submit',
  uploadDocumentFileUpload: 'Your documents',
  removeDocument: 'Remove',
  statementTextAreaUploadText: 'You can submit {positionOrWitness} statement by either:',
  yourPosition: 'your position',
  aWitness: 'a witness',
  textAreaDocBulletPoint1: 'using the text box to write {statement}',
  textAreaDocBulletPoint2: '{uploading} statement as a document',
  uploadingYour: 'uploading your',
  uploadingThe: 'uploading the',
  yourStatement: 'your statement',
  theStatement: 'the statement',
  yourStatement2: 'your statement',
  theStatement2: 'the statement',
  alsoUploadDocumentsPositionStatement: 'You can also upload documents and other files to support your statement.',
  alsoUploadDocumentsWitnessStatement:
    'You can also upload documents and other files to support the witness statement.',
  textAreaDocUploadText1: 'Write your {docCategory}',
  textAreaDocUploadText2:
    'Enter the statement in the box or upload your statement as a file. You can also use this text box to describe the files you are uploading.',
  textAreaDocUploadText3:
    'Upload your statement as a file or write your statement in the text box. You can also use the text box to describe the files you are uploading.',
  textAreaSaveText: "Select 'Save', to save your text as a document in this page. You can remove it if you need to.",
  save: 'Save',
  uploadFileTitle: 'Upload files',
  positionOrWitnessStatementUploadText1:
    "If you are uploading documents or other files, name the files clearly. For example, 'Letter from school', '{docCategory}'.",
  positionOrWitnessStatementUploadText2: 'Files must be in the format JPG, BMP, PNG, TIF, PDF, DOC or DOCX.',
  uplodFileText1:
    'If you are uploading documents from a computer, name the files clearly. For example, letter-from-school.doc.',
  uplodFileText2: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX and have a maximum size of 20mb.',
  uplodFileText3: 'How to take a picture of a document on your phone and upload it',
  uplodFileText4: 'Place your document on a flat surface in a well-lit room. Use a flash if you need to.',
  uplodFileText5: 'Take a picture of the whole document. You should be able to see its edges.',
  uplodFileText6: 'Check you can read all the writing, including the handwriting.',
  uplodFileText7: 'Email or send the photo or scan to the device you are using now.',
  uplodFileText8: 'Upload it here.',
  uploadFileHeading: 'Upload a file',
  uploadFileButtontext: 'Upload file',
  statementOfTruth: 'Statement of truth',
  warning: 'Warning',
  warningText:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  errors: {
    declarationCheck: {
      required: 'Tick the box to confirm you believe the facts stated in this application are true.',
    },
    uploadDocumentFileUpload: {
      noStatementOrFile: 'Enter {statement} as text or upload {statement} as a file.',
      noFile: 'Upload a file.',
      multipleFiles: 'You can upload only one document.',
      maxDocumentsReached: 'you have reached maximum number of documents that you can upload.',
      uploadError: 'Document could not be uploaded.',
      deleteError: 'Document could not be deleted.',
    },
  },
};

const cy: typeof en = {
  positionStatements: 'Datganiadau safbwynt',
  witnessStatements: 'Datganiadau tyst',
  documentAvailableText: 'Mae {docCategory} newydd yn cael ei gynhyrchu/llwytho i fyny',
  declaration: 'Credaf fod y ffeithiau a nodir yn y dogfennau hyn yn wir',
  consent:
    'Mae hyn yn cadarnhau bod yr wybodaeth yr ydych yn ei chyflwyno yn wir ac yn gywir, hyd eithaf eich gwybodaeth.',
  submitButtonText: 'Cyflwyno',
  uploadDocumentFileUpload: 'Eich dogfennau',
  removeDocument: 'Dileu',
  statementTextAreaUploadText: 'Gallwch gyflwyno {positionOrWitness} un ai:',
  yourPosition: 'eich datganiad safbwynt',
  aWitness: 'datganiad tyst',
  textAreaDocBulletPoint1: 'trwy ddefnyddio’r blwch testun i ysgrifennu{statement}',
  textAreaDocBulletPoint2: '{uploading} datganiad fel dogfen',
  uploadingYour: 'uwchlwytho eich',
  uploadingThe: 'uwchlwytho’r',
  yourStatement: '’ch datganiad',
  theStatement: '’r datganiad',
  yourStatement2: 'eich datganiad',
  theStatement2: 'y datganiad',
  alsoUploadDocumentsPositionStatement: 'Gallwch hefyd uwchlwytho dogfennau a ffeiliau eraill i gefnogi’ch datganiad.',
  alsoUploadDocumentsWitnessStatement:
    'Gallwch hefyd uwchlwytho dogfennau a ffeiliau eraill i gefnogi’r datganiad tyst.',
  textAreaDocUploadText1: 'Ysgrifennwch eich {docCategory}',
  textAreaDocUploadText2:
    "Nodwch y datganiad yn y blwch, neu lanlwythwch eich datganiad fel ffeil. Gallwch hefyd ddefnyddio'r blwch testun i ddisgrifio'r ffeiliau rydych chi'n eu huwchlwytho.",
  textAreaDocUploadText3:
    "Llwythwch eich datganiad i fyny fel ffeil neu ysgrifennwch eich datganiad yn y blwch testun. Gallwch hefyd ddefnyddio'r blwch testun i ddisgrifio'r ffeiliau rydych chi'n eu huwchlwytho.",
  textAreaSaveText:
    "Dewiswch 'Cadw' i gadw eich testun fel dogfen ar y dudalen hon. Gallwch ei ddileu os oes arnoch angen.",
  save: 'Cadw',
  uploadFileTitle: 'Uwchlwytho ffeiliau',
  positionOrWitnessStatementUploadText1:
    "Os ydych yn uwchlwytho dogfennau zip neu ffeiliau eraill, rhowch enwau clir i’r ffeiliau. Er enghraifft, ‘Llythyr gan yr ysgol’, '{docCategory}'.",
  positionOrWitnessStatementUploadText2: 'Rhaid i ffeiliau fod mewn fformat JPG, BMP, PNG, TIF, PDF, DOC neu DOCX.',
  uplodFileText1:
    'Os ydych chi’n llwytho dogfennau o gyfrifiadur, rhowch enwau clir i’r ffeiliau. Er enghraifft, llythyr-gan-yr-ysgol.doc.',
  uplodFileText2:
    'Rhaid i ffeiliau fod ar ffurf JPG, BMP, PNG, TIF, PDF, DOC neu DOCX a bod yn uchafswm o 20mb o ran maint.',
  uplodFileText3: 'Sut i dynnu llun o ddogfen ar eich ffôn a’i lwytho',
  uplodFileText4:
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
  uplodFileText5: "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
  uplodFileText6: 'Gwiriwch eich bod yn gallu gweld yr ysgrifen i gyd, gan gynnwys y llawysgrifen.',
  uplodFileText7: 'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
  uplodFileText8: 'Llwythwch y ffeil yma.',
  uploadFileHeading: 'Llwytho ffeil',
  uploadFileButtontext: 'Llwytho ffeil i fyny',
  statementOfTruth: 'Datganiad Gwirionedd',
  warning: 'Rhybudd',
  warningText:
    'Gellir dwyn achos dirmyg llys yn erbyn unrhyw un sy’n gwneud datganiad anwir, neu sy’n achosi i ddatganiad anwir gael ei wneud mewn dogfen a ddilysir gan ddatganiad gwirionedd heb gredu’n onest ei fod yn wir.',
  errors: {
    declarationCheck: {
      required: 'Ticiwch y blwch i gadarnhau eich bod yn credu bod y ffeithiau a nodir yn y cais hwn yn wir',
    },
    uploadDocumentFileUpload: {
      multipleFiles: 'Gallwch uwchlwytho un dogfen yn unig',
      maxDocumentsReached: 'you have reached maximum number of documents that you can upload.',
      noFile: 'Uwchlwytho ffeil',
      noStatementOrFile: 'Rhowch {statement} neu llwythwch ffeil.',
      uploadError: 'Ni ellir uwchlwytho’r ddogfen.',
      deleteError: "Ni ellir dileu'r ddogfen",
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: (userCase, req) => {
    return req.params.docCategory !== UploadDocumentCategory.FM5_DOCUMENT
      ? {
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
            classes: 'govuk-label govuk-!-margin-bottom-6',
            label: l => l.consent,
            labelSize: 'm',
          },
        }
      : ({} as FormFields);
  },
  onlyContinue: {
    text: l => l.submitButtonText,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '',
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const { partyType, docCategory } = content.additionalData!.req.params;
  const { sectionTitle, categoryLabel } = getUploadDocumentCategoryDetails(content.language, docCategory);
  const request = content.additionalData?.req;
  const userCase = request.session.userCase;
  const uploadedFilesDataReference =
    partyType === PartyType.APPLICANT ? 'applicantUploadFiles' : 'respondentUploadFiles';
  let title: string;
  const allowGenerateDocs = [
    UploadDocumentCategory.POSITION_STATEMENTS,
    UploadDocumentCategory.WITNESS_STATEMENTS,
  ].includes(docCategory);

  if (docCategory === UploadDocumentCategory.POSITION_STATEMENTS) {
    title = translations.positionStatements;
  } else if (docCategory === UploadDocumentCategory.WITNESS_STATEMENTS) {
    title = translations.witnessStatements;
  } else {
    title = categoryLabel;
  }

  Object.assign(form.link!, {
    href: applyParms(FETCH_CASE_DETAILS, { caseId: userCase.id }),
  });

  const isPositionStatement = docCategory === UploadDocumentCategory.POSITION_STATEMENTS;
  const errorMessages = {
    ...translations.errors,
    uploadDocumentFileUpload: {
      ...translations.errors.uploadDocumentFileUpload,
      noStatementOrFile: interpolate(translations.errors.uploadDocumentFileUpload.noStatementOrFile, {
        statement: isPositionStatement ? translations.yourStatement2 : translations.theStatement2,
      }),
    },
  };

  return {
    caption: sectionTitle,
    title,
    ...translations,
    isDocumentGeneratedAndUploded: _.get(request.session, 'applicationSettings.isDocumentGeneratedAndUplaoded', false),
    documentAvailableText: interpolate(translations.documentAvailableText, { docCategory: title.toLowerCase() }),
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}, request) },
    filesUploaded:
      content.userCase?.[uploadedFilesDataReference]?.map(file => ({
        id: file.document_url.substring(file.document_url.lastIndexOf('/') + 1),
        ...file,
      })) ?? [],
    docCategory,
    allowGenerateDocs,
    errorMessage:
      errorMessages.uploadDocumentFileUpload?.[
        request.session?.errors?.find(
          error => error.propertyName === 'uploadDocumentFileUpload' && error.errorType !== 'uploadError'
        )?.errorType
      ] ?? null,
    textAreaUploadText: interpolate(translations.statementTextAreaUploadText, {
      positionOrWitness: isPositionStatement ? translations.yourPosition : translations.aWitness,
    }),
    alsoUploadDocuments: isPositionStatement
      ? translations.alsoUploadDocumentsPositionStatement
      : translations.alsoUploadDocumentsWitnessStatement,
    uplodFileText1: allowGenerateDocs
      ? interpolate(translations.positionOrWitnessStatementUploadText1, { docCategory: title })
      : translations.uplodFileText1,
    uplodFileText2: allowGenerateDocs
      ? translations.positionOrWitnessStatementUploadText2
      : translations.uplodFileText2,
    textAreaDocBulletPoints: [
      interpolate(translations.textAreaDocBulletPoint1, {
        statement: isPositionStatement ? translations.yourStatement : translations.theStatement,
      }),
      interpolate(translations.textAreaDocBulletPoint2, {
        uploading: isPositionStatement ? translations.uploadingYour : translations.uploadingThe,
      }),
    ],
    textAreaDocUploadText1: interpolate(translations.textAreaDocUploadText1, {
      docCategory: title.toLowerCase(),
    }),
    errors: errorMessages,
  };
};
