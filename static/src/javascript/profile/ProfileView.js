import React, { Component } from 'react'
import { Heading, Container } from 'react-bulma-components'
import ProfileGamesView from './ProfileGamesView';

/* 
    module to handle displaying the users profile
    authors Riley Mathews
*/
class ProfileView extends Component {

    goToAddGames = function () {
        this.props.setView("search")
    }.bind(this)

    render() {
        return (
            <Container>
                <Heading size={3}>{this.props.firstName} {this.props.lastName}</Heading>
                <ProfileGamesView
                    userGamesIds={this.props.userGamesIds}
                    removeGame={this.props.removeGame}
                    games={this.props.games}
                    userGamesStats={this.props.userGamesStats}
                    toggleGameFavorite={this.props.toggleGameFavorite}
                    goToAddGames={this.goToAddGames}
                    goToInstructions={this.goToInstructions}
                />
            </Container>
        )
    }
}

export default ProfileView



