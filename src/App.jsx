import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Formulaire from "./composant/formulaire";
import Connexion from "./composant/connexion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulaire />} />
        <Route path="connexion" element={<Connexion />} />
      </Routes>
    </Router>
  );
}

export default App;
