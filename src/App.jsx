import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import GetEstimatePage from './components/design-tool/GetEstimateModel';
import ModularKitchen from './components/designs/ModularKitchen';
import Wardrobe from './components/designs/Wardrobe';
import Footer from './components/common/Footer';
import BedRoom from './components/designs/BedRoom';
import BathRoom from './components/designs/BathRoom';
import LivingRoom from './components/designs/LivingRoom';
import HomeOffice from './components/designs/HomeOffice';
import CrownLuxe from './components/designs/CrownLuxe';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/get-estimate" element={<GetEstimatePage />} />
        <Route path="/luxe" element={<CrownLuxe />} />
        <Route path="/kitchen" element={<ModularKitchen />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/bedroom" element={<BedRoom />} />
        <Route path="bathroom" element={<BathRoom />} />
        <Route path="living-room" element={<LivingRoom />} />
        <Route path="office" element={<HomeOffice />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
