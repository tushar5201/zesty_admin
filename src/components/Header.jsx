import React, { useContext } from 'react'
import { Container, NavDropdown } from "react-bootstrap"
import "../assets/css/header.css"
import { SidebarContext } from '../context/sidebarContext';
import { Link } from "react-router-dom"

export default function Header() {
    const { toggleSidebar } = useContext(SidebarContext);

    return (<>
        <header className='navbar navbar-expand-lg justify-content-start'>
            <Container>
                <button className='sidebar-toggle' onClick={() => toggleSidebar()}>
                    <i className='fa fa-bars'></i>
                </button>
                <a href="" className="">
                    <h1 className='logo'>Zesty</h1>
                </a>
                {/* <form className="d-flex">
                    <input className="form-control me-2 bg-light border-black" type="search" placeholder="Search" aria-label="Search" />
                </form> */}
                <div className="user-info">
                    {/* <div className="info-img img-fit-cover">
                        <img src={personsImgs.person_one} alt="" />
                    </div> */}
                    <NavDropdown className='info-name' title="Tushar" id='dropdown'>
                        <NavDropdown.Item disabled href='#'><h5 style={{ color: "black", width: "200px", margin: "10px 10px 10px 0" }}>Welcome back</h5></NavDropdown.Item>
                        <NavDropdown.Item disabled href='#'><p style={{ color: "" }}>Admin</p></NavDropdown.Item>
                        <NavDropdown.Item href='#' className='nav-link'>
                            <i class="fa-solid fa-gear" style={{ fontSize: "18px" }}></i>
                            Account Setting
                        </NavDropdown.Item>
                        <NavDropdown.Item href='#' className='nav-link'>
                            <i className="fa-solid fa-arrow-right-from-bracket" style={{ fontSize: "18px", color: "red" }}></i>
                            <span style={{color: "red"}}>Log Out</span>
                        </NavDropdown.Item>
                    </NavDropdown>
                    {/* <span className='info-name nav-link dropdown-toggle' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id='dropdown1'>Tushar</span> */}
                </div>
            </Container>
        </header>

    </>
    )
}
