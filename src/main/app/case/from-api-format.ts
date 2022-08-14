import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { invert } from 'lodash';

import { Case, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData } from './definition';
import { fromApiApplicant1 as uploadedFilesFromApiApplicant1 ,
  documentUploadApplicant1 as  documentUploadApplicant1 } from './formatter/uploaded-files';

dayjs.extend(advancedFormat);

type FromApiConverters = Partial<Record<keyof CaseData, string | ((data: Partial<CaseData>) => Partial<Case>)>>;

const fields: FromApiConverters = {
  ...invert(formFieldsToCaseMapping),
  orderCollection: uploadedFilesFromApiApplicant1,
  applicant1DocumentsUploaded: documentUploadApplicant1,
};

export const fromApiFormat = (data: CaseData): Case => formatCase(fields, data);
