import autobind from 'autobind-decorator';
import { generateContent } from './content';
import ProceedingDocumentUpload from '../../../../steps/common/otherProceeding/getController';
import { FieldPrefix } from '../../../../app/case/case';
import { TranslationFn } from '../../../../app/controller/GetController';

@autobind
export default class DocumentUpload extends ProceedingDocumentUpload {
  constructor(protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix) {
    super(__dirname + '/template', generateContent,FieldPrefix.RESPONDENT);
  }
}
