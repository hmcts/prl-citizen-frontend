import { MultiFileUpload } from '@ministryofjustice/frontend';

const MB = 1024 * 1024;
const ERROR_SUMMARY_TITLE_ID = 'upload-error-summary-title';

interface UploadContainer extends HTMLElement {
  dataset: DOMStringMap;
}

const getCsrfToken = (): string =>
  document.querySelector<HTMLInputElement>('input[name="_csrf"]')?.value ??
  document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ??
  '';

const extensionOf = (filename: string): string => {
  const dot = filename.lastIndexOf('.');
  return dot < 0 ? '' : filename.slice(dot).toLowerCase();
};

const patchXhrForCsrf = (uploadUrl: string, deleteUrl: string): void => {
  const nativeOpen = XMLHttpRequest.prototype.open;
  const nativeSend = XMLHttpRequest.prototype.send;
  const tracked = new WeakSet<XMLHttpRequest>();

  XMLHttpRequest.prototype.open = function (
    this: XMLHttpRequest,
    method: string,
    url: string | URL,
    isAsync: boolean = true,
    username?: string | null,
    password?: string | null
  ): void {
    const target = String(url);
    if (target === uploadUrl || target === deleteUrl) {
      tracked.add(this);
    }
    nativeOpen.call(this, method, url, isAsync, username, password);
  };

  XMLHttpRequest.prototype.send = function (this: XMLHttpRequest, body?: Document | XMLHttpRequestBodyInit | null) {
    if (tracked.has(this)) {
      this.setRequestHeader('x-csrf-token', getCsrfToken());
    }
    return nativeSend.call(this, body);
  };
};

const pageAnchor = (): HTMLElement =>
  document.querySelector<HTMLElement>('main .govuk-grid-column-two-thirds') ??
  document.querySelector<HTMLElement>('main') ??
  document.body;

const fileInputOf = (container: HTMLElement): HTMLInputElement | null =>
  container.querySelector<HTMLInputElement>('.moj-multi-file-upload__input');

const existingSummary = (): HTMLDivElement | null =>
  pageAnchor().querySelector<HTMLDivElement>(':scope > .govuk-error-summary');

const buildSummary = (title: string): HTMLDivElement => {
  const heading = document.createElement('h2');
  heading.className = 'govuk-error-summary__title';
  heading.id = ERROR_SUMMARY_TITLE_ID;
  heading.textContent = title;

  const list = document.createElement('ul');
  list.className = 'govuk-list govuk-error-summary__list';

  const body = document.createElement('div');
  body.className = 'govuk-error-summary__body';
  body.appendChild(list);

  const summary = document.createElement('div');
  summary.className = 'govuk-error-summary';
  summary.dataset.module = 'govuk-error-summary';
  summary.setAttribute('role', 'alert');
  summary.setAttribute('aria-labelledby', ERROR_SUMMARY_TITLE_ID);
  summary.tabIndex = -1;
  summary.append(heading, body);

  return summary;
};

const setInlineError = (container: HTMLElement, message: string): void => {
  const input = fileInputOf(container);
  const formGroup = input?.closest<HTMLElement>('.govuk-form-group');
  if (!input || !formGroup) {
    return;
  }

  formGroup.classList.add('govuk-form-group--error');
  const errorId = `${input.id}-error`;
  let error = formGroup.querySelector<HTMLParagraphElement>('.govuk-error-message');

  if (!error) {
    error = document.createElement('p');
    error.id = errorId;
    error.className = 'govuk-error-message';
    // setupDropzone() moves the input into a runtime-created dropzone, so anchoring on the
    // input would put the message inside the dashed box instead of above it.
    const anchor = formGroup.querySelector<HTMLElement>('.moj-multi-file-upload__dropzone') ?? input;
    anchor.parentNode?.insertBefore(error, anchor);
  }

  const prefix = document.createElement('span');
  prefix.className = 'govuk-visually-hidden';
  prefix.textContent = container.dataset.errorPrefix ?? 'Error:';
  error.replaceChildren(prefix, document.createTextNode(` ${message}`));

  const describedBy = (input.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean);
  if (!describedBy.includes(errorId)) {
    input.setAttribute('aria-describedby', [...describedBy, errorId].join(' '));
  }
};

const clearInlineError = (container: HTMLElement): void => {
  const input = fileInputOf(container);
  const formGroup = input?.closest<HTMLElement>('.govuk-form-group');
  if (!input || !formGroup) {
    return;
  }

  formGroup.classList.remove('govuk-form-group--error');
  const errorId = `${input.id}-error`;
  formGroup.querySelector('.govuk-error-message')?.remove();

  const describedBy = (input.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(id => id && id !== errorId);

  if (describedBy.length > 0) {
    input.setAttribute('aria-describedby', describedBy.join(' '));
  } else {
    input.removeAttribute('aria-describedby');
  }
};

// onFileChange and onDrop reveal the list before the file is checked, so a rejected file leaves
// the heading on its own.
const syncFeedbackVisibility = (container: HTMLElement): void => {
  const feedback = container.querySelector('.moj-multi-file__uploaded-files');
  const rows = container.querySelectorAll('.moj-multi-file-upload__row').length;
  feedback?.classList.toggle('moj-hidden', rows === 0);
};

const removeFailedRows = (container: HTMLElement): void => {
  container.querySelectorAll('.moj-multi-file-upload__row--error, .moj-multi-file-upload__error').forEach(element => {
    const row = element.closest('.moj-multi-file-upload__row');
    (row ?? element).remove();
  });
  syncFeedbackVisibility(container);
};

const showError = (container: UploadContainer, message: string): void => {
  let summary = existingSummary();
  if (!summary) {
    summary = buildSummary(container.dataset.errorSummaryTitle ?? 'There is a problem');
    const anchor = pageAnchor();
    anchor.insertBefore(summary, anchor.firstChild);
  }

  const link = document.createElement('a');
  link.href = `#${fileInputOf(container)?.id ?? ''}`;
  link.textContent = message;

  const item = document.createElement('li');
  item.appendChild(link);
  summary.querySelector('.govuk-error-summary__list')?.replaceChildren(item);
  summary.hidden = false;

  setInlineError(container, message);
  syncFeedbackVisibility(container);
};

const clearError = (container: UploadContainer): void => {
  const summary = existingSummary();
  if (summary) {
    summary.querySelector('.govuk-error-summary__list')?.replaceChildren();
    summary.hidden = true;
  }
  clearInlineError(container);
};

const uploadedCount = (container: HTMLElement): number =>
  Array.from(container.querySelectorAll('.moj-multi-file-upload__row')).filter(
    row => !row.querySelector('.moj-multi-file-upload__error')
  ).length;

const serverMessageOf = (xhr: XMLHttpRequest): string | undefined =>
  (xhr.response as { error?: { message?: string } } | null)?.error?.message;

let csrfPatched = false;

export const initMultiFileUpload = (): MultiFileUpload[] => {
  const containers = document.querySelectorAll<UploadContainer>('[data-module="moj-multi-file-upload"]');
  const instances: MultiFileUpload[] = [];

  containers.forEach(container => {
    const uploadUrl = container.dataset.uploadUrl;
    const deleteUrl = container.dataset.deleteUrl;
    if (!uploadUrl || !deleteUrl) {
      return;
    }

    if (!csrfPatched) {
      patchXhrForCsrf(uploadUrl, deleteUrl);
      csrfPatched = true;
    }

    const accepted = (container.dataset.accept ?? '').split(',').filter(Boolean);
    const maxFileSizeMB = Number(container.dataset.maxFileSizeMb ?? 0);
    const maxFilenameLength = Number(container.dataset.maxFilenameLength ?? 0);

    const preflight = (file: File): string | undefined => {
      if (maxFilenameLength && file.name.length > maxFilenameLength) {
        return container.dataset.errorFilenameTooLong;
      }
      if (accepted.length && !accepted.includes(extensionOf(file.name))) {
        return container.dataset.errorWrongFileType;
      }
      if (maxFileSizeMB && file.size > maxFileSizeMB * MB) {
        return container.dataset.errorFileTooLarge;
      }
      return undefined;
    };

    const multiple = container.dataset.multiple === 'true';

    const instance = new MultiFileUpload(container, {
      uploadUrl,
      deleteUrl,
      dropzoneButtonText: container.dataset.chooseFileText ?? 'Choose file',
      dropzoneHintText: container.dataset.dropFileText ?? 'or drop file',
      hooks: {
        exitHook: () => {
          clearError(container);
          removeFailedRows(container);
        },
        errorHook: (_instance: unknown, _file: File, xhr: XMLHttpRequest) => {
          const message = serverMessageOf(xhr);
          if (message) {
            showError(container, message);
            removeFailedRows(container);
          }
        },
        deleteHook: (_instance: unknown, _file: File | undefined, xhr: XMLHttpRequest) => {
          if (xhr.status >= 200 && xhr.status < 300) {
            clearError(container);
            syncFeedbackVisibility(container);
            return;
          }
          showError(container, container.dataset.errorDelete ?? '');
        },
      },
    });

    // Both the file input and the dropzone funnel through uploadFiles, and uploadFile() offers no
    // way to refuse a file, so the cardinality rules are applied here.
    const uploadOne = instance.uploadFile.bind(instance);
    instance.uploadFiles = (files: FileList | File[]): void => {
      const batch = Array.from(files);
      clearError(container);

      if (!multiple) {
        if (uploadedCount(container) > 0) {
          showError(container, container.dataset.errorRemoveFileFirst ?? '');
          return;
        }
        if (batch.length > 1) {
          showError(container, container.dataset.errorOnlyOneFile ?? '');
          return;
        }
      }

      for (const file of batch) {
        const error = preflight(file);
        if (error) {
          showError(container, error);
          continue;
        }
        uploadOne(file);
      }
    };

    // setupLabel() appends the hint before the button, and its right margin assumes that order.
    const dropzone = container.querySelector('.moj-multi-file-upload__dropzone');
    const hint = dropzone?.querySelector('p');
    if (dropzone && hint) {
      dropzone.append(hint);
      hint.classList.add('govuk-!-margin-right-0', 'govuk-!-margin-left-2');
    }

    instances.push(instance);
  });

  return instances;
};
