import React, { Component } from "react";
import Game from "./Game";
import GamesFilters from "./GamesFilters";
import { Columns } from "react-bulma-components";

/* 
    module to display information about a list of games passed to it
    authors Riley Mathews
*/

class GamesList extends Component {
    state = {
        filters: [],
        searchString: "",
        filterByFavorite: false,
    };

    // function to update filter whenever a filter is changed
    updateFilter = function (event) {
        const filter = event.target.value;
        let newFilters = Object.assign([], this.state.filters);
        if (event.target.checked) {
            newFilters.push(filter);
            this.setState({ filters: newFilters });
        } else {
            const index = newFilters.findIndex((item) => item === filter);
            newFilters.splice(index, 1);
            this.setState({ filters: newFilters });
        }
    }.bind(this);

    // function to clear filters and corresponding dom elements
    clearFilters = function () {
        this.setState({
            filters: [],
            searchString: "",
            filterByFavorite: false,
        });
        document.querySelector("#filter__backlog").checked = false;
        document.querySelector("#filter__toBePlayed").checked = false;
        document.querySelector("#filter__playing").checked = false;
        document.querySelector("#filter__finished").checked = false;
        document.querySelector("#filter__favorite").checked = false;
        document.querySelector("#filter__search").value = "";
    }.bind(this);

    toggleFavoriteFilter = function () {
        this.setState({
            filterByFavorite: this.state.filterByFavorite ? false : true,
        });
    }.bind(this);

    updateSearchString = function (event) {
        this.setState({ searchString: event.target.value });
    }.bind(this);

    filteredGames = function () {
        let games;
        let filteredGamesStatsIds;

        // get users games stats
        const userGamesStats = this.props.userGames;

        // assign that to a new array in memory to avoid deleting user games stats
        let filteredGamesStats = userGamesStats.map((item) => Object.assign({}, item));

        // get users games
        const userGames = this.props.giantbombGames;

        // check for filter by game favorite
        if (this.state.filterByFavorite === true) {
            filteredGamesStats = filteredGamesStats.filter((game) => game.isFavorited === true);
        }

        // map the games stats that match filters to gb game info
        filteredGamesStatsIds = filteredGamesStats.map((game) => game.giantbomb_game);
        const filteredGames = userGames.filter((game) => filteredGamesStatsIds.includes(game.id));
        games = filteredGames;

        // checks for filtering by search and if there is a search string, filters games by name
        if (this.state.searchString !== "") {
            games = games.filter((game) => game.name.toLowerCase().includes(this.state.searchString.toLowerCase()));
        }

        // finally returns filtered game information sorted alphebetaically
        return games.sort(this.compare);
    }.bind(this);

    compare = function (a, b) {
        // Use toUpperCase() to ignore character casing
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    };

    render() {
        return (
            <Columns>
                <Columns.Column size={2}>
                    <GamesFilters updateFilter={this.updateFilter} clearFilters={this.clearFilters} updateSearchString={this.updateSearchString} toggleFavoriteFilter={this.toggleFavoriteFilter} />
                </Columns.Column>
                <Columns.Column>
                    {this.filteredGames().map((game) => (
                        <Game removeGameFromCollection={this.props.removeGameFromCollection} gameInfo={game.game} userGames={this.props.userGames} game={game} key={game.id} giantbomb_game={game.id} toggleGameFavorite={this.props.toggleGameFavorite} />
                    ))}
                </Columns.Column>
            </Columns>
        );
    }
}

export default GamesList;
