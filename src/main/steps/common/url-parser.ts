export function parseUrl(url: string): { url: string } {
  return {
    url: url.replace(/(\?.*)|(#.*)|\/:[A-Za-z?]*/g, ''),
  };
}

export function applyParms(url: string, values: Record<string, string>): string {
  const optionalParamsRegex = new RegExp(/(\/:[A-Za-z]*\?)/, 'g');

  Object.entries(values).forEach(([param, value]) => {
    url = url.replace(new RegExp(`:${param}`, 'gi'), value);
  });

  url = optionalParamsRegex.test(url) ? url.replace(optionalParamsRegex, '') : url;

  return url;
}
