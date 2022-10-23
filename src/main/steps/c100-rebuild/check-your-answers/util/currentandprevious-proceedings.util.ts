/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const IndividualOrderFieldsParser = (keys, order) => {
  console.log(order);
  const Mapper = {
    ['orderDetail']: {
      val: keys['courtIssuedLabel'],
    },
    ['caseNo']: {
      val: keys['caseNumberLabel'],
    },
    ['orderDate']: {
      val: keys['orderDateLabel'],
    },
    ['currentOrder']: {
      val: keys['isCurrentOrderLabel'],
    },
    ['orderCopy']: {
      val: keys['copyOfOrderLabel'],
    },
  };
  let Val = '';
  Object.entries(order).forEach(entry => {
    const key = entry[0];
    const value = entry[1];
    const keyDetails = '<h4>' + Mapper[key]?.val + '</h4>';
    const valueDetails = '<p>' + value + '</p>';
    Val += keyDetails + valueDetails;
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
        orderSessionStorage.push({
          key: `${keys[`${order}Label`]} ${index + 1}`,
          valueHtml: IndividualOrderFieldsParser(keys, nestedOrder),
          changeUrl: '',
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
