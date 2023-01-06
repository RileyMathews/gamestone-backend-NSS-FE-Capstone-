import React, { Component } from 'react'
import { Heading, Container } from 'react-bulma-components'
import ProfileGamesView from './ProfileGamesView';
import ProfilePlatformsView from './ProfilePlatformsView';
import ProfileNav from './ProfileNav';

/* 
    module to handle displaying the users profile
    authors Riley Mathews
*/
class ProfileView extends Component {

    state = {
        currentView: "games"
    }

    goToAddGames = function () {
        this.props.setView("search")
    }.bind(this)

    goToInstructions = function () {
        this.props.setView("instructions")
    }.bind(this)

    setProfileView = function (e) {
        let view = null

        view = e.currentTarget.id.split("__")[1]

        // Update state to correct view will be rendered
        this.setState({
            currentView: view
        })
    }.bind(this)

    showProfileView = function () {
        switch (this.state.currentView) {
            case "games":
            default:
                return <ProfileGamesView
                    userGamesIds={this.props.userGamesIds}
                    removeGame={this.props.removeGame}
                    games={this.props.games}
                    changeGameProgress={this.props.changeGameProgress}
                    userGamesStats={this.props.userGamesStats}
                    toggleGameFavorite={this.props.toggleGameFavorite}
                    goToAddGames={this.goToAddGames}
                    goToInstructions={this.goToInstructions}
                />
            case "platforms":
                return <ProfilePlatformsView
                    userPlatforms={this.props.userPlatforms}
                    allPlatforms={this.props.allPlatforms}
                    userUnownedPlatforms={this.props.userUnownedPlatforms}
                    addPlatform={this.props.addPlatform}
                    removePlatform={this.props.removePlatform}
                />
        }
    }

    render() {
        return (

            <Container>
                <Heading size={3}>{this.props.firstName} {this.props.lastName} <br /> AKA "{this.props.gamertag}"</Heading>
                <ProfileNav setProfileView={this.setProfileView} currentView={this.state.currentView} />
                {this.showProfileView()}
            </Container>
        )
    }
}

export default ProfileView



