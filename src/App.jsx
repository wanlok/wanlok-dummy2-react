import "./App.css";

import React, { useState, useEffect } from 'react';

function GitHubUser({ login }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`https://api.github.com/useres/${login}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (data) {
    return <div>{JSON.stringify(data)}</div>;
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
