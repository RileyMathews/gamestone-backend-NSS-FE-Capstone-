import React from 'react'
import LoginView from '../login/LoginView';
import SearchView from '../search/SearchView';
import SuggestView from '../suggestGame/SuggestView';
import { Heading } from 'react-bulma-components';
import ProfileView from '../profile/ProfileView';
import { Context } from '../Provider';
/* 
    module to handle view of main app page
    authors Riley Mathews
*/

const ViewManager = Object.create(null, {
    // function to change the current view state off the app
    setView: {
        value: function (e) {
            let view = null

            // Click event triggered switching view
            if (e.hasOwnProperty("target")) {
                view = e.target.id.split("__")[1]

                // View switch manually triggered by passing in string
            } else {
                view = e
            }

            // If user clicked logout in nav, empty local storage and update activeUser state
            if (view === "logout") {
                this.setActiveUser(null)
                localStorage.clear()
                sessionStorage.clear()
                this.clearActiveUser()
            }

            // Update state to correct view will be rendered
            this.setState({
                currentView: view
            })

        }
    },
    // function called every time app re renders
    // and will display the view based on the current 
    // property in state
    showView: {
        value: function () {
            if (localStorage.getItem("user_token") === null) {
                return <LoginView
                    setActiveUser={this.setActiveUser}
                    setView={this.setView}
                    getUserInformation={this.getUserInformation}
                    getPlatforms={this.getPlatforms} />
            } else {
                switch (this.state.currentView) {
                    case "search":
                        return <SearchView
                            activeUser={this.state.activeUser}
                            userGamesIds={this.state.userGamesIds}
                            addGameToCollection={this.addGameToCollection}
                            removeGame={this.removeGameFromCollection}
                            allPlatforms={this.state.allPlatforms}
                        />
                    case "suggest":
                        return (
                            <Context.Consumer>
                                {context => (
                                    <SuggestView
                                        userGamesIds={context.state.userGamesIds}
                                        addGameToCollection={context.addGameToCollection}
                                        removeGameFromCollection={context.removeGameFromCollection}
                                        userGames={context.state.userGames}
                                        userGamesStats={context.state.userGamesStats}
                                        userPlatformsIds={context.state.userPlatformsIds}
                                        allPlatforms={context.state.allPlatforms}
                                    />
                                )}
                            </Context.Consumer>
                        )
                    case "dummy":
                        return <Heading>This is a dummy page I can use to make sure I don't spam giant bomb's public api too much</Heading>
                    case "profile":
                    default:
                        return <ProfileView
                            firstName={this.state.userFirstName}
                            lastName={this.state.userLastName}
                            gamertag={this.state.userGamertag}
                            activeUser={this.state.activeUser} userGamesIds={this.state.userGamesIds}
                            userGamesStats={this.state.userGamesStats} games={this.state.userGames}
                            toggleGameFavorite={this.toggleGameFavorite}
                            removeGame={this.removeGameFromCollection}
                            setView={this.setView}
                            userPlatforms={this.state.userPlatforms}
                            allPlatforms={this.state.allPlatforms}
                            userUnownedPlatforms={this.state.userUnownedPlatforms}
                            addPlatform={this.addPlatform}
                            removePlatform={this.removePlatform}
                        />
                }
            }
        }
    }
})

export default ViewManager
