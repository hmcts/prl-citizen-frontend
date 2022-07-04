import { Case, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData } from './definition';

export type OrNull<T> = { [K in keyof T]: T[K] | null };

type ToApiConverters = Partial<Record<keyof Case, string | ((data: Case) => OrNull<Partial<CaseData>>)>>;

// const checkboxConverter = (value: string | undefined) => {
//   if (value === null) {
//     return null;
//   }

//   return value === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
// };

const fields: ToApiConverters = {
  ...formFieldsToCaseMapping,
};

export const toApiFormat = (data: Partial<Case>): CaseData => formatCase(fields, data);
