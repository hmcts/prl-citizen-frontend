import { Label, LabelFormFormatter, LanguageLookup } from '../types'; // adjust import path

/**
 * Safely resolves a label that could be a string, function, or LabelFormFormatter object.
 */
export function resolveLabel(label?: Label, translations?: Record<string, string>) {
  if (!label) return undefined;

  // Case 1: plain string
  if (typeof label === 'string') {
    return {
      text: label,
    };
  }

  // Case 2: language lookup function
  if (typeof label === 'function') {
    return {
      text: label(translations || {}),
    };
  }

  // Case 3: LabelFormFormatter object
  if (typeof label === 'object' && 'text' in label) {
    const textValue =
      typeof label.text === 'function'
        ? label.text(translations || {})
        : label.text;

    return {
      text: textValue,
      classes: label.classes,
      isPageHeading: label.isPageHeading,
    };
  }

  return undefined;
}

