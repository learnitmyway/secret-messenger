import { decrypt, encrypt, generateNewPair } from "./util";

describe("util", () => {
  it("generates new pair, encrypts then decrypts", async () => {
    const passphrase = "super long and hard to guess secret";
    const { publicKeyArmored, privateKeyArmored } = await generateNewPair({
      passphrase,
    });
    const text = "Hello, World!";
    const encrypted = await encrypt({
      text,
      publicKeyArmored,
    });
    const decrypted = await decrypt({
      privateKeyArmored,
      passphrase,
      encrypted,
    });
    expect(decrypted).toBe(text);
  });

  it("generates new pair, encrypt message twice", async () => {
    const passphrase = "super long and hard to guess secret";
    const { publicKeyArmored } = await generateNewPair({
      passphrase,
    });
    const text = "some message";
    const encryptedMessage = await encrypt({ text, publicKeyArmored });
    const encryptedMessage2 = await encrypt({ text, publicKeyArmored });
    expect(encryptedMessage).not.toBe(encryptedMessage2);
  });

  it("generates new pair, encrypts then decrypts with wrong passphrase", async () => {
    const passphrase = "super long and hard to guess secret";
    const { publicKeyArmored, privateKeyArmored } = await generateNewPair({
      passphrase,
    });
    const text = "Hello, World!";
    const encrypted = await encrypt({
      text,
      publicKeyArmored,
    });
    await expect(
      decrypt({
        privateKeyArmored,
        passphrase: "wrong passphrase",
        encrypted,
      })
    ).rejects.toThrow("Error decrypting private key: Incorrect key passphrase");
  });
});
