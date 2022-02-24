import * as openpgp from "openpgp";

export async function generateNewPair({ passphrase }) {
  const { privateKey, publicKey, revocationCertificate } =
    await openpgp.generateKey({
      type: "ecc", // Type of the key, defaults to ECC
      curve: "curve25519", // ECC curve name, defaults to curve25519
      userIDs: [{ name: "Jon Smith", email: "jon@example.com" }], // you can pass multiple user IDs
      passphrase, // protects the private key
      format: "armored", // output key format, defaults to 'armored' (other options: 'binary' or 'object')
    });

  return {
    privateKeyArmored: privateKey,
    publicKeyArmored: publicKey,
    revocationCertificate,
  };
}

export async function encrypt({ text, publicKeyArmored }) {
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
  return await openpgp.encrypt({
    message: await openpgp.createMessage({ text }), // input as Message object
    encryptionKeys: publicKey,
  });
}

export async function decrypt({ privateKeyArmored, passphrase, encrypted }) {
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({
      armoredKey: privateKeyArmored,
    }),
    passphrase,
  });

  const message = await openpgp.readMessage({
    armoredMessage: encrypted, // parse armored message
  });

  const { data: decrypted } = await openpgp.decrypt({
    message,
    decryptionKeys: privateKey,
  });
  return decrypted;
}
