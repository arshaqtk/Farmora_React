import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button, Container, Table } from "react-bootstrap";

export const View_complaint = () => {
  const [result, getresult] = useState([]);

  useEffect(() => {
    loaddata();
  }, []);

  function loaddata() {
    axios.post('/view_complaint')
      .then((response) => {
        getresult(response.data.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleLogout = () => {
    window.location = "/";
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f1f3f5" }}>
      {/* Sidebar */}
      <div style={{
        width: "250px",
        backgroundColor: "#343A40",
        color: "white",
        padding: "20px",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}>
        <h3 className="text-center">Admin Panel</h3>
        <Nav className="flex-column">
          <Nav.Link href="/Admin_Manage_officer" style={{ color: "white", padding: "10px" }}>Manage Officers</Nav.Link>
          <Nav.Link href="/admin_View_farmer" style={{ color: "white", padding: "10px" }}>View Farmers</Nav.Link>
          <Nav.Link href="/admin_View_complaint" style={{ color: "white", padding: "10px" }}>View Complaints</Nav.Link>
          <Nav.Link href="/admin_view_user" style={{ color: "white", padding: "10px" }}>View Users</Nav.Link>
          <Nav.Link href="/admin_view_System_feedback" style={{ color: "white", padding: "10px" }}>View Feedback</Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: "260px", width: "calc(100% - 260px)" }}>
        {/* Navbar */}
        <Navbar style={{ backgroundColor: "#343A40", padding: "10px" }} variant="dark">
          <Container fluid>
            <Navbar.Brand style={{ color: "white", fontSize: "20px" }}>Dashboard</Navbar.Brand>
            <Nav className="ms-auto">
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            </Nav>
          </Container>
        </Navbar>

        {/* Content Area */}
        <div style={{
          padding: "20px",
          marginTop: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}>
          <h2 className="text-center mb-4" style={{ color: "#0078D7", fontWeight: "bold", marginTop:50 }}>
            Admin: View Complaints
          </h2>

          {/* Table */}
          <Table bordered hover responsive style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
            <thead>
              <tr style={{ backgroundColor: "#0078D7", color: "white", textAlign: "center" }}>
                <th>No</th>
                <th>Farmer Name</th>
                <th>Complaint Title</th>
                <th>Complaint Description</th>
                <th>Reply</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {result.map((s, index) => (
                <tr key={index} style={{
                  textAlign: "center",
                  backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff",
                }}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: "500", color: "#343A40" }}>{s.FARMER_id.name}</td>
                  <td>{s.title}</td>
                  <td>{s.description}</td>
                  <td>{s.reply}</td>
                  <td>{s.date}</td>
                  <td>
                    <Button 
                      variant="success" 
                      size="sm" 
                      style={{ borderRadius: "5px", padding: "5px 10px" }}
                      href={`/Admin_Send_reply/${s._id}`}
                    >
                      Reply
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
