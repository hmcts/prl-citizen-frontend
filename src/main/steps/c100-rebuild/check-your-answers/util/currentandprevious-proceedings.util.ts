/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const DATE_FORMATTOR = (date): string => {
  if (date['year'] !== '' && date['month'] !== '' && date['day'] !== '') {
    const formated_Date = new Date(date['year'], date['month'], date['day']);
    const month = formated_Date.toLocaleString('default', { month: 'long' });
    return formated_Date.getDate() + ' ' + month + ' ' + formated_Date.getFullYear();
  } else {
    return '';
  }
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const IndividualOrderFieldsParser = (keys, order) => {
  delete order['id'];
  const Mapper = {
    ['orderDetail']: {
      question: keys['courtIssuedLabel'],
    },
    ['caseNo']: {
      question: keys['caseNumberLabel'],
    },
    ['orderDate']: {
      question: keys['orderDateLabel'],
    },
    ['currentOrder']: {
      question: keys['isCurrentOrderLabel'],
    },
    ['orderCopy']: {
      question: keys['copyOfOrderLabel'],
    },
    ['orderEndDate']: {
      question: keys['orderEndDateLabel'],
    },
  };
  let Val = '';
  Object.entries(order).forEach(entry => {
    const key = entry[0];
    const value = entry[1];
    if (typeof entry[1] === 'object' && entry[1] !== null) {
      const keyDetails = '<h4>' + Mapper[key]?.question + '</h4>';
      const valueDetails = '<p>' + DATE_FORMATTOR(value) + '</p>';
      Val += keyDetails + valueDetails;
    } else {
      const keyDetails = '<h4>' + Mapper[key]?.question + '</h4>';
      const valueDetails = '<p>' + value + '</p>';
      Val += keyDetails + valueDetails;
    }
  });

  return Val;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const OPotherProceedingsSessionParserUtil = (UserCase, keys, URLS, sessionKey) => {
  const orderSessionStorage = [] as { key: string; valueHtml: string; changeUrl: string }[];

  UserCase[sessionKey].forEach(order => {
    if (UserCase['op_otherProceedings']?.['order'].hasOwnProperty(`${order}s`)) {
      const orderDetails = UserCase['op_otherProceedings']?.['order'][`${order}s`];
      orderDetails.forEach((nestedOrder, index) => {
        const IndexNumber = index > 0 ? index + 1 : '';
        orderSessionStorage.push({
          key: `${keys[`${order}Label`]} ${IndexNumber}`,
          valueHtml: IndividualOrderFieldsParser(keys, nestedOrder),
          changeUrl: URLS['C100_OTHER_PROCEEDINGS_ORDER_DETAILS'] + `?orderType=${order}`,
        });
      });
    }
  });

  console.log(orderSessionStorage);
  if (UserCase.hasOwnProperty(sessionKey)) {
    return orderSessionStorage;
  } else {
    return [{}];
  }
};
