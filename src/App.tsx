import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home/page';
import Nominate from './pages/Nominate/page';
import Map from './pages/Map/page';
import Admin from './pages/Admin/page';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-cafe-light">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nominate" element={<Nominate />} />
          <Route path="/map" element={<Map />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

