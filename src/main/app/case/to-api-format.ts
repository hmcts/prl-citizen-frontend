import { v4 as generateUuid } from 'uuid';

import { isInvalidHelpWithFeesRef } from '../form/validation';

import { Case, CaseDate, Checkbox, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, PlacementOrder, YesOrNo } from './definition';

export type OrNull<T> = { [K in keyof T]: T[K] | null };

type ToApiConverters = Partial<Record<keyof Case, string | ((data: Case) => OrNull<Partial<CaseData>>)>>;

const checkboxConverter = (value: string | undefined) => {
  if (value === null) {
    return null;
  }

  return value === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
};

const fields: ToApiConverters = {
  ...formFieldsToCaseMapping,
  dateChildMovedIn: data => ({
    dateChildMovedIn: toApiDate(data.dateChildMovedIn),
  }),
  applicant1DateOfBirth: data => ({
    applicant1DateOfBirth: toApiDate(data.applicant1DateOfBirth),
  }),
  applicant2DateOfBirth: data => ({
    applicant2DateOfBirth: toApiDate(data.applicant2DateOfBirth),
  }),
  childrenDateOfBirth: data => ({
    childrenDateOfBirth: toApiDate(data.childrenDateOfBirth),
  }),
  applicant1AdditionalNames: data => ({
    applicant1AdditionalNames:
      data.applicant1HasOtherNames === YesOrNo.YES
        ? (data.applicant1AdditionalNames || []).map(item => ({
            id: generateUuid(),
            value: { firstNames: `${item.firstNames}`, lastNames: `${item.lastNames}` },
          }))
        : [],
  }),
  applicant2AdditionalNames: data => ({
    applicant2AdditionalNames:
      data.applicant2HasOtherNames === YesOrNo.YES
        ? (data.applicant2AdditionalNames || []).map(item => ({
            id: generateUuid(),
            value: { firstNames: `${item.firstNames}`, lastNames: `${item.lastNames}` },
          }))
        : [],
  }),
  applicant1AdditionalNationalities: data => ({
    applicant1AdditionalNationalities: (data.applicant1AdditionalNationalities || []).map(item => ({
      id: generateUuid(),
      value: { country: `${item}` },
    })),
  }),
  applicant2AdditionalNationalities: data => ({
    applicant2AdditionalNationalities: (data.applicant2AdditionalNationalities || []).map(item => ({
      id: generateUuid(),
      value: { country: `${item}` },
    })),
  }),
  childrenAdditionalNationalities: data => ({
    childrenAdditionalNationalities: (data.childrenAdditionalNationalities || []).map(item => ({
      id: generateUuid(),
      value: { country: `${item}` },
    })),
  }),
  placementOrders: data => ({
    placementOrders: (data.placementOrders || []).map(item => ({
      id: generateUuid(),
      value: {
        ...item,
        placementOrderDate: toApiDate(item.placementOrderDate as CaseDate),
      },
    })),
  }),
  siblings: data => ({
    siblings: (data.siblings || []).map(item => ({
      id: generateUuid(),
      value: {
        ...item,
        siblingPlacementOrders: ((item.siblingPlacementOrders || []) as PlacementOrder[]).map(
          (item2: PlacementOrder) => ({
            id: generateUuid(),
            value: {
              ...item2,
            },
          })
        ),
      },
    })),
  }),
  adopAgencyOrLAs: data => ({
    adopAgencyOrLAs: (data.adopAgencyOrLAs || []).map(item => ({
      id: generateUuid(),
      value: {
        ...item,
      },
    })),
  }),
  applicant1IBelieveApplicationIsTrue: data => ({
    applicant1StatementOfTruth: checkboxConverter(data.applicant1IBelieveApplicationIsTrue),
  }),
  applicant2IBelieveApplicationIsTrue: data => ({
    applicant2StatementOfTruth: checkboxConverter(data.applicant2IBelieveApplicationIsTrue),
  }),
  applicant1HelpWithFeesRefNo: data => ({
    applicant1HWFReferenceNumber: !isInvalidHelpWithFeesRef(data.applicant1HelpWithFeesRefNo)
      ? data.applicant1HelpWithFeesRefNo
      : '',
  }),
  applicant1UploadedFiles: () => ({}),
  applicant2UploadedFiles: () => ({}),
  applicant1HelpPayingNeeded: data => ({
    applicant1HWFNeedHelp: data.applicant1HelpPayingNeeded,
    ...(data.applicant1HelpPayingNeeded === YesOrNo.NO
      ? setUnreachableAnswersToNull(['applicant1HWFAppliedForFees', 'applicant1HWFReferenceNumber'])
      : {}),
  }),
};

export const toApiDate = (date: CaseDate | undefined): string => {
  if (!date?.year || !date?.month || !date?.day) {
    return '';
  }
  return date.year + '-' + date.month.padStart(2, '0') + '-' + date.day.padStart(2, '0');
};

const setUnreachableAnswersToNull = (properties: string[]): Record<string, null> =>
  properties.reduce((arr: Record<string, null>, property: string) => ({ ...arr, [property]: null }), {});

export const toApiFormat = (data: Partial<Case>): CaseData => formatCase(fields, data);
