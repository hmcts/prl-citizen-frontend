import autobind from 'autobind-decorator';

import { FieldPrefix } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';
import OtherProceedingsGetController from '../../../../steps/common/otherProceeding/getController';

import { generateContent } from './content';

@autobind
export default class DocumentUpload extends OtherProceedingsGetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(__dirname + '/template', generateContent, FieldPrefix.RESPONDENT);
  }
}
