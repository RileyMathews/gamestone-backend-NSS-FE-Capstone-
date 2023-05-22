import APIManager from "../api/APIManager";
import url from "../api/APISettings";

/* 
    module to manage users game collection
    authors Riley Mathews
*/

const GameManager = Object.create(null, {
    // function to add a game to users collection
    addGameToCollection: {
        value: function (game, favorite) {
            // build up data to post to database
            const dataToPost = {
                user: `${url}user/${this.state.activeUser}/`,
                giantbomb_game: game.id,
                isFavorited: favorite,
            };

            // add game id to users collection of games ids
            const oldIds = this.state.userGamesIds;
            const newIds = [game.id];
            const newStateOfIds = oldIds.concat(newIds);
            this.setState({ userGamesIds: newStateOfIds });

            // get full game info from gb api and add it to usergames state
            APIManager.getGbGame(game.id)
                .then((r) => r.json())
                .then((response) => {
                    const oldGames = this.state.userGames;
                    const newGame = [response.results];
                    const newGamesState = oldGames.concat(newGame);
                    this.setState({ userGames: newGamesState });
                });
            // add game data to userGames state
            // post that data to database
            APIManager.post("usergame", dataToPost)
                .then((r) => r.json())
                .then((response) => {
                    // build up object representing full data needed for state
                    const gameToAddToState = {
                        user: response.userId,
                        id: response.id,
                        giantbomb_game: response.giantbomb_game,
                        isFavorited: response.isFavorited,
                    };
                    // build up array of new app state for user games
                    const oldState = this.state.userGamesStats;
                    const newState = oldState.concat([gameToAddToState]);
                    this.setState({ userGamesStats: newState });
                });
        },
    },
    // function to remove a game from the users collection
    removeGameFromCollection: {
        value: function (id) {
            // get index of game to be removed
            const indexOfGameToRemove = this.state.userGames.findIndex((game) => game.id === id);
            // get user game id for deletion
            const userGameId = this.state.userGamesStats[indexOfGameToRemove].id;
            // get current state of userGames
            const newGamesState = this.state.userGames;
            // remove game by index
            newGamesState.splice(indexOfGameToRemove, 1);

            // remove game from ids collection
            const indexOfId = this.state.userGamesIds.findIndex((idFromArray) => idFromArray === id);
            const newIdsState = this.state.userGamesIds;
            newIdsState.splice(indexOfId, 1);

            // remove the game from stats collection
            const indexOfStats = this.state.userGamesStats.findIndex((game) => game.giantbomb_game === id);
            const newStatsState = this.state.userGamesStats;
            newStatsState.splice(indexOfStats, 1);

            // set state from values of above splices
            this.setState({
                userGamesStats: newStatsState,
                userGames: newGamesState,
                userGamesIds: newIdsState,
            });

            APIManager.delete("usergame", userGameId);
        },
    },
    // function to toggle the favorite status on a game
    toggleGameFavorite: {
        value: function (event) {
            const userGameId = event.target.id.split("__")[3];
            // cycle through games stats
            const userGamesStats = this.state.userGamesStats;
            let dataToChange;
            const newState = userGamesStats.map((game) => {
                if (parseInt(userGameId, 10) === parseInt(game.id, 10)) {
                    game.isFavorited = game.isFavorited ? false : true;
                    dataToChange = game;
                    return game;
                } else {
                    return game;
                }
            });
            this.setState({ userGamesStats: newState });
            APIManager.put("usergame", dataToChange, userGameId);
        },
    },
});

export default GameManager;
