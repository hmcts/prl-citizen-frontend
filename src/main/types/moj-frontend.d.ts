declare module '@ministryofjustice/frontend' {
  export interface MultiFileUploadHooks {
    entryHook?: (instance: unknown, file: File) => void;
    exitHook?: (instance: unknown, file: File, xhr: XMLHttpRequest, statusText: string) => void;
    errorHook?: (instance: unknown, file: File, xhr: XMLHttpRequest, statusText: string, error: Error) => void;
    deleteHook?: (instance: unknown, file: File | undefined, xhr: XMLHttpRequest, statusText: string) => void;
  }

  export interface MultiFileUploadConfig {
    uploadUrl: string;
    deleteUrl: string;
    dropzoneHintText?: string;
    dropzoneButtonText?: string;
    hooks?: MultiFileUploadHooks;
  }

  export class MultiFileUpload {
    constructor(root: Element, config?: MultiFileUploadConfig);
    uploadFile(file: File): void;
    uploadFiles(files: FileList | File[]): void;
  }
}
