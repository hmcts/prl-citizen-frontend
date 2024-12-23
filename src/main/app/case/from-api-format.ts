import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { invert } from 'lodash';

import { Case, CaseDate, Checkbox, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, YesOrNo } from './definition';

dayjs.extend(advancedFormat);

type FromApiConverters = Partial<Record<keyof CaseData, string | ((data: Partial<CaseData>) => Partial<Case>)>>;

export const checkboxConverter = (value: string | undefined): string | undefined => {
  if (!value) {
    return undefined;
  }
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  return value === YesOrNo.YES ? Checkbox.Checked : Checkbox.Unchecked;
};
const fields: FromApiConverters = {
  ...invert(formFieldsToCaseMapping),
};

export const fromApiDate = (date: string | undefined): CaseDate => {
  if (!date) {
    return { year: '', month: '', day: '' };
  }
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [y, m, d] = date.split('-');
  return { year: `${+y}`, month: `${+m}`, day: `${+d}` };
};

export const fromApiFormat = (data: CaseData): Case => formatCase(fields, data);
