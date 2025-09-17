import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Assets/css/Homepage.css'; 
import bg from "./Assets/img/bg4k6.jpg";
import bg1 from "./Assets/img/Add_machinery_bg3.jpg";
import 'font-awesome/css/font-awesome.min.css'; 
import { Navbar, Nav, NavDropdown, Button, Carousel, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Home_page = () => {
    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        if (show) {
            fetchProfile();
        }
    }, [show]);

    const fetchProfile = () => {
        axios.post('/officer_view_profile', { "lid": sessionStorage.getItem("lid") })
            .then((response) => {
                setProfile(response.data.data || []);
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
            });
    };
  return (
    <div>
       <div className="container-fluid position-relative p-0">
        <Navbar expand="lg" variant="dark" className="px-5 py-3 py-lg-0">
            <Navbar.Brand href="Farm_officer_Home" className="p-0">
                <h1 className="m-0"><i className="fa fa-user-tie me-2"></i>FARMORA</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarCollapse">
                <span className="fa fa-bars"></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="navbarCollapse">
                <Nav className="ms-auto py-0">
                    <Nav.Link href="Farm_officer_Home" className="active">Home</Nav.Link>
                    {/* <Nav.Link href="about.html">About</Nav.Link> */}
                    <NavDropdown title="Services" id="blog-dropdown">
                        <NavDropdown.Item href="Farm_officer_Send_Public_notification">Notify Farmers</NavDropdown.Item>
                        <NavDropdown.Item href="/Farm_officer_View_Public_notification">View Notifications</NavDropdown.Item>
                        <NavDropdown.Item href="Farm_officer_View_farmer">View Farmers</NavDropdown.Item>
                        <NavDropdown.Item href="Farm_officer_View_subsidy">Subsidy</NavDropdown.Item>
                        <NavDropdown.Item href="Farm_officer_View_scheme">Schemes</NavDropdown.Item>
                        <NavDropdown.Item href="Farm_officer_Doubts">Doubts</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Products" id="product-dropdown">
                        <NavDropdown.Item href="Farm_officer_View_machinery">Machinery</NavDropdown.Item>
                        <NavDropdown.Item href="Farm_officer_Machinery_Order">Machinery order</NavDropdown.Item>
                        <NavDropdown.Item href="Farm_officer_View_plants">Plants</NavDropdown.Item>
                        <NavDropdown.Item href="Farm_officer_Plant_Order">Plant order</NavDropdown.Item>
  
                    </NavDropdown>
                    <Nav.Link onClick={() => setShow(true)}>Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        <Carousel id="header-carousel" className="carousel-fade" interval={3000}>
    <Carousel.Item>
        <img className="d-block w-100" src={bg} alt="FARMORA" />
        <Carousel.Caption className="d-flex flex-column align-items-center justify-content-center">
            <div className="p-3 text-center" style={{ maxWidth: '900px' }}>
                <h5 className="text-white text-uppercase mb-3 animated fadeInDown">FARMORA</h5>
                <h1 className="display-4 text-white mb-md-4 animated fadeIn">"FARMORA: Connecting farmers with officers and suppliers for smarter farming."</h1>
                <Button href="#" className="btn btn-primary py-md-3 px-md-5 me-3 animated fadeInLeft">Explore It</Button>
                <Button className="btn btn-outline-light py-md-3 px-md-5 animated fadeInRight">Contact Us</Button>
            </div>
        </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
        <img className="d-block w-100" src={bg1} alt="Creative & Innovative" />
        <Carousel.Caption className="d-flex flex-column align-items-center justify-content-center">
            <div className="p-3 text-center" style={{ maxWidth: '900px' }}>
                <h5 className="text-white text-uppercase mb-3 animated fadeInDown">FARMORA</h5>
                <h1 className="display-4 text-white mb-md-4 animated fadeIn">"FARMORA: Is an innovative web application designed to revolutionize the agricultural industry by leveraging modern technology."</h1>
                <Button href="#" className="btn btn-primary py-md-3 px-md-5 me-3 animated fadeInLeft">Explore It</Button>
                <Button className="btn btn-outline-light py-md-3 px-md-5 animated fadeInRight">Contact Us</Button>
            </div>
        </Carousel.Caption>
    </Carousel.Item>
</Carousel>
    </div>
     {/* Profile Modal */}
     <Modal show={show} onHide={() => setShow(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>OFFICER PROFILE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {profile.length > 0 ? (
                            profile.map((s, index) => (
                                <div key={index} className="text-center">
                                    <img src={s.image} alt="Profile" className="rounded-circle" style={{ width: '100px', height: '100px', border: '2px solid #4CAF50' }} />
                                    <p><strong>name:</strong> {s.name}</p>
                                    <p><strong>Position:</strong> {s.position}</p>
                                    <p><strong>Phone:</strong> {s.phone}</p>
                                    <p><strong>Gender:</strong> {s.gender}</p>
                                    <p><strong>Place:</strong> {s.place}</p>
                                    <p><strong>Post:</strong> {s.post}</p>
                                    <p><strong>Pin:</strong> {s.pin}</p>
                                    <p><strong>Username:</strong> {s.LOGIN_id.username}</p>
                                    <Button href={`/Farm_officer_update_profile/${s._id}`} variant="success">Update Profile</Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No profile data found.</p>
                        )}
                    </Modal.Body>
                </Modal>
    {/* <div className="container-fluid facts py-5 pt-lg-0">
            <Container className="py-5 pt-lg-0">
                <Row className="gx-0">
                    <Col lg={4} className="wow zoomIn" data-wow-delay="0.1s">
                        <div className="bg-primary shadow d-flex align-items-center justify-content-center p-4" style={{ height: '150px' }}>
                            <div className="bg-white d-flex align-items-center justify-content-center rounded mb-2" style={{ width: '60px', height: '60px' }}>
                                <i className="fa fa-users text-primary"></i>
                            </div>
                            <div className="ps-4">
                                <h5 className="text-white mb-0">Happy Farmers</h5>
                                <h1 className="text-white mb-0">
                                    <CountUp start={0} end={45} duration={2.75} />
                                </h1>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} className="wow zoomIn" data-wow-delay="0.3s">
                        <div className="bg-light shadow d-flex align-items-center justify-content-center p-4" style={{ height: '150px' }}>
                            <div className="bg-primary d-flex align-items-center justify-content-center rounded mb-2" style={{ width: '60px', height: '60px' }}>
                                <i className="fa fa-check text-white"></i>
                            </div>
                            <div className="ps-4">
                                <h5 className="text-primary mb-0">Villages </h5>
                                <h1 className="mb-0">
                                    <CountUp start={0} end={129} duration={2.75} />
                                </h1>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} className="wow zoomIn" data-wow-delay="0.6s">
                        <div className="bg-primary shadow d-flex align-items-center justify-content-center p-4" style={{ height: '150px' }}>
                            <div className="bg-white d-flex align-items-center justify-content-center rounded mb-2" style={{ width: '60px', height: '60px' }}>
                                <i className="fa fa-award text-primary"></i>
                            </div>
                            <div className="ps-4">
                                <h5 className="text-white mb-0">Users</h5>
                                <h1 className="text-white mb-0">
                                    <CountUp start={0} end={123} duration={2.75} />
                                </h1>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div> */}
    </div>
   
    
  );
};