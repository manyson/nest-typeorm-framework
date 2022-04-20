import * as crypto from "crypto";

/**
 * 비밀번호 해시값
 * param plainPassword {string} 비밀번호
 * param salt {string} salt
 * returns {Promise<string>}
 */
export const makePasswordHashed = (plainPassword: string, salt: string): Promise<string>=> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      resolve(key.toString('base64'));
    });
  });
};


/**
 * 해시를 위한 Salt 문자열 만들기
 * returns {Promise<string>} Salt
 */
export const createSalt = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString('base64'));
    });
  });
};
