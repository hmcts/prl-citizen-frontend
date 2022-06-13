import { SectionStatus } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';

import { document_en } from './section-titles';
import { applicant_document_list_en } from './section-list';
import { getKeepYourDetailsPrivateStatus } from './utils';
import * as URL from '../../../urls';

const en = () => ({
  title: 'DA Applicant',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'TO DO',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD'
  },
  sectionTitles: document_en,
  sectionListItems: applicant_document_list_en,
});

const cy = () => ({
  title: 'Gwneud cais i fabwysiadu plentyn a leolwyd dan eich gofal',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'I WNEUD',
    [SectionStatus.DOWNLOAD]: 'LLWYTHO'
  },
  sectionTitles: document_en,
  sectionListItems: applicant_document_list_en,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    sections: generateDocumentSectionList(translations.sectionTitles, translations.sectionListItems, content.userCase),
  };
};

export const generateDocumentSectionList = (sectionTitles, sectionListItems, userCase) => {
  return [
    {
      title: sectionTitles.aboutYou,
      items: [
        {
          id: 'fl401-application',
          text: sectionListItems.fl401_application,
          status: getKeepYourDetailsPrivateStatus(userCase),
          href: URL.APPLICANT_ALL_DOCUEMNTS,
        },
      ],
    },
  ];
};

