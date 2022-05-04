import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"
import {LawnTask} from "./lawntask"


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  <Router>
    <LawnTask/>
  </Router>
  
);


