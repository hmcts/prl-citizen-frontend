import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { invert } from 'lodash';

import { Case, Checkbox, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, ListValue, PlacementOrder, YesOrNo } from './definition';
// import {
//   fromApiApplicant1 as uploadedFilesFromApiApplicant1,
//   fromApiApplicant2 as uploadedFilesFromApiApplicant2,
// } from './formatter/uploaded-files';

dayjs.extend(advancedFormat);

type FromApiConverters = Partial<Record<keyof CaseData, string | ((data: Partial<CaseData>) => Partial<Case>)>>;

const checkboxConverter = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }

  return value === YesOrNo.YES ? Checkbox.Checked : Checkbox.Unchecked;
};

const fields: FromApiConverters = {
  ...invert(formFieldsToCaseMapping),
  applicant1AdditionalNames: data => ({
    applicant1AdditionalNames: data.applicant1AdditionalNames?.map(item => ({ id: item.id, ...item.value })),
  }),
  applicant2AdditionalNames: data => ({
    applicant2AdditionalNames: data.applicant2AdditionalNames?.map(item => ({ id: item.id, ...item.value })),
  }),
  applicant1AdditionalNationalities: data => ({
    applicant1AdditionalNationalities: data.applicant1AdditionalNationalities?.map(item => item.value.country),
  }),
  applicant2AdditionalNationalities: data => ({
    applicant2AdditionalNationalities: data.applicant2AdditionalNationalities?.map(item => item.value.country),
  }),
  childrenAdditionalNationalities: data => ({
    childrenAdditionalNationalities: data.childrenAdditionalNationalities?.map(item => item.value.country),
  }),
  placementOrders: data => ({
    placementOrders: data.placementOrders?.map(item => ({
      ...item.value,
      placementOrderDate: fromApiDate(item.value.placementOrderDate),
    })),
  }),
  siblings: data => ({
    siblings: data.siblings?.map(sibling => ({
      ...sibling.value,
      siblingPlacementOrders: ((sibling.value.siblingPlacementOrders || []) as ListValue<PlacementOrder>[]).map(
        placementOrder => ({
          ...placementOrder.value,
        })
      ),
    })),
  }),
  adopAgencyOrLAs: data => ({
    adopAgencyOrLAs: data.adopAgencyOrLAs?.map(item => ({
      ...item.value,
    })),
  }),
  dateChildMovedIn: data => ({
    dateChildMovedIn: fromApiDate(data.dateChildMovedIn),
  }),
  applicant1DateOfBirth: data => ({
    applicant1DateOfBirth: fromApiDate(data.applicant1DateOfBirth),
  }),
  applicant2DateOfBirth: data => ({
    applicant2DateOfBirth: fromApiDate(data.applicant2DateOfBirth),
  }),
  childrenDateOfBirth: data => ({
    childrenDateOfBirth: fromApiDate(data.childrenDateOfBirth),
  }),
  applicant1StatementOfTruth: data => ({
    applicant1IBelieveApplicationIsTrue: checkboxConverter(data.applicant1StatementOfTruth),
  }),
  applicant2StatementOfTruth: data => ({
    applicant2IBelieveApplicationIsTrue: checkboxConverter(data.applicant2StatementOfTruth),
  }),
  // applicant1DocumentsUploaded: uploadedFilesFromApiApplicant1,
  // applicant2DocumentsUploaded: uploadedFilesFromApiApplicant2,
  // applicant1CannotUploadSupportingDocument: uploadedFilesFromApiApplicant1,
  // applicant2CannotUploadSupportingDocument: uploadedFilesFromApiApplicant2,
  dateSubmitted: data => ({
    dateSubmitted: new Date(data.dateSubmitted as string),
  }),
  dueDate: data => ({
    dueDate: dayjs(data.dueDate).format('D MMMM YYYY'),
  }),
};

const fromApiDate = date => {
  if (!date) {
    return;
  }

  const [y, m, d] = date.split('-');
  return { year: `${+y}`, month: `${+m}`, day: `${+d}` };
};

export const fromApiFormat = (data: CaseData): Case => formatCase(fields, data);
