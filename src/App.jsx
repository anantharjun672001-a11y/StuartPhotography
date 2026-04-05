import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Outputs from "./pages/Outputs";
import ClientGallery from "./pages/ClientGallery";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import ClientsList from "./pages/ClientsList";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/outputs" element={<Outputs />} />
        <Route path="/clients" element={<ClientsList />} />
        <Route path="/clients/:id" element={<ClientGallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;