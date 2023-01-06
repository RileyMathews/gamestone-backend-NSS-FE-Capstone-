import ArrayManager from "./ArrayManager";
import APIManager from "../api/APIManager";
import PlatformManager from "./PlatformManager";

/* 
    module to handle logic and filters for suggesting games to the user
    authors Riley Mathews
*/

const SuggestionManager = Object.create(null, {
    // function to get filters from apps state
    // and wrap them in an object to be passed to subsequent search functions
    getCurrentFilters: {
        value: function () {
            const filters = {
                favorite: this.state.filterByFavorites,
                console: this.state.filterByConsoles
            }
            return filters
        }
    },
    // function to suggest a game using the 'similar games'
    // information in gb's api
    suggestGameBySimilarity: {
        value: function (filters) {
            // get a random game based on the favorite filter applied
            const selectedGame = ArrayManager.getRandomUserGame(this.props.userGames, this.props.userGamesStats, filters)

            // get random game from the similar games category
            const gameToSuggest = ArrayManager.getRandomUnownedGame(selectedGame.similar_games, this.props.userGamesIds)

            if (gameToSuggest !== false) {
                // query gb database for the new game
                APIManager.getGbGame(gameToSuggest.id)
                    .then(response => {
                        const game = response.results
                        if (filters.console === false || (PlatformManager.canUserPlayGame(game, this.props.userPlatformsIds) && filters.console)) {
                            this.setState({
                                results: [game],
                                resultBasis: `This game was suggested because it is similar to ${selectedGame.name} from your collection.`
                            })
                        } else {
                            this.setState({
                                results: [],
                                resultBasis: `Sorry the game we found was not available on any platforms you own, please try again`
                            })
                        }
                    })
            } else {
                this.setState({
                    results: [],
                    resultBasis: `We were going to suggest you a game similar to ${selectedGame.name}, but you either already have all the games we could find, or there are no similar games in the database.`
                })
            }
        }
    },
    // function to suggest a game that was developed
    // in part by a developer who also worked
    // on a game the user already owns
    suggestGameByDeveloper: {
        value: function (filters) {
            // get a random game
            const selectedUserGame = ArrayManager.getRandomUserGame(this.props.userGames, this.props.userGamesStats, filters)
            // get a random developer from that game
            const selectedDeveloper = ArrayManager.getRandomItem(selectedUserGame.developers)
            // query the giantbomb database for that company 
            APIManager.getGbCompany(selectedDeveloper.id)
                .then(response => {
                    const developerGames = response.results.developed_games
                    // get random unowned game  from that list
                    const selectedGame = ArrayManager.getRandomUnownedGame(developerGames, this.props.userGamesIds)
                    // check to make sure an unowned game was found
                    if (selectedGame !== false) {
                        // get game info
                        APIManager.getGbGame(selectedGame.id)
                            .then(response => {
                                const game = response.results
                        if (filters.console === false || (PlatformManager.canUserPlayGame(game, this.props.userPlatformsIds) && filters.console)) {
                            this.setState({
                                results: [game],
                                resultBasis: `${selectedDeveloper.name} had a hand in making ${selectedUserGame.name}, they also worked on this game.`
                            })
                        } else {
                            this.setState({
                                results: [],
                                resultBasis: `Sorry the game we found was not available on any platforms you own, please try again`
                            })
                        }
                    })
                    } else {
                        this.setState({
                            results: [],
                            resultBasis: `We were going to show you a game from ${selectedDeveloper.name}, who worked on ${selectedGame.name}, but it appears you already own every game they worked on.`
                        })
                    }
                })
        }
    }
})

export default SuggestionManager