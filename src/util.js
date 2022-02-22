import CryptoJS from "crypto-js";

export function encrypt({ message, key }) {
  return CryptoJS.AES.encrypt(message, key).toString();
}

export function decrypt({ encryptedMessage, key }) {
  return CryptoJS.AES.decrypt(encryptedMessage, key).toString(
    CryptoJS.enc.Utf8
  );
}

export function hash({ str }) {
  return CryptoJS.SHA512(str).toString(CryptoJS.enc.Base64);
}
