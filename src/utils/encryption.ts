import crypto from "crypto";
import { SECRET } from "./env";


export const encrypt = (key: string, plainText: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key.slice(0,64)), Buffer.from(iv));
  let encrypted = cipher.update(plainText, 'utf8','hex');
  encrypted +=  cipher.final('hex');
  return `${iv.toString("hex")}:${encrypted}`;
};

export const decrypt = (key: string, plainText: string) : string => {
  const textParts = plainText.split(":");
  const iv = Buffer.from(textParts.shift() as string, "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key.slice(0, 64)), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

