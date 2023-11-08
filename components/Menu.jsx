import React from "react";
import { useState } from "react";

import logo from "../img/logoRG.png"
function Menu() {
    
    const [link1, setLink1] = useState(true)
    const [link2, setLink2] = useState(false)
    const [link3, setLink3] = useState(false)
    const linkClic1 = ()=>{
        setLink1(true);
        setLink2(false);
        setLink3(false);
    }
    const linkClic2 = ()=>{
        setLink1(false);
        setLink2(true);
        setLink3(false);
    }
    const linkClic3 = ()=>{
        setLink1(false);
        setLink2(false);
        setLink3(true);
    }

    return(
        <nav className="navbar navbar-expand-sm bg-darkk bg-transparent navbar-dark bg-gradientt">
        <div className="container-fluid">
        <a className="navbar-brand" href="/#">
        <img src={logo} alt="Rutas Gateras Logo" width="auto" height="30"/>
        </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="d-flex justify-content-around w-50 navbar-nav">
                <li className="nav-item">
                <a className={`nav-link ${link1 ? "subselected" : ""}`} href="/#1" onClick={linkClic1}>Gatas del Río</a>
                </li>
                <li className="nav-item">
                <a className={`disabled nav-link ${link2 ? "subselected" : ""}`} href="/#2" onClick={linkClic2}>Más Historias</a>
                </li>
                <li className="nav-item">
                <a className={`disabled nav-link ${link3 ? "subselected" : ""}`} href="/#3" onClick={linkClic3}>Conoce más</a>
                </li>    
            </ul>
            </div>
        </div>
        </nav>
    );
}
export default Menu;