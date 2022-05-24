import { Case, FieldPrefix } from '../case';

export const getFormattedAddress = (data: Partial<Case>, prefix: FieldPrefix): string => {
  let address: string[] = [];

  address.push(data[`${prefix}Address1`] || '');
  address.push(data[`${prefix}Address2`] || '');
  address.push(data[`${prefix}Address3`] || '');
  address.push(data[`${prefix}AddressTown`] || '');
  address.push(data[`${prefix}AddressCounty`] || '');
  address.push(data[`${prefix}AddressPostcode`] || '');
  address.push(data[`${prefix}AddressCountry`] || '');

  //remove empty items
  address = address.filter(item => !!item);

  return address.join('<br>');
};
