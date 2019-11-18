import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Auth from './util/auth'
import Modal from 'react-modal'
var auth = new Auth()

export default class KartuItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userQuery: {
        username: "",
        name: ""
      },
      users: [],
      isOpen: false,
      modalStyle: {
        content: {
          width: "50vw",
          height: "30vw",
          position: "absolute",
          left: "25%",
          top: "12%",
          translate: "transform(-50%, -50%)"
        }
      },
      butAccept: {
        position: "absolute",
        right: "10%",
        bottom: "5px"
      },
      kartu1: {
        marginBottom: "60px",
        border: "none",
        boxShadow: "0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.09), 0px 8px 20px 7px rgba(0, 0, 0, 0.02)"
      }
    }
  }

  openModal = () => {
    this.setState({ isOpen: true })
  }

  closeModal = () => {
    this.setState({ isOpen: false })
  }

  request = () => {
    console.log(auth.getToken())
    fetch(`/idea/${this.props.project._id}/request`, {
      method: 'POST',
      body: JSON.stringify({ _id: this.props.project._id, ideaOwnerID: this.props.project.userID }),
      headers: {
        'Content-Type': 'application/json',
        'token': auth.getToken()
      }
    })
      .then(data => data.json())
      .then(data => {
        console.log(data)
        if (data.status == "failed") return Promise.reject(new Error(data.message))
        else alert("Success!")
      })
      .catch(err => {
        alert(err.toString())
      })
  }

  getUsers = () => {
    fetch(`/users?username=${this.state.userQuery.username}&name=${this.state.userQuery.name}`, {
      method: "GET",
      headers: {
        'token': auth.getToken()
      }
    })
      .then(data => data.json())
      .then(data => {
        if (data.status == "failed") return Promise.reject(new Error(data.message))
        else this.setState({ users: data.data })
      })
      .catch(err => {
        alert(err.toString())
      })
  }

  renderedList = () => {
    var renderedList2 = this.props.project.skills_required.map(skill => {
      return (
        <ol >
          <li style={{ listStyleType: "circle", marginLeft: "20px" }}>
            {skill}
          </li>
        </ol>
      );
    });
    return renderedList2
  }

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.isOpen}
          style={this.state.modalStyle}
          onAfterOpen={this.getUsers}
        >
          <table className="table">
            <tr>
              <th>Nama</th>
              <th>Username</th>
              <th>Skills</th>
              <th></th>
            </tr>
            {this.state.users.map(user => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>
                    {user.skills.map(skill => {
                      return (
                        <ol >
                          <li style={{ listStyleType: "circle", marginLeft: "20px" }}>
                            {skill}
                          </li>
                        </ol>
                      )
                    })}
                  </td>
                </tr>
              )
            })}
          </table>

          <Button
            onClick={this.closeModal}
            variant="danger"
          >
            Close
          </Button>
        </Modal>

        <Card style={this.state.kartu1}>
          <Card.Body>
            <h3 style={{ fontFamily: "quicksand", fontWeight: "700", textTransform: "capitalize" }}>{this.props.project.title}</h3>
            <Card.Text>
              {this.props.project.description}
            </Card.Text>
            <hr />
            <h5> Skills Required : </h5>
            {this.renderedList()}
          </Card.Body>
          {auth.getProfile().username === this.props.project.userID ? <Button variant="primary" style={this.state.butAccept} onClick={this.openModal}>Offer</Button> : <Button variant="warning" style={this.state.butAccept} onClick={this.request}>Request</Button>}
          <Card.Footer>
            <small className="text-muted">oleh : {this.props.project.userID}</small>
          </Card.Footer>
        </Card>
      </>
    );
  }
}