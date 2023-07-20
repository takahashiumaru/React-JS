import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import { Analytics } from '@vercel/analytics/react';
const Root = () => {
  return (
    <Router basename="/"> {/* Replace "your-app-name" with your actual app name */}
      <App />
      <Analytics />
    </Router>
  );
};

export default Root;