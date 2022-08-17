import { DOCUMENT_MANAGER } from '../../../steps/urls';
import { getById, hidden } from '../selectors';

import type { UploadedFiles } from './UploadedFiles';

const noFilesUploadedEl = getById('noFilesUploaded');
const filesUploadedEl = getById('filesUploaded');
//const content = JSON.parse(getById('uploadContent')?.textContent || '{}');

export const updateFileList = (uploadedFiles: UploadedFiles): void => {
  if (noFilesUploadedEl) {
    if (uploadedFiles.length) {
      noFilesUploadedEl.classList.add(hidden);
    } else {
      noFilesUploadedEl.classList.remove(hidden);
    }
  }

  if (filesUploadedEl) {
    filesUploadedEl.innerHTML = '';
    let i = 1;

    for (const file of uploadedFiles) {
      const fileEl = document.createElement('dl');
      fileEl.classList.add(
        'uploadedFile'
      );
      const fileSummaryList = document.createElement('div');
      fileSummaryList.classList.add('govuk-summary-list__row');
      
      const filenameEl = document.createElement('dt');
      filenameEl.classList.add('govuk-summary-list__value');
      filenameEl.id = `Document${i}`;
      filenameEl.textContent = file.name;
      fileSummaryList.appendChild(filenameEl);

      //if (content.isAmendableStates || content.isClarificationAmendableState) {
        const fileRemoveEl = document.createElement('dd');
        fileRemoveEl.classList.add('govuk-summary-list__actions');
        const deleteEl = document.createElement('a');
        deleteEl.classList.add('govuk-link--no-visited-state');
        deleteEl.id = `Delete${i}`;
        deleteEl.href = `${DOCUMENT_MANAGER}/delete/${i - 1}`;
        deleteEl.textContent = 'Remove';
        deleteEl.setAttribute('aria-labelledby', `Delete${i} Document${i}`);
        fileRemoveEl.appendChild(deleteEl);
        fileSummaryList.appendChild(fileRemoveEl);
        fileEl.appendChild(fileSummaryList);

        const uploadGroupEL = document.getElementById('uploadGroup');
        uploadGroupEL?.classList.remove('hidden');

      //}

      filesUploadedEl.appendChild(fileEl);
      i++;
    }
  }
};
