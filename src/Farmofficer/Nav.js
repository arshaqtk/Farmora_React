import React from "react";
import { Navbar, Nav, NavDropdown,Button, Container } from 'react-bootstrap';
import './Assets/css/Nav.css';

const handleLogout = () => {
  window.location = "/";
};
export const NavBar = () => {
  return (
    <Navbar expand="lg" className="main-navbar px-4 py-3 shadow-sm fixed-top" style={{ backgroundColor: "#A3C86D" }}>
      <Container>
        {/* Logo / Brand */}
        <Navbar.Brand href="/Farm_officer_Home" className="p-0 fw-bold d-flex align-items-center" style={{ color: "#FFFFFF" }}>
         <h3>FARMORA</h3>
        </Navbar.Brand>


        {/* Mobile Toggle Button */}
        <Navbar.Toggle aria-controls="navbarCollapse">
          <span className="fa fa-bars" style={{ color: "#3D550C" }}></span>
        </Navbar.Toggle>

        {/* Navbar Links */}
        <Navbar.Collapse id="navbarCollapse">
          <Nav className="ms-auto">
            <Nav.Link href="/Farm_officer_Home" className="mx-2 fw-semibold" style={{ color: "#3D550C" }}>Home</Nav.Link>
            {/* <Nav.Link href="about.html" className="mx-2 fw-semibold" style={{ color: "#3D550C" }}>About</Nav.Link> */}

            {/* Services Dropdown */}
            <NavDropdown title="Services" id="services-dropdown" className="mx-2 fw-semibold">
              <NavDropdown.Item href="/Farm_officer_Send_Public_notification">Notify Farmers</NavDropdown.Item>
              <NavDropdown.Item href="/Farm_officer_View_Public_notification">View Notifications</NavDropdown.Item>
              <NavDropdown.Item href="/Farm_officer_View_farmer">View Farmers</NavDropdown.Item>
              <NavDropdown.Item href="/Farm_officer_View_subsidy">Subsidy</NavDropdown.Item>
              <NavDropdown.Item href="/Farm_officer_View_scheme">Schemes</NavDropdown.Item>
              <NavDropdown.Item href="/Farm_officer_Doubts">Doubts</NavDropdown.Item>
            </NavDropdown>

            {/* Products Dropdown */}
            <NavDropdown title="Products" id="products-dropdown" className="mx-2 fw-semibold">
              <NavDropdown.Item href="/Farm_officer_View_machinery">Machinery</NavDropdown.Item>
              <NavDropdown.Item href="/Farm_officer_Machinery_Order">Machinery Order</NavDropdown.Item>
              <NavDropdown.Item href="/Farm_officer_View_plants">Plants</NavDropdown.Item>
              <NavDropdown.Item href="/Farm_officer_Plant_Order">Plant Order</NavDropdown.Item>
            </NavDropdown>

            <Nav className="ms-auto">
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
