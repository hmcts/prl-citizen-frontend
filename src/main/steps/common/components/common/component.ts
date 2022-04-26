/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../common.content';

import { ComponentValues } from './types';

export abstract class Component {
  form!: FormContent;
  generateContent: TranslationFn;

  constructor(values: ComponentValues) {
    this.generateContent = (content: CommonContent) => ({
      ...{
        en: (): Record<string, unknown> => values.enContent!,
        cy: (): Record<string, unknown> => values.cyContent!,
      }[content.language](),
      form: this.form,
    });
  }
}
