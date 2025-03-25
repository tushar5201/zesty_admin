import React, { useContext } from 'react'
import { Container, NavDropdown } from "react-bootstrap"
import "../assets/css/header.css"
import { SidebarContext } from '../context/sidebarContext';
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const { toggleSidebar } = useContext(SidebarContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("username");
        navigate("/admin/signin");
    }

    return (<>
        <header className='navbar navbar-expand-lg justify-content-start'>
            <Container>
                <button className='sidebar-toggle' onClick={() => toggleSidebar()}>
                    <i className='fa fa-bars'></i>
                </button>
                <a href="" className="">
                    <h1 className='logo'>Zesty</h1>
                </a>
                <div className="user-info">
                    <Link to="/admin/notifications" style={{ color: "black" }}>
                        <i class="fa-solid fa-bell"></i>
                    </Link>
                    <NavDropdown className='info-name' title="Admin" id='dropdown'>
                        <NavDropdown.Item disabled href='#'><h5 style={{ color: "black", width: "200px", margin: "10px 10px 10px 0" }}>Welcome back</h5></NavDropdown.Item>
                        <NavDropdown.Item disabled href='#'><p style={{ color: "" }}>Admin</p></NavDropdown.Item>
                        <NavDropdown.Item className='nav-link' onClick={handleLogout}>
                            <i className="fa-solid fa-arrow-right-from-bracket" style={{ fontSize: "18px", color: "red" }}></i>
                            <span style={{ color: "red" }}>Log Out</span>
                        </NavDropdown.Item>
                    </NavDropdown>
                </div>
            </Container>
        </header>

    </>
    )
}
