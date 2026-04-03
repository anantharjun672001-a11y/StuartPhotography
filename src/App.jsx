import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Outputs from './pages/Outputs';
import Clients from './pages/Clients';
import ClientGallery from './pages/ClientGallery';
import Contact from './pages/Contact';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/outputs' element={<Outputs/>}/>
        <Route path='/clients' element={<Clients/>}/>
        <Route path='/clients/:id' element={<ClientGallery/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;