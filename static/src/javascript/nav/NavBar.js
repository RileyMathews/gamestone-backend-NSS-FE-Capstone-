import React, { Component } from 'react'
import { Navbar } from 'react-bulma-components';
import './NavBar.css'
import url from '../api/APISettings';


/* 
    module to handle displaying and logic of using the navigation bar
    authors Riley Mathews
*/
class NavBar extends Component {

    // Storing session storage as an object in state named currentUser
    state = {
        isActive: false,
        firstName: "",
        searchType: "All"
    }

    // Making a fetch request against sessionStorage to find relevant user and storing first name in state
    componentDidMount() {
        const currentUser = sessionStorage.getItem('userId')
        if (currentUser !== null) {
            fetch(`${url}user/${currentUser}`)
                .then(r => r.json())
                .then(response => {
                    this.setState({
                        firstName: response.first_name,
                        image: response.image
                    })
                })
        }
    }

    // event handler for clicking nav drop down burger
    // sets isActive property in state to the opposite of what it currently is
    onClickNav = function (e) {
        this.setState({
            isActive: (!this.state.isActive)
        })
        if (e.target.id !== "") {
            this.props.setView(e)
        }
    }.bind(this)

    getCurrentView = function (item) {
        if (this.props.activeUser === null) {
            return false
        } else {
            return this.props.currentView === item
        }
    }.bind(this)

    render() {
        return (
            <Navbar className="is-fixed-top">
                <Navbar.Brand>
                    <img className="logo" alt="logo" src="/static/images/logo.png" />
                    <Navbar.Item>{this.props.gamertag}</Navbar.Item>
                    <Navbar.Burger onClick={this.onClickNav} />
                </Navbar.Brand>
                <Navbar.Menu>
                    <Navbar.Item active={this.getCurrentView("profile")} className="clickable" id="nav__profile" onClick={this.onClickNav}>My Profile</Navbar.Item>
                    <Navbar.Item active={this.getCurrentView("search")} className="clickable" id="nav__search" onClick={this.onClickNav}>Add Games</Navbar.Item>
                    <Navbar.Item active={this.getCurrentView("suggest")} className="clickable" id="nav__suggest" onClick={this.onClickNav}>Suggest Games</Navbar.Item>
                    <Navbar.Item active={this.getCurrentView("logout")} className="clickable" id="nav__logout" onClick={this.onClickNav}>Logout</Navbar.Item>
                </Navbar.Menu>
                <Navbar.Container align='right'>
                    <Navbar.Item>{this.props.gamertag}</Navbar.Item>
                </Navbar.Container>
            </Navbar>
        )


    }
}

export default NavBar
