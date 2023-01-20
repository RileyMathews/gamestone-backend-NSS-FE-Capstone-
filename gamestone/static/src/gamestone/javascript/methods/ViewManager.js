import React from 'react'
import LoginView from '../login/LoginView';
import SearchView from '../search/SearchView';
import SuggestView from '../suggestGame/SuggestView';
import { Heading } from 'react-bulma-components';
import GamesView from '../profile/ProfileView';
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
                this.clearActiveUser()
                localStorage.clear()
                sessionStorage.clear()
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
                        return <SearchView />
                    case "suggest":
                        return <SuggestView />
                    case "profile":
                    default:
                        return <GamesView />
                }
            }
        }
    }
})

export default ViewManager
