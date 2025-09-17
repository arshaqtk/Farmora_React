import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Home.css'; // Import custom CSS
import { Button, Card, Container, Navbar, Nav, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

export const Home = () => {
  const handleLogout = () => {
    window.location="/"
    console.log('User logged out');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
        </div>
        <Nav className="flex-column">
          <Nav.Link href="/Admin_Manage_officer" className="sidebar-link">
            Manage Officers
          </Nav.Link>
          <Nav.Link href="/admin_View_farmer" className="sidebar-link">
            View Farmers
          </Nav.Link>
          <Nav.Link href="/admin_View_complaint" className="sidebar-link">
            View Complaints
          </Nav.Link>
          <Nav.Link href="/admin_view_user" className="sidebar-link">
            View Users
          </Nav.Link>
          <Nav.Link href="/admin_view_System_feedback" className="sidebar-link">
            View Feedback
          </Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
         <Navbar style={{ backgroundColor: "#2c3e50", padding: "10px" }} variant="dark">
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

        {/* Dashboard Cards */}
        <Container floid className="dashboard-cards" style={{marginTop:70}}>
          <Row>
            <Col md={3} className="mb-4">
              <Card className="custom-card">
                <Card.Body>
                  <Card.Title>Manage Officers</Card.Title>
                  <Card.Text>
                    View and manage officer accounts.
                  </Card.Text>
                  <Button variant="primary" href="/Admin_Manage_officer" block>
                    Go to Manage Officers
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="mb-4">
              <Card className="custom-card">
                <Card.Body>
                  <Card.Title>View Farmers</Card.Title>
                  <Card.Text>
                    View all registered farmers.
                  </Card.Text>
                  <Button variant="primary" href="/admin_View_farmer" block>
                    Go to View Farmers
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="mb-4">
              <Card className="custom-card">
                <Card.Body>
                  <Card.Title>View Complaints</Card.Title>
                  <Card.Text>
                    Review and resolve user complaints.
                  </Card.Text>
                  <Button variant="primary" href="/admin_View_complaint" block>
                    Go to View Complaints
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="mb-4">
              <Card className="custom-card">
                <Card.Body>
                  <Card.Title>View Users</Card.Title>
                  <Card.Text>
                    Manage all system users.
                  </Card.Text>
                  <Button variant="primary" href="/admin_view_user" block>
                    Go to View Users
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="mb-4">
              <Card className="custom-card">
                <Card.Body>
                  <Card.Title>View Feedback</Card.Title>
                  <Card.Text>
                    Review feedback from users.
                  </Card.Text>
                  <Button variant="primary" href="/admin_view_System_feedback" block>
                    Go to View Feedback
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};