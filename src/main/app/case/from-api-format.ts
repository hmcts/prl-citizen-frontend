import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { invert } from 'lodash';

import { Case,  formFieldsToCaseMapping, formatCase } from './case';
import { CaseData } from './definition';


dayjs.extend(advancedFormat);

type FromApiConverters = Partial<Record<keyof CaseData, string | ((data: Partial<CaseData>) => Partial<Case>)>>;



const fields: FromApiConverters = {
  ...invert(formFieldsToCaseMapping),
};


export const fromApiFormat = (data: CaseData): Case => formatCase(fields, data);
