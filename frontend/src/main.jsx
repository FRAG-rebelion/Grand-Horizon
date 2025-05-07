import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import Context
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <BrowserRouter>
      <App />
  </BrowserRouter>
</React.StrictMode>
)
