import { useState } from "react";
import { decrypt, encrypt, hash } from "./util";

import "./App.css";

function App() {
  const [secretMessageVal, setSecretMessageVal] = useState("");
  const key = hash({ str: "some key" });

  const encrypted = encrypt({ message: secretMessageVal, key });
  const decrypted = decrypt({ encryptedMessage: encrypted, key });
  return (
    <main className="App">
      <label htmlFor="secret-message-input">Secret Message: </label>
      <input
        id="secret-message-input"
        onChange={(e) => setSecretMessageVal(e.target.value)}
        value={secretMessageVal}
      />
      <div>value: {secretMessageVal}</div>
      <div>encrypted: {encrypted}</div>
      <div>decrypted: {decrypted}</div>
    </main>
  );
}

export default App;
