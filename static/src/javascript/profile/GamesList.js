import React, { Component } from 'react'
import Game from './Game';
import { Context } from '../Provider';
import GamesFilters from './GamesFilters';
import { Columns } from 'react-bulma-components';

/* 
    module to display information about a list of games passed to it
    authors Riley Mathews
*/

class GamesList extends Component {

    state = {
        filters: [],
        searchString: "",
        filterByFavorite: false
    }

    // function to update filter whenever a filter is changed
    updateFilter = function (event) {
        const filter = event.target.value
        let newFilters = Object.assign([], this.state.filters)
        if (event.target.checked) {
            newFilters.push(filter)
            this.setState({ filters: newFilters })
        } else {
            const index = newFilters.findIndex(item => item === filter)
            newFilters.splice(index, 1)
            this.setState({ filters: newFilters })
        }
    }.bind(this)

    // function to clear filters and corresponding dom elements
    clearFilters = function () {
        this.setState({ filters: [], searchString: "", filterByFavorite: false })
        document.querySelector("#filter__backlog").checked = false
        document.querySelector("#filter__toBePlayed").checked = false
        document.querySelector("#filter__playing").checked = false
        document.querySelector("#filter__finished").checked = false
        document.querySelector("#filter__favorite").checked = false
        document.querySelector("#filter__search").value = ""
    }.bind(this)

    userOwnsGame = function (game, context) {
        if (context.state.userGamesIds.includes(game.id)) {
            return true
        } else {
            return false
        }
    }

    toggleFavoriteFilter = function () {
        this.setState({ filterByFavorite: this.state.filterByFavorite ? false : true })
    }.bind(this)

    updateSearchString = function (event) {
        this.setState({ searchString: event.target.value })
    }.bind(this)

    filteredGames = function (context) {
        let games
        let filteredGamesStatsIds

        // get users games stats
        const userGamesStats = context.state.userGamesStats

        // assign that to a new array in memory to avoid deleting user games stats
        let filteredGamesStats = userGamesStats.map(item => Object.assign({}, item))

        // get users games
        const userGames = context.state.userGames

        // check for filter by game favorite
        if (this.state.filterByFavorite === true) {
            filteredGamesStats = filteredGamesStats.filter(game => game.isFavorited === true)
        }

        // map the games stats that match filters to gb game info
        filteredGamesStatsIds = filteredGamesStats.map(game => game.gbId)
        const filteredGames = userGames.filter(game => filteredGamesStatsIds.includes(game.id))
        games = filteredGames

        // checks for filtering by search and if there is a search string, filters games by name
        if (this.state.searchString !== "") {
            games = games.filter(game => game.name.toLowerCase().includes(this.state.searchString.toLowerCase()))
        }

        // finally returns filtered game information sorted alphebetaically 
        return games.sort(this.compare)
    }.bind(this)



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
    }


    render() {
        return (
            <Context.Consumer>
                {context => (
                    <Columns>
                        <Columns.Column size={2}>
                            <GamesFilters
                                updateFilter={this.updateFilter}
                                clearFilters={this.clearFilters}
                                updateSearchString={this.updateSearchString}
                                toggleFavoriteFilter={this.toggleFavoriteFilter}
                            />
                        </Columns.Column>
                        <Columns.Column>
                            {this.filteredGames(context).map(game => (
                                <Game
                                    removeGameFromCollection={context.removeGameFromCollection}
                                    gameInfo={game.game}
                                    userGamesStats={context.state.userGamesStats}
                                    game={game}
                                    key={game.id}
                                    userOwnsGame={this.userOwnsGame(game, context)}
                                    gbId={game.id}
                                    toggleGameFavorite={context.toggleGameFavorite}
                                />
                            ))}
                        </Columns.Column>
                    </Columns>
                )}
            </Context.Consumer>
        )
    }
}

export default GamesList



