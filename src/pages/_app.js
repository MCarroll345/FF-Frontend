import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from '../components/layout/Appbar';
import Home from '../components/layout/Home';

function App() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <Router>
      <Appbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;