import React, { useState, useEffect } from "react";
import { Switch } from "@material-ui/core"
import "./Navbar.css";

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenue = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  function Child(props) {
    // function handleChange(event) {
    //     // Here, we invoke the callback with the new value
    //     props.onChange(event.target.value);
    // }
   props.num += 1
  
    // return <input value={props.value} onChange={handleChange} />

    console.log(props)
}

  window.addEventListener("resize", showButton);

  useEffect(() => {
    showButton();
  }, []);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="navbar-logo" onClick={closeMobileMenue}>
            Rafael Valdez<i className="fas fa-flag"></i>
          </a>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-bars" : "fas fa-times"} />
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <a href="/" className="nav-links" onClick={closeMobileMenue}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/services"
                className="nav-links"
                onClick={closeMobileMenue}
              >
                Tecnologies
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/products"
                className="nav-links"
                onClick={closeMobileMenue}
              >
                Resume
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/products"
                className="nav-links"
                onClick={closeMobileMenue}
              >
                Contact
              
              </a>
            </li>
            <li className="nav-item">
            <button onClick={props.changeLanguage} class="nav-links">ChangeLanguage</button>
            </li>
            <li className="nav-item">
            <Switch checked={props.darkMode} onChange={props.darkModeChange}/>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
