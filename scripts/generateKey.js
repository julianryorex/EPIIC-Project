// testing out key encryption for Google private key security.

const arrayBufferToHex = require("array-buffer-to-hex");
const fs = require('fs');
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
// console.log("Key: " + arrayBufferToHex(key));
// console.log("iv: " + privateKeyEnc.iv);
// console.log("encrypted: ");
// console.log(privateKeyEnc.encryptedData);

fs.writeFile("./assets/key.bin", arrayBufferToHex(key), (err) => {
    if (err) return console.log(err);
    console.log("key.txt created.");
});

fs.writeFile("./assets/iv.bin", privateKeyEnc.iv, (err) => {
	if (err) return console.log(err);
	console.log("iv.txt created.");
});

fs.writeFile("./assets/googlePrivateKeyEncrypted.bin", privateKeyEnc.encryptedData, null, (err) => {
	if (err) return console.log(err);
	console.log("googlePrivateKeyEncrypted.txt created.");
});

fs.writeFile("./assets/googlePrivateKeyDecrypted.txt", decrypt(privateKeyEnc), (err) => {
	if (err) return console.log(err);
	console.log("googlePrivateKeyDecrypted.txt created.");
});


