import React, { Component } from 'react';
import '../css/Home.css';

export default class Home extends Component {
  
  render() {
    
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