import { useState } from "react";
import { decrypt, encrypt, hash } from "./util.deprecated";

import "./App.css";

function App() {
  const [secretMessageVal, setSecretMessageVal] = useState("");
  const key = "some key";
  const hashedKey = hash({ str: key });

  const encrypted = encrypt({ message: secretMessageVal, key });
  const decrypted = decrypt({ encryptedMessage: encrypted, key });
  const decryptedWithWrongKey = decrypt({
    encryptedMessage: encrypted,
    key: "wrong-key",
  });
  return (
    <main className="App">
      <label htmlFor="secret-message-input">Secret Message: </label>
      <input
        id="secret-message-input"
        onChange={(e) => setSecretMessageVal(e.target.value)}
        value={secretMessageVal}
      />
      <div>key: {key}</div>
      <div>hashedKey: {hashedKey}</div>
      <div>value: {secretMessageVal}</div>
      <div>encrypted: {encrypted}</div>
      <div>decrypted: {decrypted}</div>
      <div>decrypted with wrong key: {decryptedWithWrongKey}</div>
    </main>
  );
}

export default App;
