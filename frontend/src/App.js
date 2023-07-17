import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Navbar } from "./components/navbar"; 
import { Auth } from "./pages/auth";
import { Home } from "./pages/home";
import { SavedRecipes } from "./pages/savedRecipes";
import { MoreDetails } from "./pages/moreDetails";
require('dotenv').config();
function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/more-details/:id" element={<MoreDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
