export function parseUrl(url: string): { url: string } {
  return {
    url: url.replace(/(\?.*)|(#.*)|\/:[A-Za-z]*/g, ''),
  };
}

export function applyParms(url: string, values: Record<string, string>): string {
  Object.entries(values).forEach(([param, value]) => {
    url = url.replace(new RegExp(`:${param}`, 'gi'), value);
  });

  return url;
}
