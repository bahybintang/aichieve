import React, { Component } from 'react';
import  { Navbar, Nav, Form, FormControl, Button, Container }  from 'react-bootstrap';

class Navi extends Component {
        render() {
            const brand = {
            fontFamily: "montserrat",
            fontSize: "3.5vh",
            fontWeight: "bold"
            };

            const nav = {
                marginRight: "0px",
                height: "80px", 
                backgroundColor: "#2980b9"
            }

        return (
            <Navbar sticky="top" variant="dark" style={nav}>
            <Container>
            <Navbar.Brand href="#" style={brand}>AICHIEVE</Navbar.Brand>
            <Nav className="mr-auto" style={{marginLeft: "50px"}}>
            <Nav.Link href="/" style={{fontSize: "2vh"}}>Home</Nav.Link>
            <Nav.Link href="/addIdea" style={{fontSize: "2vh"}}>add Idea</Nav.Link>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
            </Form>
            </Container>
            </Navbar>
        );
    }

}

export default Navi;