import * as CryptoJS from "crypto-js";

const SECRET_KEY = "7mQdPX+eI7Bq9Z9S5BzH+I3j9DFlJpAvZ52Y6cPFL4c="; // Defina uma chave segura

export function encryptData(data: unknown): string {
  const jsonData = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonData, SECRET_KEY).toString();
}

export function decryptData(encryptedData: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
