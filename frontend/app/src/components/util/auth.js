import React from 'react';
import decode from 'jwt-decode';


export default class AuthService {
    constructor() {
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
    }

    login(username, password) {
        return this.fetch('/users/authenticate', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            if(!res.message) this.setToken(res.token)
            
        })
    }

    register(username, password, firstName, lastName){
        return this.fetch('/users/register', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                firstName,
                lastName
            })
        }).then(res => {
            return Promise.resolve(res);
        })
    }

    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken()
        return !!token
    }

    setToken(idToken) {
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        return localStorage.getItem('id_token')
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    getUsername() {
        return this.getProfile().username
    }

    isAdmin(){
        if(this.loggedIn()){
            return !!this.getProfile().admin
        }
    }


    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) {
            headers['token'] = this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(response => response.json())
    }

    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) { 
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
