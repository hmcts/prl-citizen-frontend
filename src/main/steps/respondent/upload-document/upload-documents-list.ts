import { generateUploadDocumentList as uploadDocumentList } from '../../../steps/applicant/upload-document/upload-documents-list';
import * as URL from '../../urls';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const generateUploadDocumentList = (sectionTitles, taskListItems) => {
  return uploadDocumentList(sectionTitles, taskListItems, URL.RESPONDENT_UPLOAD_DOCUMENT_LIST_START_URL);
};
