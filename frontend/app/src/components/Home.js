import React, { Component } from 'react';
import Navbar from './nav';
import '../css/Home.css';
import {CardDeck, Card} from 'react-bootstrap';

import AuthService from './util/auth';

const Auth = new AuthService();

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false
        }
        this.homeOpt = this.homeOpt.bind(this);
    }

    componentDidMount() {
        if (Auth.loggedIn()) {
            this.setState({ loggedIn: true });
        }
    }


    homeOpt (){
      if (this.state.loggedIn){
        return (
          <div>
          <Navbar />
          <section className="banner-area relative">
          <div className="overlay overlay-bg" />
          <div className="row fullscreen align-items-center justify-content-center" style={{height: "90vh"}}>
          <CardDeck style={{maxWidth: "100%"}}>
            <Card>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to additional
                  content.{' '}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This card has even longer content than the first to
                  show that equal height action.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </CardDeck>
          <CardDeck style={{maxWidth: "100%"}}>
            <Card>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to additional
                  content.{' '}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This card has even longer content than the first to
                  show that equal height action.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </CardDeck>
          <CardDeck style={{maxWidth: "100%"}}>
            <Card>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to additional
                  content.{' '}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This card has even longer content than the first to
                  show that equal height action.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </CardDeck>
          </div>
          </section>
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