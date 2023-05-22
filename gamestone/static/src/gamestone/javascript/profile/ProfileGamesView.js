import React, { Component } from "react";
import { Heading } from "react-bulma-components";
import GamesList from "./GamesList";
import NoGamesDisplay from "../noGames/NoGamesDisplay";

/* 
    module to handle displaying the games view of the user profile page
    author Riley Mathews
*/

class ProfileGamesView extends Component {
    render() {
        return (
            <div>
                {this.props.userGames.length > 0 ? (
                    <div>
                        <Heading size={4}>Games</Heading>
                        <GamesList removeGameFromCollection={this.props.removeGame} giantbombGames={this.props.giantbombGames} userGames={this.props.userGames} toggleGameFavorite={this.props.toggleGameFavorite} />
                    </div>
                ) : (
                    <NoGamesDisplay />
                )}
            </div>
        );
    }
}

export default ProfileGamesView;
