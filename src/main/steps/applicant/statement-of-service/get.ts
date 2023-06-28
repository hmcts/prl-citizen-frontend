import autobind from 'autobind-decorator';
// import { Response } from 'express';

// import { DOCUMENT_MANAGER } from '../../../../main/steps/urls';
// import { YesOrNo } from '../../../app/case/definition';
// import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
//import { Language, generatePageContent } from '../../../steps/common/common.content';

import { generateContent } from './choose-parties/content';

@autobind
export default class UploadStatementOfServiceGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }
}
