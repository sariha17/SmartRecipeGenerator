import React from 'react';
import ReactDOM from "react-dom/client";

const App = () => {
  return <h1>Smart Recipe!</h1>;
};

const root = ReactDOM.createRoot(document.getElementById('contents')); // Create a root container
root.render(<App />);