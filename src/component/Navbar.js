import React, { useState } from "react"
import { Link } from "gatsby"

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const color = () => {
    const string = 'Oleg Grygorenko';
    return (
      <span className="logo">{string}</span>
    )
  }

  return (
    <>
      {color()}
      <div className="menu-btn" onClick={()=> setOpen(!open)}>
        <span className={open ? "menu-btn__burger open" : "menu-btn__burger"}>
        </span>
      </div>
      <nav className={open ? "nav open" :  "nav"}>
        <ul className={open ? "menu-nav open" : "menu-nav"}>
          <li className={open ? "menu-nav__item open" : "menu-nav__item"}>
            <Link
              to="/"
              className="menu-nav__link"
              activeClassName="active-link"
            >
              home
            </Link>
            </li>
             <li className={open ? "menu-nav__item open" : "menu-nav__item"}>
            <Link
              to="/about_me"
              className="menu-nav__link"
              activeClassName="active-link"
            >
              About me
            </Link>
          </li>
          <li className={open ? "menu-nav__item open" : "menu-nav__item"}>
            <Link
              to="/projects"
              className="menu-nav__link"
              activeClassName="active-link"
            >
              Projects
            </Link>
          </li>
          <li className={open ? "menu-nav__item open" : "menu-nav__item"}>
            <Link
              to="/contact"
              className="menu-nav__link"
              activeClassName="active-link"
            >
              Contact
            </Link>
          </li>
          </ul>
      </nav>
    </>
  )
}

export default Navbar
