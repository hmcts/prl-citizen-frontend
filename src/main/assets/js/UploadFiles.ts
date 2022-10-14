const uploadDocumentFile = (): HTMLElement | null => document.getElementById('upload-file-text');

if (uploadDocumentFile) {
  uploadDocumentFile.onclick = function (e) {
    e.preventDefault();
  };
}
