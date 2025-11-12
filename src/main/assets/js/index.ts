import { initAll as govuk } from 'govuk-frontend';
import { initAll as hmrc } from 'hmrc-frontend/hmrc/all';

import '../scss/main.scss';
import './go-back';
import './data-layer';
import './cookie';
import './UploadFiles';
govuk();
// Initialize HMRC frontend components
document.addEventListener('DOMContentLoaded', () => {
  hmrc();
});
