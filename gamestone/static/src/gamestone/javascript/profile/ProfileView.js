import React, { Component } from "react";
import { Container } from "react-bulma-components";
import Loading from "../components/Loading";
import APIManager from "../api/APIManager";
import ProfileGamesView from "./ProfileGamesView";

/* 
    module to handle displaying the users profile
    authors Riley Mathews
*/
class GamesView extends Component {
    state = {
        userGames: [],
        giantbombGames: [],
        loading: true,
    };

    populateUserGames = function () {
        APIManager.getUser()
            .then((r) => r.json())
            .then((userResponse) => {
                const userGames = userResponse[0].games;
                this.setState({
                    userGames: userGames,
                    loading: userGames.length > 0,
                });
                userGames.forEach((userGame) => {
                    const giantbombId = userGame.giantbomb_game;
                    APIManager.getGbGame(giantbombId)
                        .then((r) => r.json())
                        .then((response) => {
                            const giantbombGame = response.results;
                            const oldState = this.state.giantbombGames;
                            const newState = oldState.concat([giantbombGame]);
                            this.setState({
                                giantbombGames: newState,
                                loading: false,
                            });
                        });
                });
            });
    }.bind(this);

    toggleGameFavorite = function (giantbombId) {
        const userGame = this.state.userGames.find((game) => game.giantbomb_game === giantbombId);
        userGame.isFavorited = !userGame.isFavorited;
        APIManager.put("usergame", userGame, userGame.id)
            .then((r) => r.json())
            .then((response) => {
                const newState = this.state.userGames.map((game) => {
                    if (response.id === game.id) {
                        return response;
                    } else {
                        return game;
                    }
                });
                this.setState({
                    userGames: newState,
                });
            });
    }.bind(this);

    removeGame = function (giantbombId) {
        const userGame = this.state.userGames.find((game) => game.giantbomb_game === giantbombId);
        APIManager.delete("usergame", userGame.id).then((_) => {
            const currentState = this.state.userGames;
            const newState = currentState.filter((item) => item !== userGame);
            this.setState({
                userGames: newState,
            });
        });
    }.bind(this);

    componentDidMount() {
        this.populateUserGames();
    }

    render() {
        return <Container>{this.state.loading ? <Loading /> : <ProfileGamesView removeGame={this.removeGame} giantbombGames={this.state.giantbombGames} userGames={this.state.userGames} toggleGameFavorite={this.toggleGameFavorite} />}</Container>;
    }
}

export default GamesView;
