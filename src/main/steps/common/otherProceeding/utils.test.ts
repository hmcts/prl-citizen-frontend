import { ProceedingsOrderInterface } from '../../../app/case/definition';

import { IndividualOrderFieldsParser } from './utils';

describe('Common > Other Proceeding > Utils', () => {
  const keys = {};

  test('should parse order field for c100', () => {
    expect(
      IndividualOrderFieldsParser(
        keys,
        {
          id: '1',
          orderDetail: 'test',
          caseNo: '1234',
          orderDate: {
            year: '1',
            month: '1',
            day: '2025',
          },
          currentOrder: 'Yes',
          orderEndDate: {
            year: '1',
            month: '1',
            day: '2025',
          },
          orderCopy: 'No',
        } as unknown as ProceedingsOrderInterface,
        'en',
        'c100-rebuild'
      )
    ).toEqual(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">test</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">1234</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">18 July 1906</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">18 July 1906</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">No</dd></div></dl>'
    );
  });

  test('should parse order field for c100 with order document', () => {
    expect(
      IndividualOrderFieldsParser(
        keys,
        {
          id: '1',
          orderDetail: 'test',
          caseNo: '1234',
          orderDate: {
            year: '1',
            month: '1',
            day: '2025',
          },
          currentOrder: 'Yes',
          orderEndDate: {
            year: '1',
            month: '1',
            day: '2025',
          },
          orderCopy: 'Yes',
          orderDocument: {
            document_url: 'URL',
            document_filename: 'Filename',
            document_binary_url: 'Binary URL',
          },
        } as unknown as ProceedingsOrderInterface,
        'en',
        'c100-rebuild'
      )
    ).toEqual(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">test</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">1234</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">18 July 1906</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">18 July 1906</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">Yes</dd></div></dl>'
    );
  });

  test('should parse order field for tasklistresponse', () => {
    expect(
      IndividualOrderFieldsParser(
        keys,
        {
          id: '1',
          orderDetail: 'test',
          caseNo: '1234',
          orderDate: {
            year: '1',
            month: '1',
            day: '2025',
          },
          currentOrder: 'Yes',
          orderEndDate: {
            year: '1',
            month: '1',
            day: '2025',
          },
          orderCopy: 'No',
        } as unknown as ProceedingsOrderInterface,
        'en',
        'respondent'
      )
    ).toEqual(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">test</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">1234</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">18 July 1906</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">18 July 1906</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">No</dd></div></dl>'
    );
  });

  test('should parse order field with order document for tasklistresponse', () => {
    expect(
      IndividualOrderFieldsParser(
        keys,
        {
          id: '1',
          orderDetail: 'test',
          caseNo: '1234',
          orderDate: {
            year: '1',
            month: '1',
            day: '2025',
          },
          currentOrder: 'Yes',
          orderEndDate: {
            year: '1',
            month: '1',
            day: '2025',
          },
          orderCopy: 'Yes',
          orderDocument: {
            document_url: 'URL',
            document_filename: 'Filename',
            document_binary_url: 'Binary URL',
          },
        } as unknown as ProceedingsOrderInterface,
        'en',
        'respondent'
      )
    ).toEqual(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">test</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">1234</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">18 July 1906</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">18 July 1906</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">Yes</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">No</dd></div></dl>'
    );
  });

  test('should parse order field for tasklistresponse with order document with undefined', () => {
    expect(
      IndividualOrderFieldsParser(
        keys,
        {
          id: '1',
          orderDetail: 'test',
          caseNo: '1234',
          orderDate: {
            year: '1',
            month: '1',
            day: '2025',
          },
          currentOrder: undefined,
          orderEndDate: {
            year: '1',
            month: '1',
            day: '2025',
          },
          orderCopy: undefined,
          orderDocument: 'undefined',
        } as unknown as ProceedingsOrderInterface,
        'en',
        'respondent'
      )
    ).toEqual(
      '<dl class="govuk-summary-list"><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">test</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">1234</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">18 July 1906</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">undefined</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">18 July 1906</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row"><dd class="govuk-summary-list__value">undefined</dd></div><div class="govuk-summary-list__row border-bottom--none"><dt class="govuk-summary-list__key">undefined</dt></div><div class="govuk-summary-list__row border-bottom--none"><dd class="govuk-summary-list__value">No</dd></div></dl>'
    );
  });
});
