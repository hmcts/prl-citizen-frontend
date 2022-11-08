export function interpolate(str: string, values: Record<string, string>): string {
  return str.replace(/{{(.*?)}}/g, function (match) {
    const key = match.replace(/\{{|\}}/g, '');
    return key in values ? values[key] : '';
  });
}
