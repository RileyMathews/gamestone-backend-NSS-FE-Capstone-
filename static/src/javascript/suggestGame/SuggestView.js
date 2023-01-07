import React, { Component } from 'react'
import { Container, Button, Columns, Heading } from 'react-bulma-components'
import Result from '../search/Result';
import SuggestionManager from '../methods/SuggestionManager'
import SuggestionFilterView from './SuggestionFilterView';
import NoGamesDisplay from '../noGames/NoGamesDisplay';

/* 
    module to handle displaying and calling logic for suggesting games to the user
    authors Riley Mathews
*/
class SuggestView extends Component {

    state = {
        resultBasis: "",
        results: [],
        userGamesLength: this.props.userGames.length,
        filterByFavorites: false,
        filterByConsoles: false,
        userHasFavorites: false,
        userHasPlatforms: false
    }

    /* 
        import functions
    */
    getCurrentFilters = SuggestionManager.getCurrentFilters.bind(this)
    suggestGameBySimilarity = SuggestionManager.suggestGameBySimilarity.bind(this)
    suggestGameByDeveloper = SuggestionManager.suggestGameByDeveloper.bind(this)


    setFilters = function (event) {
        const favoriteValue = document.querySelector("#favoriteFilter").checked
        const consoleValue = document.querySelector("#consoleFilter").checked
        this.setState({
            filterByFavorites: favoriteValue,
            filterByConsoles: consoleValue
        })
    }.bind(this)

    clearFilters = function () {
        this.setState({
            filterByConsoles: false,
            filterByFavorites: false
        })
        document.querySelector("#favoriteFilter").checked = false
        document.querySelector("#consoleFilter").checked = false
    }.bind(this)

    getGameBySimilarity = function () {
        const filters = this.getCurrentFilters()
        this.suggestGameBySimilarity(filters)
    }.bind(this)

    getGameByDeveloper = function () {
        const filters = this.getCurrentFilters()
        this.suggestGameByDeveloper(filters)
    }.bind(this)


    componentDidMount() {
        const foundFavoriteGame = this.props.userGamesStats.find(game => game.isFavorited === true)
        if (foundFavoriteGame !== undefined) {
            this.setState({ userHasFavorites: true })
        }
        if (this.props.userPlatformsIds.length > 0) {
            this.setState({ userHasPlatforms: true })
        }
    }

    doesUserHaveGames = function () {
        if (this.state.filterByFavorites === true && this.state.userHasFavorites === false) {
            return <Heading>You have no favorite games to filter by</Heading>
        } else {
            if (this.state.userGamesLength === 0) {
                return <NoGamesDisplay />
            } else {
                if (this.state.filterByConsoles === true && this.state.userHasPlatforms === false) {
                    return <Heading>You have no consoles to filter by</Heading>
                } else {
                    return <div>
                        <Heading>Suggest Games</Heading>
                        <Button.Group>
                            <Button onClick={this.getGameBySimilarity}>By Similar Games</Button>
                            <Button onClick={this.getGameByDeveloper}>By Developer</Button>
                        </Button.Group>
                        <p>{this.state.resultBasis}</p>
                        {this.state.results.map(result => (
                            <Result info={result} key={result.id} userGamesIds={this.props.userGamesIds} addGameToCollection={this.props.addGameToCollection} removeGame={this.props.removeGameFromCollection} />
                        ))}
                    </div>
                }
            }
        }

    }.bind(this)


    render() {
        return (
            <Container>
                <Columns>
                    <Columns.Column size={3}>
                        <SuggestionFilterView setFilters={this.setFilters} clearFilters={this.clearFilters} />
                    </Columns.Column>
                    <Columns.Column>
                        {this.doesUserHaveGames()}
                    </Columns.Column>
                </Columns>
            </Container>
        )
    }
}

export default SuggestView


