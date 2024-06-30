import React, { useState } from "react";
import axios from "axios";
import Result from "./Result";

const Main = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/execute", {
        code,
        language,
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      setResult("Error executing code");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} />
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="ruby">Ruby</option>
          {/* Add more languages here */}
        </select>
        <button type="submit">Run Code</button>
      </form>
      <Result result={result} />
    </div>
  );
};

export default Main;
