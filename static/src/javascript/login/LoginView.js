import React, { Component } from 'react'
import { Heading, Container, Button, Form } from 'react-bulma-components'
import APIManager from '../api/APIManager';

/* 
    module to handle login and registering of users
    author Riley Mathews
*/

class LoginView extends Component {
    registerWithApi = function (userData) {
        APIManager.registerUser(userData)
            .then(r => r.json())
            .then(response => {
                if (!response.key) {
                    for (var key in response) {
                        alert(response[key])
                    }
                } else if (response.key) {
                    localStorage.setItem('user_token', response.key)
                    sessionStorage.setItem('user_token', response.key)
                    APIManager.getUser()
                        .then(r => r.json())
                        .then(response => {
                            this.props.setActiveUser(response[0].id)
                            this.props.setView("profile")
                            this.props.getUserInformation()
                        })
                }
            })
    }.bind(this)

    registerTemporaryUser = function () {
        const randomKey = crypto.randomUUID()
        const randomPassword = `${crypto.randomUUID()}-password`
        const userObject = {
            "username": randomKey,
            "email": `${randomKey}@example.com`,
            "password1": randomPassword,
            "password2": randomPassword,
            "first_name": "Temporary",
            "last_name": "user",
            "is_temporary": true
        }
        this.registerWithApi(userObject)
    }.bind(this)

    updateState = function (event) {
        this.setState({ [event.target.id]: event.target.value })
    }.bind(this)

    render() {
        return (
            <Container>
                <Heading>Welcome to Game Stone</Heading>
                <p>Try out the app with a temporary user! Your data will be deleted when you log out!</p>
                <p>More fully featured accounts are coming soon!</p>
                <Button onClick={this.registerTemporaryUser}>Try Now!</Button>
            </Container>
        )
    }
}

export default LoginView
