import { decrypt, encrypt, hash } from "./util";

describe("Secret.util", () => {
  it("encryption followed by decryption results in same message", () => {
    const message = "some message";
    const key = hash({ str: "some key" });
    const encryptedMessage = encrypt({ message, key });
    expect(decrypt({ encryptedMessage, key })).toBe(message);
  });

  it("encrypts and decryption of an empty string", () => {
    const message = "";
    const key = hash({ str: "some key" });
    const encryptedMessage = encrypt({ message, key });
    expect(decrypt({ encryptedMessage, key })).toBe(message);
  });

  it("encrypt message twice", () => {
    const message = "some message";
    const key = hash({ str: "some key" });
    const encryptedMessage = encrypt({ message, key });
    const encryptedMessage2 = encrypt({ message, key });
    expect(encryptedMessage).not.toBe(encryptedMessage2);
  });

  describe("when the key is incorrect", () => {
    it("decrypts to empty string", () => {
      const message = "some message";
      const key = hash({ str: "some key" });
      const encryptedMessage = encrypt({ message, key });
      expect(
        decrypt({ encryptedMessage, key: hash({ str: "other key" }) })
      ).toBe("");
    });
  });

  describe("when the key is not hashed", () => {
    it("decrypts to empty string", () => {
      const message = "some message";
      const key = "some key";
      const hashedKey = hash({ str: key });
      const encryptedMessage = encrypt({ message, key: hashedKey });
      expect(
        decrypt({ encryptedMessage, key: hash({ str: "other key" }) })
      ).toBe("");
    });
  });
});
