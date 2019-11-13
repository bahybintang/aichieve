import React, { Component } from 'react';
import Background1 from './background1';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/Login.css'
import auth from './util/auth'
const Auth = new auth()

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
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
    fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username: this.state.username, password: this.state.password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          Auth.setToken(data.token);
          this.props.history.push('/');
        }
        else return Promise.reject(data.message)
      })
      .catch(err => {
        console.error(err);
        alert(err);
      });
  }

  render() {
    return (
      <Container>
        <Row style={{ marginTop: "100px" }}>
          <Col>
            <div>
              <h1 className="aichieve">AICHIEVE </h1>
            </div>

            <div style={{ marginTop: "40%" }}>
              <Background1 />
            </div>
          </Col>

          <Col>
            <div>
              <p className="logintext"> Hello, Welcome Back! </p>
            </div>

            <div>
              <form onSubmit={this.onSubmit} className="formStyle" style={{ marginTop: "100px" }}>
                <h1 className="tagline" style={{ paddingBottom: "50px" }}>Login</h1>
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
              <p style={{ textAlign: "center", justifyContent: "center" }}>Don't have an account? <Link to="/register"> Register </Link> </p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}