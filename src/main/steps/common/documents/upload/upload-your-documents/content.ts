import { PartyType } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { applyParms } from '../../../../../steps/common/url-parser';
import { FETCH_CASE_DETAILS } from '../../../../../steps/urls';
import { UploadDocumentCategory } from '../../definitions';
import { getUploadDocumentCategoryDetails } from '../../util';
export * from './routeGuard';

const en = {
  positionStatements: 'Position statement',
  witnessStatements: 'Witness statement',
  declaration: 'I believe that the facts stated in these documents are true',
  consent: 'This confirms that the information you are submitting is true and accurate, to the best of your knowledge.',
  submitButtonText: 'Submit',
  uploadDocumentFileUpload: 'Your documents',
  removeDocument: 'Remove',
  textAreaDocUploadText1: 'You can write your statement in the text box or upload it.',
  textAreaDocUploadText2: 'Write your statement (optional)',
  uplodFileText1:
    'If you are uploading documents from a computer, name the files clearly. For example, letter-from-school.doc.',
  uplodFileText2: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX and have a maximum size of 20mb.',
  uplodFileText3: 'How to take a picture of a document on your phone and upload it',
  uplodFileText4: 'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
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
      uploadError: 'Document could not be uploaded',
      donwloadError: 'Document could not be deleted',
      empty: 'Enter your statement or upload a file.',
    },
  },
};

const cy: typeof en = {
  positionStatements: 'Datganiadau safbwynt',
  witnessStatements: 'Datganiadau tyst',
  declaration: 'Credaf fod y ffeithiau a nodir yn y dogfennau hyn yn wir',
  consent:
    'Mae hyn yn cadarnhau bod yr wybodaeth yr ydych yn ei chyflwyno yn wir ac yn gywir, hyd eithaf eich gwybodaeth.',
  submitButtonText: 'Cyflwyno',
  uploadDocumentFileUpload: 'Eich dogfennau',
  removeDocument: 'Dileu',
  textAreaDocUploadText1: 'Gallwch ysgrifennu eich datganiad yn y blwch testun neu ei lwytho.',
  textAreaDocUploadText2: 'Ysgrifennwch eich datganiad (dewisol)',
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
      uploadError: 'Document could not be uploaded -welsh',
      donwloadError: 'Document could not be deleted - welsh',
      empty: 'Rhowch eich datganiad neu llwythwch ffeil',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: () => {
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
        classes: 'govuk-label govuk-!-margin-bottom-6',
        label: l => l.consent,
        labelSize: 'm',
      },
    };
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
  let title;

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

  return {
    caption: sectionTitle,
    title,
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    filesUploaded:
      content.userCase?.[uploadedFilesDataReference]?.map(file => ({
        id: file.document_url.substring(file.document_url.lastIndexOf('/') + 1),
        ...file,
      })) ?? [],
    docCategory,
    allowFreeTextForStatements: [
      UploadDocumentCategory.POSITION_STATEMENTS,
      UploadDocumentCategory.WITNESS_STATEMENTS,
    ].includes(docCategory),
    errorMessage:
      translations.errors.uploadDocumentFileUpload?.[
        request.session?.errors?.find(
          error => error.propertyName === 'uploadDocumentFileUpload' && error.errorType !== 'uploadError'
        )?.errorType
      ] ?? null,
  };
};
