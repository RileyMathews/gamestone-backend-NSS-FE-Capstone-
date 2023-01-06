import React, { Component } from 'react'
import { Container, Button, Pagination, Page, PageLink, Image, Form } from 'react-bulma-components';
import $ from 'jquery'
import APIManager from '../api/APIManager';
import Result from './Result';
import './SearchView.css'
import ArrayManager from '../methods/ArrayManager'

/* 
    module to display the search page for games
    authors Riley Mathews
*/

class SearchView extends Component {
    state = {
        searchString: "",
        currentSearch: "",
        results: [],
        waitingMessage: "",
        currentPage: 1,
        totalPages: null,
        waiting: false,
        placeholderSearches: [
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
            "Cyberpunk"
        ]
    }

    searchForGame = function () {
        APIManager.searchGbGames(this.state.searchString, 1)
            .then(response => {
                this.setState({
                    totalPages: Math.ceil(response.number_of_total_results / 10),
                    results: response.results,
                    waitingMessage: "",
                    waiting: false
                })
            })
    }.bind(this)

    changeSearchPage = function (page) {
        APIManager.searchGbGames(this.state.currentSearch, page)
            .then(response => {
                this.setState({
                    results: response.results,
                    waiting: false
                })
            })
    }.bind(this)


    handleSearchInputChanage = function () {
        const inputField = $("#search__input")
        this.setState({ searchString: inputField.val() })
    }.bind(this)

    handleSearchSubmit = function (evt) {
        evt.preventDefault()
        this.searchForGame()
        this.setState({
            currentSearch: this.state.searchString,
            waitingMessage: "Waiting...",
            waiting: true,
            searchString: "",
            results: []
        })
        $("#search__input").blur()
    }.bind(this)

    setPage = function (pageNumber) {
        this.setState({ currentPage: pageNumber })
        this.changeSearchPage(pageNumber)
    }.bind(this)

    paginationDisplay = function () {
        if (this.state.results.length === 0 || this.state.totalPages <= 1) {
            return null
        } else {
            return (
                <Pagination onChange={this.setPage} />
            )
        }
    }.bind(this)

    render() {
        return (
            <Container>
                <form onSubmit={this.handleSearchSubmit}>
                    <Form.Field>
                        <Form.Input id="search__input" placeholder={ArrayManager.getRandomItem(this.state.placeholderSearches)} onChange={this.handleSearchInputChanage} value={this.state.searchString} />
                    </Form.Field>
                    <Form.Field>
                        <Button id="search__submit" color="primary" type="submit">Search</Button>
                    </Form.Field>
                </form>
                <div id="results">
                    {this.state.waiting ? <Image src="./Pacman-1s-200px.svg" isSize="128x128" /> : null}
                    {this.state.results.map(result => (
                        <Result allPlatforms={this.props.allPlatforms} info={result} key={result.id} userGamesIds={this.props.userGamesIds} addGameToCollection={this.props.addGameToCollection} removeGame={this.props.removeGame} />
                    ))}
                </div>
                {this.paginationDisplay()}
            </Container>
        )
    }
}

export default SearchView

