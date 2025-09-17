import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Navbar, Nav, Button, Container, Table } from "react-bootstrap";

export const Manage_officer = () => {
  const [result, getResult] = useState([]);

  useEffect(() => {
    loaddata();
  }, []);

  function loaddata() {
    axios
      .post("/view_officer")
      .then((response) => {
        getResult(response.data.data || []);
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response);
        }
      });
  }

  function acceptOfficer(lid) {
    axios
      .post("/Admin_Accept_officer", { off_lid: lid })
      .then((response) => {
        Swal.fire({
          title: "Accepted!",
          text: response.data.status,
          icon: "success",
          confirmButtonColor: "#28A745",
        });
        loaddata();
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonColor: "#DC3545",
        });
      });
  }

  function rejectOfficer(lid) {
    axios
      .post("/Admin_Reject_officer", { off_lid: lid })
      .then((response) => {
        Swal.fire({
          title: "Rejected!",
          text: response.data.status,
          icon: "success",
          confirmButtonColor: "#DC3545",
        });
        loaddata();
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonColor: "#DC3545",
        });
      });
  }

  function showImageFullScreen(imageUrl) {
    Swal.fire({
      imageUrl,
      imageWidth: 400,
      imageHeight: 400,
      imageAlt: "Officer Image",
      showConfirmButton: false,
      background: "#fff",
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
    padding: "18px",
    marginTop: "10px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  }}
>
  <h2
    className="text-center mb-4"
    style={{ color: "#0078D7", fontWeight: "bold", marginTop: 70, fontSize: "1.75rem" }}
  >
    MANAGE OFFICER
  </h2>

  <Table
    bordered
    hover
    responsive
    style={{
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      fontSize: "1rem",
    }}
  >
    <thead>
      <tr
        style={{
          backgroundColor: "#0078D7",
          color: "white",
          textAlign: "center",
          fontSize: "0.85rem",
        }}
      >
        <th>NO</th>
        <th>NAME</th>
        <th>POSITION</th>
        <th>GENDER</th>
        <th>PLACE</th>
        <th>POST</th>
        <th>PIN</th>
        <th>USER-NAME</th>
        <th>PH-NO</th>
        <th>IMAGE</th>
        <th>STATUS</th>
        <th>ACTION</th>
      </tr>
    </thead>
    <tbody>
      {result.map((officer, index) => (
        <tr
          key={index}
          style={{
            textAlign: "center",
            backgroundColor: index % 2 === 0 ? "#ffffff" : "#f1f3f5",
            fontSize: "0.95rem",
          }}
        >
          <td>{index + 1}</td>
          <td style={{ fontWeight: "500", color: "#343A40" }}>{officer.name}</td>
          <td>{officer.position}</td>
          <td>{officer.gender}</td>
          <td>{officer.place}</td>
          <td>{officer.post}</td>
          <td>{officer.pin}</td>
          <td>{officer.LOGIN_id.username}</td>
          <td>{officer.phone}</td>
          <td>
            <img
              src={officer.image}
              alt="Officer"
              style={{
                height: "45px",
                width: "45px",
                borderRadius: "5px",
                border: "2px solid #0078D7",
                cursor: "pointer",
              }}
              onClick={() => showImageFullScreen(officer.image)}
            />
          </td>
          <td
            style={{
              fontWeight: "bold",
              color: officer.LOGIN_id?.type === "Rejected" ? "red" : "green",
            }}
          >
            {officer.LOGIN_id?.type}
          </td>
          <td>
            <Button
              variant="success"
              size="sm"
              style={{ padding: "5px 10px", fontSize: "0.9rem", marginRight: "5px" }}
              onClick={() => acceptOfficer(officer.LOGIN_id?._id)}
            >
              Accept
            </Button>
            <Button
              variant="danger"
              size="sm"
              style={{ padding: "5px 10px", fontSize: "0.9rem" }}
              onClick={() => rejectOfficer(officer.LOGIN_id?._id)}
            >
              Reject
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
