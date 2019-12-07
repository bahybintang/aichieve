import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Background2 from './background2';
import '../css/Login.css'
import AuthService from './util/auth'
const Auth = new AuthService()

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      username: '',
      password: '',
      skills: []
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
    fetch(`/auth/register`, {
      method: 'POST',
      body: JSON.stringify(this.state),
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

  onAddInput = (e) => {
		e.preventDefault();
	    const UpdatedArray = this.state.skills.concat('');
	    this.setState({ skills: UpdatedArray });
  };

  inputChangedHandler = (event, index) => {
    const updatedSkills = [...this.state.skills];
    updatedSkills[index] = event.target.value;
    this.setState({ skills: updatedSkills });
};

  render() {
    const formSkillements = this.state.skills.map((formSkill, index) => {
      return (
        <div key={index}>
          <li style={{ marginBottom: '20px', border: '1px solid #DDDDDD' }}>
            <label htmlFor="skills">{`Skills #${index + 1}`}</label>
            <input
              type="text"
              name="skills"
              placeholder=""
              value={formSkill}
              onChange={event => this.inputChangedHandler(event, index)}
              required />
          </li>
        </div>

      );
    });

    return (
      <Container>
        <Row style={{ marginTop: "100px" }}>

          <Col>
            <div>
              <p className="logintext"> Welcome to </p>
              <p className="yourDream"> Your Dream </p>
            </div>
            <div>
              <form onSubmit={this.onSubmit} className="formStyle">
                <h1 className="tagline">Register</h1>
                <ul>
                  <li>
                    <label htmlFor="name">Nama</label>
                    <input type="text"
                      name="name"
                      placeholder=""
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      required />
                    <span>Masukkan Nama Anda!</span>
                  </li>
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
                  <div style={{ display: "block", textAlign: "center" }}>
                    <Button onClick={this.onAddInput} style={{ marginBottom: '20px' }}>Add Skills</Button>
                  </div>
                  {formSkillements}
                  <li>
                    <input type="submit" Value="Submit" />
                  </li>
                </ul>
              </form>
              <p style={{ textAlign: "center", justifyContent: "center", marginTop: "-50px" }}>Already have an account? <Link to="/login"> Login </Link> </p>
            </div>
          </Col>
          <Col>
            <div>
              <h1 className="aichieve">AICHIEVE </h1>
            </div>

            <div style={{ marginTop: "10%" }}>
              <Background2 />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}