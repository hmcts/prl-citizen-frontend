import {
  CourtOrderParserHelper,
  courtOrderParentAndChildFieldParser,
  courtOrderSubFieldParser,
  courtTypeOfOrder,
  courtTypeOfOrderHelper,
} from './courtOrderHelper';

describe('courtOrderHelper test case', () => {
  const keys = {
    ca_data_subfield: 'test data',
    ca_data2_subfield: 'test data',
    ca_data3_subfield: 'test data',
  };
  const userCase = {
    ca_data: ['ca_data_subfield', 'ca_data2_subfield', 'ca_data3_subfield', ''],
  };
  const originalListItem = '';

  const userKey = 'ca_data';

  test('courtOrderSubFieldParser functionality testing', () => {
    const data = courtOrderSubFieldParser(userCase, keys, userKey, originalListItem);
    expect(data).toBe(
      '<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1"></li><ul><li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">test data</li>,<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">test data</li>,<li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">test data</li></ul>'
    );
  });

  test('courtOrderParentAndChildFieldParser functionality testing', () => {
    const data = courtOrderParentAndChildFieldParser(userCase, keys, userKey);
    expect(data).toBe('<ul><li>test data</li><li>test data</li><li>test data</li></ul>');
  });

  test('courtTypeOfOrderHelper functionality testing', () => {
    const data = courtTypeOfOrderHelper(userCase, keys, userKey);
    expect(data).toBe('<ul><li>test data</li><li>test data</li><li>test data</li></ul>');
  });

  test('CourtOrderParserHelper functionality testing', () => {
    const data = CourtOrderParserHelper(userCase, keys, userKey);
    expect(data).toBe('<ul><li>test data</li><li>test data</li><li>test data</li></ul>');
  });

  test('courtTypeOfOrder functionality testing', () => {
    const data = courtTypeOfOrder(userCase, keys, userKey);
    expect(data).toBe('<ul><li>test data</li><li>test data</li><li>test data</li></ul>');
  });
});
