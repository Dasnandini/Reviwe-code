import crypto from "crypto";

const KEY = process.env.PROVIDER_ENCRYPTION_KEY;
if (!KEY) {
  throw new Error("PROVIDER_ENCRYPTION_KEY is not defined in environment variables.");
}

const KEY_BUF = Buffer.from(KEY, "utf8");

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", crypto.createHash("sha256").update(KEY_BUF).digest(), iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("base64")}:${tag.toString("base64")}:${encrypted.toString("base64")}`;
};

export const decrypt = (data: string): string => {
  const [ivB64, tagB64, encryptedB64] = data.split(":");
  if (!ivB64 || !tagB64 || !encryptedB64) return "";
  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");
  const encrypted = Buffer.from(encryptedB64, "base64");
  const decipher = crypto.createDecipheriv("aes-256-gcm", crypto.createHash("sha256").update(KEY_BUF).digest(), iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf8");
};

export default { encrypt, decrypt };
