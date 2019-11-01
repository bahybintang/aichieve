import React, { Component } from 'react';

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
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
    fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Gagal Login');
    });
  }

  render() {
    return (
      <center>
      <form onSubmit={this.onSubmit} className="formStyle">
      <h1>Register</h1>
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
          <li>
            <input type="submit" Value="Submit" />
          </li>
        </ul>
      </form>
      </center>
    );
  }
}