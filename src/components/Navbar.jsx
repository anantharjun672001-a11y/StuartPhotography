import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 50);
    });
  }, []);

  return (
    <div
      className={`fixed w-full top-0 z-50 px-6 py-4 flex justify-between items-center transition duration-300 
      ${scrolled ? "bg-black shadow-lg" : "bg-transparent"}`}
    >
      {/* LOGO (IMPROVED) */}
      <div className="flex items-center">
        <img
          src="/images/logo_white.png"
          alt="Logo"
          className="h-12 md:h-14 w-auto object-contain"
        />
      </div>

      <div className="flex gap-6 text-white font-poppins">
        <a href="/landing">Home</a>
        <a href="#clients">Clients</a>
        <a href="#outputs">Outputs</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  );
};

export default Navbar;