import React, { Component } from 'react';
import Background1 from './background1';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../css/Login.css'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username : '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/beranda');
        res.json()
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.error(err);
      alert('Gagal Register');
    });
  }

  render() {
    return (      
    <Container>
    <Row style={{marginTop: "100px"}}>
      <Col>
      <div>
      <h1 className="aichieve">AICHIEVE </h1>
      </div>
      
      <div style={{marginTop: "40%"}}>
      <Background1 />
      </div>
      </Col>



      <Col>
      <div>
      <p className="logintext"> Hello, Welcome Back! </p>
      </div>

      <div>
      <form onSubmit={this.onSubmit} className="formStyle" style={{marginTop: "150px"}}>
      <h1 className="tagline">Login</h1>
        <ul>
          <li>
            <label htmlFor="username">User Name</label>
            <input type="text"
              name="username"
              placeholder=""
              value={this.state.username}
              onChange={this.handleInputChange}
              required />
            <span>Masukkan User Name Anda!</span>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input type="password"
              name="password"
              placeholder=""
              value={this.state.password}
              onChange={this.handleInputChange}
              required />
            <span>Masukkan Password Anda!</span>
          </li>
          <li>
            <input type="submit" Value="Submit" />
          </li>
        </ul>
      </form>
      <p style={{textAlign: "center", justifyContent: "center"}}>Don't have an account? <Link to="/register"> Register </Link> </p>
      </div>
      </Col>
    </Row>
    </Container>
    );
  }
}