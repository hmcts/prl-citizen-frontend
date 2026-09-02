import { initAll as govuk } from 'govuk-frontend';
import { initAll as hmrc } from 'hmrc-frontend/hmrc/all';

import '../scss/main.scss';
import './go-back';
import './data-layer';
import './cookie';
import './UploadFiles';

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('govuk-frontend-supported');

  govuk();
  hmrc();
});
