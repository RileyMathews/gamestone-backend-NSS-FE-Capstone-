import React, { Component } from "react";
import { Container, Button, Columns, Heading } from "react-bulma-components";
import Result from "../search/Result";
import SuggestionFilterView from "./SuggestionFilterView";
import NoGamesDisplay from "../noGames/NoGamesDisplay";
import ArrayManager from "../methods/ArrayManager";
import APIManager from "../api/APIManager";
import Loading from "../components/Loading";

/* 
    module to handle displaying and calling logic for suggesting games to the user
    authors Riley Mathews
*/
class SuggestView extends Component {
    state = {
        resultBasis: "",
        results: [],
        filterByFavorites: false,
        userHasFavorites: false,
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
                const foundFavoriteGame = userGames.find((game) => game.isFavorited === true);
                if (foundFavoriteGame !== undefined) {
                    this.setState({ userHasFavorites: true });
                }
            });
    }.bind(this);

    componentDidMount() {
        this.populateUserGames();
    }

    getCurrentFilters = function () {
        const filters = {
            favorite: this.state.filterByFavorites,
        };
        return filters;
    }.bind(this);

    suggestGameBySimilarity = function (filters) {
        // get a random game based on the favorite filter applied
        const selectedGame = ArrayManager.getRandomUserGame(this.state.giantbombGames, this.state.userGames, filters);

        // get random game from the similar games category
        const gameToSuggest = ArrayManager.getRandomUnownedGame(
            selectedGame.similar_games,
            this.state.userGames.map((g) => g.id)
        );

        if (gameToSuggest !== false) {
            // query gb database for the new game
            APIManager.getGbGame(gameToSuggest.id)
                .then((r) => r.json())
                .then((response) => {
                    const game = response.results;
                    this.setState({
                        results: [game],
                        resultBasis: `This game was suggested because it is similar to ${selectedGame.name} from your collection.`,
                    });
                });
        } else {
            this.setState({
                results: [],
                resultBasis: `We were going to suggest you a game similar to ${selectedGame.name}, but you either already have all the games we could find, or there are no similar games in the database.`,
            });
        }
    }.bind(this);

    suggestGameByDeveloper = function (filters) {
        // get a random game
        const selectedUserGame = ArrayManager.getRandomUserGame(this.state.giantbombGames, this.state.userGames, filters);
        // get a random developer from that game
        const selectedDeveloper = ArrayManager.getRandomItem(selectedUserGame.developers);
        // query the giantbomb database for that company
        APIManager.getGbCompany(selectedDeveloper.id)
            .then((r) => r.json())
            .then((response) => {
                const developerGames = response.results.developed_games;
                // get random unowned game  from that list
                const selectedGame = ArrayManager.getRandomUnownedGame(
                    developerGames,
                    this.state.userGames.map((g) => g.id)
                );
                // check to make sure an unowned game was found
                if (selectedGame !== false) {
                    // get game info
                    APIManager.getGbGame(selectedGame.id)
                        .then((r) => r.json())
                        .then((response) => {
                            const game = response.results;
                            this.setState({
                                results: [game],
                                resultBasis: `${selectedDeveloper.name} had a hand in making ${selectedUserGame.name}, they also worked on this game.`,
                            });
                        });
                } else {
                    this.setState({
                        results: [],
                        resultBasis: `We were going to show you a game from ${selectedDeveloper.name}, who worked on ${selectedGame.name}, but it appears you already own every game they worked on.`,
                    });
                }
            });
    }.bind(this);

    setFilters = function (event) {
        const favoriteValue = document.querySelector("#favoriteFilter").checked;
        this.setState({
            filterByFavorites: favoriteValue,
        });
    }.bind(this);

    clearFilters = function () {
        this.setState({
            filterByFavorites: false,
        });
        document.querySelector("#favoriteFilter").checked = false;
    }.bind(this);

    getGameBySimilarity = function () {
        const filters = this.getCurrentFilters();
        this.suggestGameBySimilarity(filters);
    }.bind(this);

    getGameByDeveloper = function () {
        const filters = this.getCurrentFilters();
        this.suggestGameByDeveloper(filters);
    }.bind(this);

    doesUserHaveGames = function () {
        if (this.state.filterByFavorites === true && this.state.userHasFavorites === false) {
            return <Heading>You have no favorite games to filter by</Heading>;
        } else {
            if (this.state.userGames.length === 0) {
                return <NoGamesDisplay />;
            } else {
                return (
                    <div>
                        <Heading>Suggest Games</Heading>
                        <Button.Group>
                            <Button onClick={this.getGameBySimilarity}>By Similar Games</Button>
                            <Button onClick={this.getGameByDeveloper}>By Developer</Button>
                        </Button.Group>
                        <p>{this.state.resultBasis}</p>
                        {this.state.results.map((result) => (
                            <Result userGames={this.state.userGames} info={result} key={result.id} />
                        ))}
                    </div>
                );
            }
        }
    }.bind(this);

    render() {
        return (
            <Container>
                {this.state.loading ? (
                    <Loading />
                ) : (
                    <Columns>
                        <Columns.Column size={3}>
                            <SuggestionFilterView setFilters={this.setFilters} clearFilters={this.clearFilters} />
                        </Columns.Column>
                        <Columns.Column>{this.doesUserHaveGames()}</Columns.Column>
                    </Columns>
                )}
            </Container>
        );
    }
}

export default SuggestView;
