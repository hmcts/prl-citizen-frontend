import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { invert } from 'lodash';

import { Case, Checkbox, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, YesOrNo } from './definition';

dayjs.extend(advancedFormat);

type FromApiConverters = Partial<Record<keyof CaseData, string | ((data: Partial<CaseData>) => Partial<Case>)>>;

const checkboxConverter = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }
  return value === YesOrNo.YES ? Checkbox.Checked : Checkbox.Unchecked;
};
console.log(checkboxConverter);
const fields: FromApiConverters = {
  ...invert(formFieldsToCaseMapping),
};

const fromApiDate = date => {
  if (!date) {
    return;
  }
  const [y, m, d] = date.split('-');
  return { year: `${+y}`, month: `${+m}`, day: `${+d}` };
};
console.log(fromApiDate);

export const fromApiFormat = (data: CaseData): Case => formatCase(fields, data);
