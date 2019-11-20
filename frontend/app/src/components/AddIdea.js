import React, { Component } from 'react';
import Navbar from './nav';
import AuthService from './util/auth';
import decode from 'jwt-decode';
import {Button} from 'react-bootstrap';

const Auth = new AuthService();

export default class addIdea extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      skills_required: [],
      status: '',
      collaboration_pages: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.skills_required);
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const username = Auth.getUsername();
    console.log(username)
    fetch(`/idea/${username}/add`, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
        'token': Auth.getToken()
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          this.props.history.push('/');
        }
        else return Promise.reject(data.message)
      })
      .catch(err => {
        console.error(err);
        alert(err);
      });
 	 }

	inputChangedHandler = (event, index) => {
	    const updatedSkills = [...this.state.skills_required];
	    updatedSkills[index] = event.target.value;
	    this.setState({ skills_required: updatedSkills });
	};

	onAddInput = (e) => {
		e.preventDefault();
	    const UpdatedArray = this.state.skills_required.concat('');
	    this.setState({ skills_required: UpdatedArray });
	};

  render() {
  	const formSkillements = this.state.skills_required.map((formSkill, index) =>  {
  		 	return (
  		 	<div key={index}>
  		 	<li style={{marginBottom: '20px', border: '1px solid #DDDDDD'}}>
            <label htmlFor="skills_required">{`Skills #${index + 1}`}</label>
	              <input 
	              	type="text"
	              	name="skills_required"
	                placeholder=""
	                value={formSkill}
	                onChange={event => this.inputChangedHandler(event, index)}
	                required />
	                </li>
	        </div>

    		);
  		 });


    return (
      <div>
        <Navbar />

        <form onSubmit={this.onSubmit} className="formStyle" style={{ marginTop: "30px" }}>
          <h1 className="tagline" style={{ paddingBottom: "20px" }}>Add Your Idea</h1>
          <ul>
            <li>
              <label htmlFor="title">Project Title</label>
              <input type="text"
                name="title"
                placeholder=""
                value={this.state.title}
                onChange={this.handleInputChange}
                required />
              <span>Masukkan Judul Project Anda!</span>
            </li>

            <li>
              <label htmlFor="description">Description</label>
              <input type="text"
                name="description"
                placeholder=""
                value={this.state.description}
                onChange={this.handleInputChange}
                required />
              <span>Masukkan Deskripsi Project Anda!</span>
            </li>
			<div style={{display: "block", textAlign: "center"}}>
			<Button onClick={this.onAddInput} style={{marginBottom: '20px'}}>Add Skills Requirements</Button>
			</div>
			<br />

			
			{formSkillements}
			
			<br />

            <li>
              <label htmlFor="status">Status Project</label>
              <input type="text"
                name="status"
                placeholder=""
                value={this.state.status}
                onChange={this.handleInputChange}
                required />
              <span>Masukkan Status Project Anda!</span>
            </li>

            <li>
              <label htmlFor="collaboration_pages">Collaboration Pages</label>
              <input type="text"
                name="collaboration_pages"
                placeholder=""
                value={this.state.collaboration_pages}
                onChange={this.handleInputChange}
                required />
              <span>Masukkan Collaboration Pages yang Digunakan!</span>
            </li>
            <li>
              <input type="submit" Value="Submit" />
            </li>

          </ul>
        </form>
      </div>

    );
  }

}