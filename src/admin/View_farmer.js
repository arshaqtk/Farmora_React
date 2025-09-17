import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Nav, Button, Container, Table } from "react-bootstrap";

export const View_farmer = () => {
  const [result, getresult] = useState([]);

  useEffect(() => {
    loaddata();
  }, []);

  function loaddata() {
    axios
      .post("/view_farmers")
      .then((response) => {
        getresult(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching farmers:", error);
      });
  }

  const handleLogout = () => {
    window.location = "/";
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f4f4f8" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#343A40",
          color: "white",
          padding: "20px",
          minHeight: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <h3 className="text-center">Admin Panel</h3>
        <Nav className="flex-column">
          <Nav.Link href="/Admin_Manage_officer" style={{ color: "white", padding: "10px" }}>
            Manage Officers
          </Nav.Link>
          <Nav.Link href="/admin_View_farmer" style={{ color: "white", padding: "10px" }}>
            View Farmers
          </Nav.Link>
          <Nav.Link href="/admin_View_complaint" style={{ color: "white", padding: "10px" }}>
            View Complaints
          </Nav.Link>
          <Nav.Link href="/admin_view_user" style={{ color: "white", padding: "10px" }}>
            View Users
          </Nav.Link>
          <Nav.Link href="/admin_view_System_feedback" style={{ color: "white", padding: "10px" }}>
            View Feedback
          </Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: "260px", width: "calc(100% - 260px)" }}>
        {/* Navbar */}
        <Navbar style={{ backgroundColor: "#343A40", padding: "10px" }} variant="dark">
          <Container fluid>
            <Navbar.Brand href="#" style={{ color: "white", fontSize: "20px" }}>
              Dashboard
            </Navbar.Brand>
            <Nav className="ms-auto">
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Container>
        </Navbar>

        {/* Content Area */}
        <div
          style={{
            padding: "20px",
            marginTop: "10px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 className="text-center mb-4" style={{ color: "#0078D7", fontWeight: "bold", marginTop: 70 }}>
           VIEW FARMERS
          </h2>

          <Table striped bordered hover responsive>
            <thead style={{ backgroundColor: "#0078D7", color: "white", textAlign: "left" }}>
              <tr>
                <th>No</th>
                <th>NAME</th>
                <th>GENDER</th>
                <th>PHONE</th>
                <th>USER-NAME</th>
                <th>PLACE</th>
                <th>POST</th>
                <th>PIN</th>
                <th>ADHAR-NO</th>
                <th>PHOTO</th>
              </tr>
            </thead>
            <tbody>
              {result.length > 0 ? (
                result.map((farmer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{farmer.name}</td>
                    <td>{farmer.gender}</td>
                    <td>{farmer.phone}</td>
                    <td>{farmer.LOGIN_id.username}</td>
                    <td>{farmer.place}</td>
                    <td>{farmer.post}</td>
                    <td>{farmer.pin}</td>
                    <td>{farmer.adharno}</td>
                    <td>
                      <img
                        src={farmer.image}
                        alt="farmer"
                        style={{
                          height: "70px",
                          width: "70px",
                          borderRadius: "5px",
                          border: "2px solid #0078D7",
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No Farmers Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
