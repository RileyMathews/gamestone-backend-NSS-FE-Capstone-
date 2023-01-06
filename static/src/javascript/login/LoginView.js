import React, { Component } from 'react'
import { Heading, Container, Label, Button, Form } from 'react-bulma-components'
import APIManager from '../api/APIManager';
import './LoginView.css';

/* 
    module to handle login and registering of users
    author Riley Mathews
*/

class LoginView extends Component {

    state = {
        login__username: "",
        login__password: "",
        login__email: "",
        register__firstName: "",
        register__lastName: "",
        register__gamertag: "",
        register__password: "",
        register__passwordConfirm: "",
        register__email: "",
        firstNames: [
            "Tony",
            "Thor",
            "Varian",
            "Bruce",
            "Donky",
            "Peter",
            "Mega",
            "Iroquois",
            "Luke",
            "Luffy",
            "Kratos",
            "Harry",
            "David",
            "Donald",
            "Revolver",
            "Hal",
            "Anakin",
            "Samuel",
            "Han",
            "Jean-Luc",
            "James",
            "Leonard"
        ],
        lastNames: [
            "Stark",
            "Odinson",
            "Wryn",
            "Wayne",
            "Kong",
            "Parker",
            "Man",
            "Pliskin",
            "Skywalker",
            "Monkey",
            "God of War",
            "Potter",
            "Oh",
            "Anderson",
            "Ocelot",
            "Emmerich",
            "Skywalker",
            "Oak",
            "Solo",
            "Picard",
            "Kirk",
            "McCoy"
        ],
        nameIndex: 0,
        gamerTags: [
            "IronMan",
            "God0fThunderz",
            "LionOfStormwind",
            "Batman",
            "DK",
            "Spiderman",
            "Rockman",
            "Snake",
            "TheLastJedi",
            "PirateKing",
            "GhostOfSparta",
            "BoyWhoLived",
            "Zero",
            "Sigint",
            "Shalashaska",
            "Otacon",
            "Vader",
            "TheProf",
            "IShotFirst",
            "Locutus",
            "Jim",
            "Bones"
        ]
    }

    componentDidMount() {
        const indexOfNames = Math.floor(Math.random() * this.state.firstNames.length) 
        this.setState({nameIndex: indexOfNames})
    }

    login = function (evt) {
        evt.preventDefault()
        const username = this.state.login__username
        const password = this.state.login__password
        const email = this.state.login__email
        this.setState({
            login__username: "",
            login__password: "",
            login__email: "",
        })

        if (username === "" || password === "" || email === "") {
            alert("please fill in required fields")
        } else {
            // APIManager.searchUsers(username)
            //     .then(r => r.json())
            //     .then(users => {
            //         const user = users[0]
            //         if (user === undefined || user.password !== password) {
            //             alert("Username or Password not found")
    
            //         } else if (password === user.password) {
            //             sessionStorage.setItem("userId", user.id)
            //             this.props.setActiveUser(user.id)
            //             this.props.setView("profile")
            //             this.props.getUserInformation()
            //         }
            //     })
            const userData = {
                'username': username,
                'password': password,
                'email': email
            }
            APIManager.loginUser(userData)
                .then(r => r.json())
                .then(response => {
                    if (!response.key) {
                        alert("could not log in with that information")
                    } else {
                        localStorage.setItem('user_token', response.key)
                        sessionStorage.setItem('user_token', response.key)
                        APIManager.getUser()
                            .then(r => r.json())
                            .then(response => {
                                this.props.setActiveUser(response[0])
                                this.props.setView('profile')
                                this.props.getUserInformation()
                            })
                    }
                })
        }
    }.bind(this)

    register = function (evt) {
        evt.preventDefault()
        const firstN = this.state.register__firstName
        const lastN = this.state.register__lastName
        const gamerT = this.state.register__gamertag
        const password = this.state.register__password
        const email = this.state.register__email
        if (firstN === "" || lastN === "" || gamerT === "" || password === "" || email === "") {
            alert("please make sure every field is filled out")
        } else {
            if (this.state.register__password === this.state.register__passwordConfirm) {

                const userObject = {
                    "username": gamerT,
                    "email": email,
                    "password1": password,
                    "password2": this.state.register__passwordConfirm,
                    "first_name": firstN,
                    "last_name": lastN
                }

                APIManager.registerUser(userObject)
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

            } else {

                alert("passwords do not match")
                this.setState({
                    register__password: "",
                    register__passwordConfirm: ""
                })

            }

        }
    }.bind(this)

    updateState = function (event) {
        this.setState({ [event.target.id]: event.target.value })
    }.bind(this)

    render() {
        return (
            <Container>
                <form id="login" onSubmit={this.login}>
                    <Heading.Title>Welcome to Game Stone</Heading.Title>
                    <Heading.Title>Login</Heading.Title>
                    <Form.Field>
                        <Form.Label>Gamertag</Form.Label>
                        <Form.Control>
                            <Form.Input type="text" placeholder="gamertag" onChange={this.updateState} id="login__username" value={this.state.login__username} />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Email</Form.Label>
                        <Form.Control>
                            <Form.Input type="text" placeholder="email@email.com" onChange={this.updateState} id="login__email" value={this.state.login__email} />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Password</Form.Label>
                        <Form.Control>
                            <Form.Input type="password" placeholder="password" onChange={this.updateState} id="login__password" value={this.state.login__password} />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Control>
                            <Button type="submit" isColor="primary" id="login__submit">Login</Button>
                        </Form.Control>
                    </Form.Field>
                </form>
                <form id="register" onSubmit={this.register}>
                <Heading.Title>Or create a new account</Heading.Title>
                    <Form.Field>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control>
                            <Form.Input type="text" placeholder={this.state.firstNames[this.state.nameIndex]} onChange={this.updateState} id="register__firstName" value={this.state.register__firstName} />
                        </Form.Control>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control>
                            <Form.Input type="text" placeholder={this.state.lastNames[this.state.nameIndex]} onChange={this.updateState} id="register__lastName" value={this.state.register__lastName} />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Gamertag</Form.Label>
                        <Form.Control>
                            <Form.Input type="text" placeholder={this.state.gamerTags[this.state.nameIndex]} onChange={this.updateState} id="register__gamertag" value={this.state.register__gamertag} />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Email</Form.Label>
                        <Form.Control>
                            <Form.Input type="text" placeholder='email@email.com' onChange={this.updateState} id="register__email" value={this.state.register__email} />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Password</Form.Label>
                        <Form.Control>
                            <Form.Input type="password" placeholder="notpassword" onChange={this.updateState} id="register__password" value={this.state.register__password} />
                        </Form.Control>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control>
                            <Form.Input type="password" placeholder="notpassword" onChange={this.updateState} id="register__passwordConfirm" value={this.state.register__passwordConfirm} />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Control>
                            <Button isColor="primary" id="register__submit" type="submit">Register</Button>
                        </Form.Control>
                    </Form.Field>
                </form>


            </Container>
        )
    }
}

export default LoginView
