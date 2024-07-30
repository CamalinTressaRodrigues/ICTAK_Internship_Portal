import React, { useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/company_logo.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 600 ? setSticky(true) : setSticky(false)
    });
  }, []);

  return (
    <nav className={` ${sticky? 'dark-nav': ''} `}>
      <Link to={'/'}>
      <img src={logo} alt="" className="logo" />
      </Link>
    </nav>
  );
};

export default Navbar;
