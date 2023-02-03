/* eslint-disable  @typescript-eslint/no-explicit-any */
export const getAddress = (language: string, addresses: Record<any, any>[] = []): Record<any, any>[] => {
  const hasMoreAddressesText = addresses?.length > 1 ? 'es' : '';
  return [
    {
      attributes: { id: 'totalAddressesFound' },
      value: -1,
      text:
        language === 'en'
          ? `${addresses?.length} address${hasMoreAddressesText} found`
          : `Daethpwyd o hyd i ${addresses.length} cyfeiriad`,
      selected: true,
    },
    ...getAddressItems(addresses),
  ];
};

const getAddressItems = addresses => addresses.map((item, index) => ({ text: item.fullAddress, value: index }));
