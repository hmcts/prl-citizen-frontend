/* eslint-disable @typescript-eslint/no-explicit-any */

export function parseUrl(url: string): { url: string } {
  return {
    url: url.replace(/(\?.*)|(#.*)|\/:[A-Za-z?]*/g, ''),
  };
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyParms(url: string, values?: Record<string, string>): string {
  const optionalParamsRegex = new RegExp(/(\/:[A-Za-z]*\?)/, 'g');

  if (values) {
    Object.entries(values).forEach(([param, value]) => {
      url = url.replace(new RegExp(`:${param}`, 'gi'), value);
    });
  }
  url = optionalParamsRegex.test(url) ? url.replace(optionalParamsRegex, '') : url;

  return url;
}
