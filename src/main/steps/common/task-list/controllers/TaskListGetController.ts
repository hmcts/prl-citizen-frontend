import path from 'path';

import autobind from 'autobind-decorator';

import { GetController } from '../../../../app/controller/GetController';
import { generateContent } from '../content';

@autobind
export default class TaskListGetController extends GetController {
  constructor() {
    super(path.join(__dirname, '../template'), generateContent);
  }
}
