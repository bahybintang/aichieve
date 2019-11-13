import React, { Component } from 'react';
import  { Navbar, Nav, Form, FormControl, Button, Container }  from 'react-bootstrap';
import AuthService from './util/auth';

const Auth = new AuthService();

class Navi extends Component {
        state = {text: ''};

        onFormSubmit = (e) => {
            e.preventDefault();
            this.props.onFormSubmit(this.state.text)
        };

        handleLogout() {
            Auth.logout();
            this.props.history.replace("/");
        };

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
            <Nav.Link href="/" onClick={this.handleLogout} style={{fontSize: "2vh"}}>Logout</Nav.Link>
            </Nav>
            <Form inline onSubmit={this.onFormSubmit}>
            <FormControl 
                type="text" 
                placeholder="Search" 
                className="mr-sm-2" 
                value={this.state.text} 
                onChange={e => this.setState({text: e.target.value})}
            />
            <Button variant="outline-light" onClick={this.onFormSubmit}>Search</Button>
            </Form>
            </Container>
            </Navbar>
        );
    }

}

export default Navi;