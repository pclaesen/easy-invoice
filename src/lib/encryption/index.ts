export type EncryptionVersion = "v1";

export function getEncryptionKey(version: EncryptionVersion = "v1"): string {
  return ENCRYPTION_KEYS[version];
}
const ENCRYPTION_KEYS = {
  v1: process.env.ENCRYPTION_KEY as string,
};
