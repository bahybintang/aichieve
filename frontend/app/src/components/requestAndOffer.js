import React, { Component } from 'react';
import Navbar from './nav';
import AuthService from './util/auth';
import { Button } from 'react-bootstrap';

const Auth = new AuthService();

export default class ReqAndOff extends Component {
    constructor() {
        super();
        this.state = {
            offers: []
        };
    }

    componentWillMount = () => {
        this.getOffer()
    }

    getOffer = () => {
        fetch(`/users/${Auth.getProfile().username}/offers`, {
            method: 'GET',
            headers: {
                'token': Auth.getToken()
            }
        })
            .then(data => data.json())
            .then(data => {
                console.log(data.status)
                if (data.status === "failed") return Promise.reject(new Error(data.message))
                else this.setState({ offers: data.data })
            })
            .catch(err => {
                alert(err.toString())
            })
    }

    acceptOrDeclineOffer = (str, offerID, userID) => {
        fetch(`/users/${userID}/offers/${offerID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'token': Auth.getToken()
            },
            body: JSON.stringify({ action: str })
        })
            .then(data => {
                console.log(data)
                return data.json()
            })
            .then(data => {
                if (data.status === "success") { 
                    alert(data.message) 
                    window.location.reload()
                }
                else return Promise.reject(new Error(data.message))
            })
            .catch(err => {
                alert(err.toString())
            })
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="formStyle">
                    <h1 className="tagline" style={{ paddingBottom: "20px" }}>Your Notifications</h1>
                    <table>
                        <thead className="table">
                            <tr>
                                <th>Idea Owner</th>
                                <th>Idea Title</th>
                                <th>Idea Description</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.offers.map(offer => {
                                return (
                                    <tr>
                                        <td>{offer.offer.ideaOwnerID}</td>
                                        <td>{offer.idea.title}</td>
                                        <td>{offer.idea.description}</td>
                                        <td><Button onClick={() => { this.acceptOrDeclineOffer('accept', offer.offer._id, Auth.getProfile().username) }} variant="success">Accept</Button></td>
                                        <td><Button onClick={() => { this.acceptOrDeclineOffer('decline', offer.offer._id, Auth.getProfile().username) }} variant="danger">Decline</Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }

}