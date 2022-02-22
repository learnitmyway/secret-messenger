import { useState } from "react";
import "./App.css";

function App() {
  const [secretMessageVal, setSecretMessageVal] = useState("");
  return (
    <main className="App">
      <label htmlFor="secret-message-input">Secret Message: </label>
      <input
        id="secret-message-input"
        onChange={(e) => setSecretMessageVal(e.target.value)}
        value={secretMessageVal}
      />
      <div>value: {secretMessageVal}</div>
    </main>
  );
}

export default App;
