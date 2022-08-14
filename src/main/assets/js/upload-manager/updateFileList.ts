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
      const fileEl = document.createElement('li');
      fileEl.classList.add(
        'uploadedFile',
        'govuk-!-padding-top-2',
        'govuk-!-padding-bottom-3',
        'govuk-section-break',
        'govuk-section-break--visible'
      );
      const filenameEl = document.createElement('p');
      filenameEl.classList.add('govuk-body');
      filenameEl.id = `Document${i}`;
      filenameEl.textContent = file.name;
      fileEl.appendChild(filenameEl);

      //if (content.isAmendableStates || content.isClarificationAmendableState) {
        const deleteEl = document.createElement('a');
        deleteEl.classList.add('govuk-link--no-visited-state');
        deleteEl.id = `Delete${i}`;
        deleteEl.href = `${DOCUMENT_MANAGER}/delete/${i - 1}`;
        deleteEl.textContent = 'Remove';
        deleteEl.setAttribute('aria-labelledby', `Delete${i} Document${i}`);
        fileEl.appendChild(deleteEl);
      //}

      filesUploadedEl.appendChild(fileEl);
      i++;
    }
  }
};
