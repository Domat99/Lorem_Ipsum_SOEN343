import React from "react";
import Navbar from "./NavBar/NavBar";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./HomePage/HomePage";

function App() {
  return (
      <Router>
        <div className="App">
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<HomePage/>} ></Route>
          </Routes>
        </div>
      </Router>

  );
}

export default App;