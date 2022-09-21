import { CaseWithId } from '../../../app/case/case';
import { APPLICANT_ORDERS_FROM_THE_COURT } from '../../../steps/urls';
import { Banner, SectionStatus } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';

import { applicant_en } from './section-titles';
import { generateApplicantTaskList } from './tasklist';
import { applicant_tasklist_items_en } from './tasklist-items';

const en = () => ({
  title: 'Applicant',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'TO DO',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
  },
  sectionTitles: applicant_en,
  taskListItems: applicant_tasklist_items_en,
});

const cy = () => ({
  title: ' ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'I WNEUD',
    [SectionStatus.DOWNLOAD]: 'LLWYTHO',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
  },
  sectionTitles: applicant_en,
  taskListItems: applicant_tasklist_items_en,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const banners: Banner[] = getWithdrawBanners(content.userCase!);
  return {
    ...translations,
    sections: generateApplicantTaskList(translations.sectionTitles, translations.taskListItems, content.userCase),
    banners,
  };
};

const getWithdrawBanners = (userCase: Partial<CaseWithId> ) => {
  let uid = '';
   if(userCase.orderCollection){
     userCase.orderCollection.forEach((element) => {
       if (element.value.orderTypeId === 'blankOrderOrDirectionsWithdraw'){
        uid = element.value.orderDocument.document_url.substring(
          element.value.orderDocument.document_url.lastIndexOf('/') + 1
        );
       }
     })
   }
  
  // if(userCase.state === 'CASE_WITHDRAWN'){
  return [{
    bannerHeading: 'The case has now been withdrawn',
    bannerContent: [
      {
        line1: 'The court has agreed to withdraw the case.',
      },
    ],
    bannerLinks: [
      {
        href: `${APPLICANT_ORDERS_FROM_THE_COURT}/${uid}`,
        text: 'View the order or letter that says the case has been withdrawn (PDF)',
      }
    ],
  }];
// }
};
