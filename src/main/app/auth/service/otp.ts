let _otplib: typeof import('otplib') | null = null;

async function getOtpLib() {
  if (!_otplib) {
    _otplib = await import('otplib');
  }
  return _otplib;
}

export const generateOTP = async (secret: string): Promise<string> => {
  const { generate } = await getOtpLib();
  return generate({ secret });
};
