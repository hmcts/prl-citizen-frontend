import { createGuardrails } from '@otplib/core';

// The secret is only 10 bytes, but otplib v13 requires a minimum of 16 bytes.
// This guardrail override is a temporary workaround until the secret is rotated to a valid length
const customGuardrails = createGuardrails({
  MIN_SECRET_BYTES: 10,
});

let _otplib: typeof import('otplib') | null = null;

async function getOtpLib() {
  _otplib ??= await import('otplib');
  return _otplib;
}

export const generateOTP = async (secret: string): Promise<string> => {
  const { generate } = await getOtpLib();
  return generate({ secret, guardrails: customGuardrails });
};
