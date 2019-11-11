import React, { Component } from 'react';
import Navbar from './nav';
import Card from './kartu';
import AuthService from './util/auth';
import '../css/Home.css';

const Auth = new AuthService();

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            projects: []
        }
        this.homeOpt = this.homeOpt.bind(this);
    }

    componentDidMount() {
        if (Auth.loggedIn()) {
            this.setState({ loggedIn: true });
            this.onTermSubmit('');
        }
    }

    onTermSubmit = (term) => {
      fetch('http://localhost:8080/idea/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token' : Auth.getToken()
      },
      params: {
        'title' : term,
        'description' : term
      }
      })
      .then(res => {
       if (res.status === 200) return res.json()
       else return Promise.reject(res.error)
      })
      .then(item => {
        this.setState ({projects: item.data});
        console.log(this.state.projects);
        })
      .catch(err => {
        console.error(err);
        alert('ERROR');
      });
    }

    homeOpt (){
      if (this.state.loggedIn){
        return (
          <div>
          <Navbar onFormSubmit={this.onTermSubmit}/>
          <br />
          <Card projects={this.state.projects}/>
          </div>
          );
      }
      else {
        return (
          <section className="banner-area relative">
            <div className="overlay overlay-bg" />
              <div className="container">
                <div className="row fullscreen align-items-center justify-content-center" style={{height: "100vh"}}>
                  <div className="col-lg-10">
                    <div className="text-center">
                      <h1 className="judul">AICHIEVE</h1>
                      <h2 className="tagline">Get Your Idea </h2>
                      <br />
                      <br />
                      <a href="/login" className="primary-btn d-inline-flex align-items-center" style={{textDecoration: "none"}}><span className="mr-10">Login</span><span className="lnr lnr-arrow-right" /></a>
                      <br />
                      <br /><a href="/register" className="primary-btn d-inline-flex align-items-center" style={{textDecoration: "none"}}><span className="mr-10">Register</span><span className="lnr lnr-arrow-right" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
      }
    }

  render() {
    
    return (
      <this.homeOpt />
    );
  }
}   