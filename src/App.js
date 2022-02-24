import { useEffect, useState } from "react";

import "./App.css";
import { generateNewPair, encrypt, decrypt } from "./util";

function App() {
  const passphrase = "super long and hard to guess secret";
  const [secretMessageVal, setSecretMessageVal] = useState("");
  const [publicKeyArmored, setPublicKeyArmored] = useState("");
  const [privateKeyArmored, setPrivateKeyArmored] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");

  useEffect(() => {
    async function generateNewPairWrapper() {
      const { publicKeyArmored, privateKeyArmored } = await generateNewPair({
        passphrase,
      });
      setPrivateKeyArmored(privateKeyArmored);
      setPublicKeyArmored(publicKeyArmored);
    }
    generateNewPairWrapper();
  }, []);

  useEffect(() => {
    async function all({ text }) {
      const encrypted = await encrypt({
        text,
        publicKeyArmored,
      });
      setEncrypted(encrypted);
      const decrypted = await decrypt({
        privateKeyArmored,
        passphrase,
        encrypted,
      });
      setDecrypted(decrypted);
    }
    all({ text: secretMessageVal });
  }, [secretMessageVal, privateKeyArmored, publicKeyArmored]);

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
