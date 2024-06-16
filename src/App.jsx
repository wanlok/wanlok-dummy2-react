import "./App.css";

import React, { useState, useEffect } from "react";

function GitHubUser({ login }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
      .then((res) => {
        const json = res.json();
        return json;
      })
      .then((data) => {
        setData(data);
      })
      .catch(console.error);
  }, []);
  if (data) {
    return (
      <div>
        <h1>{data.login}</h1>
        <img src={data.avatar_url} width={100} />
      </div>
    );
  }
}

function App() {
  return (
    <>
      <GitHubUser login="wanlok" />
    </>
  );
}

export default App;
