
import { randomBytes, createHash, createCipheriv, createDecipheriv } from 'node:crypto';

enum hashTypes {
  MD5 = "md5",
  SHA256 = "sha256",
  AES256 = "aes-256-cbc"
}

type EncryptedData = {
  iv: string,
  value: string
}

const valor = 'This is the text we use to work with hash algorithms';

const key = randomBytes(32);
const initVector = randomBytes(16);

const giveMeTheHash = (valor: string, hashType: hashTypes): EncryptedData | void => {
  if (hashType === hashTypes.MD5 || hashType === hashTypes.SHA256) {
    let hash = createHash(hashType)
      .update(valor)
      .digest('hex');
    console.log(hashType, hash);
  } else if (hashType === hashTypes.AES256) {
    let cipher = createCipheriv(hashType, Buffer.from(key), initVector);
    let hash = cipher.update(valor);
    hash = Buffer.concat([hash, cipher.final()]);
    return ({ iv: initVector.toString('hex'), value: hash.toString('hex') });
  }
}

const descriptAES = (encData: EncryptedData) => {
  let initVector = Buffer.from(encData.iv, 'hex');
  let encryptedText = Buffer.from(encData.value, 'hex');
  let decipher = createDecipheriv(hashTypes.AES256, Buffer.from(key), initVector);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return (decrypted.toString());
}

console.time('Execution time');
console.log('Base value:', valor);
console.log('Key:', key);
console.log('Init Vector:', initVector);

giveMeTheHash(valor, hashTypes.MD5);
giveMeTheHash(valor, hashTypes.SHA256);
const cadEncrypt = giveMeTheHash(valor, hashTypes.AES256);
if (cadEncrypt) {
  console.log(hashTypes.AES256, 'Encrypted:', cadEncrypt.value);
  console.log(hashTypes.AES256, 'Decrypted:', descriptAES(cadEncrypt));
}
console.timeEnd('Execution time');