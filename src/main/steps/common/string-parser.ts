export function interpolate(str: string, values: Record<string, string>): string {
  return str.replace(/{([^{}]*)}/g, function (match, key) {
    return key in values ? values[key] : match;
  });
}
