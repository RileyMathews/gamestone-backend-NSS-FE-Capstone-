import React, { Component } from 'react'
import { Heading } from 'react-bulma-components'
import GamesList from './GamesList';
import { Context } from '../Provider';
import NoGamesDisplay from '../noGames/NoGamesDisplay';

/* 
    module to handle displaying the games view of the user profile page
    author Riley Mathews
*/

class ProfileGamesView extends Component {


    render() {
        return (
            <Context.Consumer>
                {context => (
                    <div>
                        {context.state.userGamesIds.length > 0 ?
                            <div>
                                <Heading.Title isSize={4}>Games</Heading.Title>
                                <GamesList
                                    removeGame={this.props.removeGame}
                                    games={this.props.games}
                                    changeGameProgress={this.props.changeGameProgress}
                                    userGamesIds={this.props.userGamesIds}
                                    userGamesStats={this.props.userGamesStats}
                                    toggleGameFavorite={this.props.toggleGameFavorite}
                                />
                            </div>
                            :
                            <NoGamesDisplay />
                        }
                    </div>
                )}
            </Context.Consumer>
        )
    }
}

export default ProfileGamesView
