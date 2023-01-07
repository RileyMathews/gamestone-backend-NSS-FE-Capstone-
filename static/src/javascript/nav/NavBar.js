import React, { Component } from 'react'
import { Navbar } from 'react-bulma-components';
import url from '../api/APISettings';


/* 
    module to handle displaying and logic of using the navigation bar
    authors Riley Mathews
*/
class NavBar extends Component {

    // Storing session storage as an object in state named currentUser
    state = {
        isActive: false,
        searchType: "All"
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
            <Navbar active={this.state.isActive}>
                <Navbar.Brand>
                    <img className="logo" alt="logo" src="/static/images/logo.png" />
                    <Navbar.Burger onClick={this.onClickNav} />
                </Navbar.Brand>
                <Navbar.Menu>
                    <Navbar.Container>
                        <Navbar.Item className="clickable" id="nav__profile" onClick={this.onClickNav}>My Profile</Navbar.Item>
                        <Navbar.Item className="clickable" id="nav__search" onClick={this.onClickNav}>Add Games</Navbar.Item>
                        <Navbar.Item className="clickable" id="nav__suggest" onClick={this.onClickNav}>Suggest Games</Navbar.Item>
                        <Navbar.Item className="clickable" id="nav__logout" onClick={this.onClickNav}>Logout</Navbar.Item>
                    </Navbar.Container>
                </Navbar.Menu>
            </Navbar>
        )


    }
}

export default NavBar
