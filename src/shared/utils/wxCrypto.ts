/*
 * @Author: wuqianying
 * @Date: 2022-05-01 16:18:23
 * @LastEditors: wuqianying
 * @LastEditTime: 2022-05-01 16:24:48
 */
import { Crypto } from 'cryptojs';

export default function WXCrypto(appId, sessionKey) {
  this.appId = appId;
  this.sessionKey = sessionKey;
}

WXCrypto.prototype.decryptData = function (encryptedData, iv) {
  let decryptResult;
  // base64 decode ：使用 CryptoJS 中 Crypto.util.base64ToBytes()进行 base64解码
  const key = Crypto.util.base64ToBytes(this.sessionKey);
  encryptedData = Crypto.util.base64ToBytes(encryptedData);
  iv = Crypto.util.base64ToBytes(iv);

  // 对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充
  const mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);

  try {
    // 解密
    const bytes = Crypto.AES.decrypt(encryptedData, key, {
      asBpytes: true,
      iv: iv,
      mode: mode,
    });

    decryptResult = JSON.parse(bytes);
  } catch (err) {
    console.log(err);
  }

  return decryptResult;
};
