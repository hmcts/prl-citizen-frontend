import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = () => ({
  serviceName: 'Application upload',
  titleList: {
    childArrangementOrder: 'Upload Child Arrangement Order',
    emergencyProtectionOrder: 'Upload Emergency Protection Order',
    supervisionOrder: 'Upload Supervision Order',
    careOrder: 'Upload Care Order',
    childAbductionOrder: 'Upload A contact or Residence Order for Divorce',
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
      required: 'There is a problem. Please choose a file.',
      multipleFiles: `There is a problem. You can upload only one file. 
            If you wish to upload a new file, delete the existing 
            file and upload a new one`,
    },
  },
});

const cy = () => ({
  serviceName: 'Application upload - welsh',
  titleList: {
    childArrangementOrder: 'Upload Child Arrangement Order - welsh',
    emergencyProtectionOrder: 'Upload Emergency Protection Order - welsh',
    supervisionOrder: 'Upload Supervision Order -  welsh',
    careOrder: 'Upload Care Order - welsh',
    childAbductionOrder: 'Upload A contact or Residence Order for Divorce - welsh',
    contactOrderForDivorce: `Upload A contact or residence order (Section 8 Children
        Act 1989) made within proceedings for a divorce or
        dissolution of a civil partnership - welsh`,
    contactOrderForAdoption: `Upload A contact or residence order (Section 8 Children Act
        1989) made in connection with an Adoption Order - welsh`,
    childMaintenanceOrder: 'Upload Child Maintenance Order - welsh',
    financialOrder: 'Upload Financial Order - welsh',
    nonMolestationOrder: 'Upload Non-molestation Order - welsh',
    occupationOrder: 'Upload Occupation Order - welsh',
    forcedMarriageProtectionOrder: 'Upload Forced Marriage Protection Order - welsh',
    restrainingOrder: 'Upload Restraining Order - welsh',
    otherInjuctionOrder: 'Upload Other Injuction Order - welsh',
    undertakingOrder: 'Upload Undertaking Order - welsh',
    otherOrder: 'Upload Other Order - welsh',
  },
  youNeed:
    'If you are uploading documents from a computer, name the files clearly. For example, emergency-protection-order.doc. - welsh',
  youNeed2: 'Files must end with JPG, BMP, PNG,TIF, PDF, DOC or DOCX.- welsh',
  uploadDescription: 'How to take a picture of a document on your phone and upload it - welsh',
  uploadRequirement: [
    'Place your document on a flat service in a well-lit room. Use a flash if you need to. - welsh',
    'Take a picture of the whole document. You should be able to see its edges. welsh',
    'Check you can read all the writing, including the handwriting. - welsh',
    'Email or send the photo or scan to the device you are using now. - welsh',
    'Upload it here. - welsh',
  ],
  uploadButton: 'Upload file - welsh',
  remove: 'Remove - welsh',
  errors: {
    document: {
      required: 'There is a problem. Please choose a file. - welsh',
      multipleFiles: `There is a problem. You can upload only one file. 
            If you wish to upload a new file, delete the existing 
            file and upload a new one - welsh`,
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
