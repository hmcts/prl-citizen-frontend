import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = () => ({
  serviceName: 'Application upload',
  titleList: {
    childArrangementOrder: 'Upload Child Arrangements Order',
    emergencyProtectionOrder: 'Upload Emergency Protection Order',
    supervisionOrder: 'Upload Supervision Order',
    careOrder: 'Upload Care Order',
    childAbductionOrder: 'Upload Child Abduction Order',
    contactOrderForDivorce: `Upload A contact or residence order (Section 8 Children
        Act 1989) made within proceedings for a divorce or
        dissolution of a civil partnership`,
    contactOrderForAdoption: `Upload A contact or residence order (Section 8 Children Act
        1989) made in connection with an Adoption Order`,
    childMaintenanceOrder: 'Upload Child Maintenance Order',
    financialOrder: 'Upload Financial Order',
    nonMolestationOrder: 'Upload Non-molestation Order',
    occupationOrder: 'Upload Occupation Order',
    forcedMarriageProtectionOrder: 'Upload Forced Marriage Protection Order',
    restrainingOrder: 'Upload Restraining Order',
    otherInjuctionOrder: 'Upload Other Injuction Order',
    undertakingOrder: 'Upload Undertaking Order',
    otherOrder: 'Upload Other Order',
  },
  youNeed:
    'If you are uploading documents from a computer, name the files clearly. For example, emergency-protection-order.doc.',
  youNeed2: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.',
  uploadDescription: 'How to take a picture of a document on your phone and upload it',
  uploadRequirement: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
    'Take a picture of the whole document. You should be able to see its edges.',
    'Check you can read all the writing, including the handwriting.',
    'Email or send the photo or scan to the device you are using now.',
    'Upload it here.',
  ],
  uploadButton: 'Upload file',
  remove: 'Remove',
  errors: {
    document: {
      required: 'Please choose a file.',
      multipleFiles: `You can upload only one file. 
            If you wish to upload a new file, delete the existing 
            file and upload a new one`,
      fileFormat: `The file you uploaded is in the wrong format.
                Upload your file again in the correct format`,
      fileSize: `The file you uploaded is too large.
                Maximum file size allowed is 20MB`,
    },
  },
});

const cy = () => ({
  serviceName: 'Cais wedi’i lwytho',
  titleList: {
    childArrangementOrder: 'Llwytho Gorchymyn Trefniadau Plant',
    emergencyProtectionOrder: 'Llwytho Gorchymyn Diogelu Brys',
    supervisionOrder: 'Llwytho Gorchymyn Goruchwylio',
    careOrder: 'Llwytho Gorchymyn Gofal',
    childAbductionOrder: 'Llwytho Gorchymyn Herwgydio Plentyn',
    contactOrderForDivorce:
      'Llwytho Gorchymyn Cyswllt neu Orchymyn Preswylio (Adran 8 Deddf Plant 1989) a wnaed fel rhan o achos ysgariad neu achos diddymu partneriaeth sifil',
    contactOrderForAdoption:
      'Llwytho Gorchymyn Cyswllt neu Orchymyn Preswylio (Adran 8 Deddf Plant 1989) a wnaed fel rhan o achos ysgariad neu achos diddymu partneriaeth sifil',
    childMaintenanceOrder: 'Llwytho Gorchymyn Cynhaliaeth Plant',
    financialOrder: 'Llwytho Gorchymyn Ariannol',
    nonMolestationOrder: 'Llwytho Gorchymyn Rhag Molestu',
    occupationOrder: 'Llwytho Gorchymyn Anheddu',
    forcedMarriageProtectionOrder: 'Llwytho Gorchymyn Amddiffyn rhag Priodas dan Orfod',
    restrainingOrder: 'Llwytho Gorchymyn Atal',
    otherInjuctionOrder: 'Llwytho Gorchymyn Gwahardd Arall',
    undertakingOrder: 'Llwytho Gorchymyn Ymgymeriad',
    otherOrder: 'Llwytho Gorchymyn Arall',
  },
  youNeed:
    "Os ydych chi’n llwytho dogfennau o gyfrifiadur, rhowch enwau clir i'r ffeiliau. Er enghraifft, gorchymyn-diogelu-brys.doc.",
  youNeed2: 'Rhaid i’r ffeiliau orffen efo JPG, BMP, PNG,TIF, PDF, DOC neu DOCX.',
  uploadDescription: "Sut i dynnu llun o ddogfen ar eich ffôn a'i lwytho ",
  uploadRequirement: [
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
    "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
    'Gwiriwch eich bod yn gallu gweld yr ysgrifen i gyd, gan gynnwys y llawysgrifen.',
    'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
    'Llwythwch y ffeil yma.',
  ],
  uploadButton: 'Llwytho ffeil',
  remove: ' Dileu',
  errors: {
    document: {
      required: 'Please choose a file. - welsh',
      multipleFiles:
        "Dim ond un ffeil y gallwch ei llwytho. Os ydych yn dymuno llwytho ffeil newydd, dylech ddileu'r ffeil bresennol a llwytho un newydd.",
      fileFormat: "Mae'r ffeil a lwythwyd gennych yn y fformat anghywir. Llwythwch eich ffeil eto yn y fformat cywir.",
      fileSize: "Mae'r ffeil yr ydych wedi ei llwytho yn rhy fawr",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    documentUploadProceed: {
      type: 'hidden',
      label: l => l.uploadFiles,
      labelHidden: true,
      value: 'true',
    },
  },
  submit: {
    text: l => l.onlycontinue,
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
