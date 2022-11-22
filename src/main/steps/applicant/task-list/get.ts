import { GetController } from '../../../app/controller/GetController';

import { generateContent } from './content';

export default class ApplicantTaskListGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }
}
