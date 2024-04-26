import crypto from 'crypto';

import { PcqParameters } from './PcqParameters';

const algorithm = 'aes-256-gcm';
const bufferSize = 16;
const iv = Buffer.alloc(bufferSize, 0); // Initialization vector.
const keyLen = 32;

export const createToken = (params: PcqParameters, tokenKey: string): string => {
  const key = crypto.scryptSync(tokenKey, 'salt', keyLen);

  // Convert all params to string before encrypting
  Object.keys(params).forEach(p => {
    params[p] = String(params[p]);
  });
  const strParams = JSON.stringify(params);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = '';
  encrypted = cipher.update(strParams, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
};
