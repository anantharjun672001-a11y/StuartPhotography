import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isLanding = location.pathname === "/landing"; // landing check

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed w-full top-0 z-50 px-8 py-10 flex justify-between items-center transition duration-300 
      
      ${
        isLanding
          ? scrolled
            ? "bg-black shadow-lg"
            : "bg-transparent"
          : "bg-black shadow-lg" 
      }
      
      `}
    >
      <img src="/images/logo_white.png" className="w-28" />

      <div className="hidden md:flex gap-6 text-white">
        <a href="/landing">Home</a>
        <a href="/clients">Clients</a>
        <a href="/outputs">Outputs</a>
        <a href="/contact">Contact</a>
      </div>
    </div>
  );
};

export default Navbar;