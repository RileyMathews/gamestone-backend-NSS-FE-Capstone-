import React, { Component } from "react";
import { Container, Button, Form, Section } from "react-bulma-components";
import APIManager from "../api/APIManager";
import Result from "./Result";
import ArrayManager from "../methods/ArrayManager";
import url from "../api/APISettings";
import Loading from "../components/Loading";

/* 
    module to display the search page for games
    authors Riley Mathews
*/

class SearchView extends Component {
    state = {
        userGames: [],
        searchString: "",
        currentSearch: "",
        results: [],
        waiting: false,
        searchPlaceholder: "",
    };

    setPlaceholderSearchValue = function () {
        const placeholderSearches = [
            "Mario",
            "Metroid",
            "God of War",
            "Uncharted",
            "Star Wars",
            "Warcraft",
            "Starcraft",
            "Doom",
            "Sonic",
            "Final Fantasy",
            "Pokemon",
            "Mass Effect",
            "Skyrim",
            "Fallout",
            "Dark Souls",
            "Dishonored",
            "Prey",
            "Zelda",
            "Super Smash Bros",
            "Street Fighter",
            "Mortal Kombat",
            "Red Dead Redemption",
            "Overwatch",
            "Assasin's Creed",
            "Elder Scrolls",
            "Forza",
            "Halo",
            "Gears of War",
            "Dragon Quest",
            "Diablo",
            "Battlefield",
            "Super Smash Bros.",
            "XCOM",
            "Command and Conquer",
            "Sims",
            "Zelda like a fox",
            "Minecraft",
            "The Witcher",
            "Cyberpunk",
        ];
        this.setState({
            searchPlaceholder: ArrayManager.getRandomItem(placeholderSearches),
        });
    }.bind(this);

    removeGameFromCollection = function (giantbombGameId) {
        const userGame = this.state.userGames.find((game) => game.giantbomb_game === giantbombGameId);
        APIManager.delete("usergame", userGame.id).then((_) => {
            const currentState = this.state.userGames;
            const newState = currentState.filter((item) => item !== userGame);
            this.setState({
                userGames: newState,
            });
        });
    }.bind(this);

    addGameToCollection = function (game, favorite) {
        // build up data to post to database
        const dataToPost = {
            user: `${url}user/${this.state.activeUser}/`,
            giantbomb_game: game.id,
            isFavorited: favorite,
        };

        APIManager.post("usergame", dataToPost)
            .then((r) => r.json())
            .then((game) => {
                const oldGames = this.state.userGames;
                const newGames = [game];
                const newGamesState = oldGames.concat(newGames);
                this.setState({ userGames: newGamesState });
            });
    }.bind(this);

    componentDidMount() {
        this.setPlaceholderSearchValue();
        APIManager.getUser()
            .then((r) => r.json())
            .then((userResponse) => {
                this.setState({
                    userGames: userResponse[0].games,
                });
            });
    }

    searchForGame = function () {
        APIManager.searchGbGames(this.state.searchString, 1)
            .then((r) => r.json())
            .then((response) => {
                this.setState({
                    results: response.results,
                    waiting: false,
                });
            });
    }.bind(this);

    handleSearchInputChanage = function (event) {
        this.setState({ searchString: event.target.value });
    }.bind(this);

    handleSearchSubmit = function (evt) {
        evt.preventDefault();
        this.searchForGame();
        this.setState({
            currentSearch: this.state.searchString,
            waiting: true,
            results: [],
        });
    }.bind(this);

    render() {
        return (
            <Container>
                <Section>
                    <form onSubmit={this.handleSearchSubmit}>
                        <Form.Field>
                            <Form.Input id="search__input" placeholder={this.state.searchPlaceholder} onChange={this.handleSearchInputChanage} value={this.state.searchString} />
                        </Form.Field>
                        <Form.Field>
                            <Button id="search__submit" color="primary" type="submit">
                                Search
                            </Button>
                        </Form.Field>
                    </form>
                </Section>
                <Section>
                    <div id="results">
                        {this.state.waiting ? <Loading /> : null}
                        {this.state.results.map((result) => (
                            <Result userGames={this.state.userGames} info={result} key={result.id} addGameToCollection={this.addGameToCollection} removeGameFromCollection={this.removeGameFromCollection} />
                        ))}
                    </div>
                </Section>
            </Container>
        );
    }
}

export default SearchView;
