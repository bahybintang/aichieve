import React, { Component } from 'react';
import AuthService from './utils/AuthService';

const Auth = new AuthService();

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            admin: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.navOpt = this.navOpt.bind(this);
    }

    componentWillMount() {
        if (Auth.loggedIn()) {
            this.setState({ loggedIn: true });
            if (Auth.isAdmin()) {
                this.setState({ admin: true })
            }
        }
    }

    handleLogout() {
        Auth.logout();
        this.props.history.replace("/");
    }

    navOpt() {
        var path = window.location.pathname
        if (this.state.loggedIn) {
            if (this.state.admin) {
                return (
                    <ul className="navbar-nav">
                        <li className={path.split('/')[1] === '' ? 'nav-item active' : 'nav-item'}>
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className={path.split('/')[1] === 'admin' ? 'nav-item active' : 'nav-item'}>
                            <a className="nav-link" href="/admin">Admin</a>
                        </li>
                        <li className={path.split('/')[1] === 'request' ? 'nav-item active' : 'nav-item'}>
                            <a className="nav-link" href="/request">Request</a>
                        </li>
                        <li >
                            <a className="nav-link" onClick={this.handleLogout} href="/">Logout</a>
                        </li>
                    </ul>
                )
            }
            else {
                return (
                    <ul className="navbar-nav">
                        <li className={path.split('/')[1] === '' ? 'nav-item active' : 'nav-item'}>
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className={path.split('/')[1] === 'user' ? 'nav-item active' : 'nav-item'}>
                            <a className="nav-link" href="/user">User</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.handleLogout} href="/">Logout</a>
                        </li>
                    </ul>
                )
            }
        }
        else {
            return (
                <ul className="navbar-nav">
                    <li className={path.split('/')[1] === '' ? 'nav-item active' : 'nav-item'}>
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={this.handleLogout} href="/register">Register</a>
                    </li>
                </ul>
            )

        }
    }

    render() {

        return (
            <div style={{ paddingTop: "0px", paddingBottom: "0px", marginBottom: "2rem", marginTop: "0px" }}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <this.navOpt />
                    </div>
                </nav>
            </div>
        );
    }

}

export default Navbar;