const arrayBufferToHex = require("array-buffer-to-hex");
const crypto = require('crypto');
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const privateKey = require("../privatekey.json");

const encrypt = (text) => {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

const decrypt = (text) => {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

let privateKeyEnc = encrypt(JSON.stringify(privateKey));
console.log("Key: " + arrayBufferToHex(key));
console.log("iv: " + arrayBufferToHex(iv));
console.log("encrypted: ");
console.log(privateKeyEnc);

console.log("Decrypt: ");
console.log(decrypt(privateKeyEnc));
