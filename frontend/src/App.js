import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Navbar } from "./components/navbar"; 
import { Auth } from "./pages/auth";
import { Home } from "./pages/home";
import { SavedRecipes } from "./pages/saved-recipes";
import { MoreDetails } from "./pages/MoreDetails";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/MoreDetails/:id" element={<MoreDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
