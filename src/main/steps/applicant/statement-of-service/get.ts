import { GetController } from '../../../app/controller/GetController';

import { generateContent } from './choose-parties/content';

export default class UploadStatementOfServiceGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }
}
