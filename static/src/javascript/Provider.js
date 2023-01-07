import React, { Component } from "react"
import PlatformManager from "./methods/PlatformManager";
import UserManager from "./methods/UserManager";
import GameManager from "./methods/GameManager";
import ViewManager from "./methods/ViewManager";

/*
    This new function in React - createContext() - is what will
    allow you to create a central store of data, and have any
    component become a Consumer of the data that it cares about.
*/
export const Context = React.createContext()

export class Provider extends Component {


    /*
    The initial state of the data provider should include
    default values for any top-level component that will
    need the data. In this case, PoliticianList is my only
    top-level component. It is not a child of any other
    component.
    */
    state = {
        activeUser: sessionStorage.getItem("userId"),
        userId: null,
        currentView: "profile",
        userFirstName: "",
        userLastName: "",
        userGamertag: "",
        userGamesIds: [],
        userGamesStats: [],
        userGames: [],
        userPlatforms: [],
        userPlatformsIds: [],
        allPlatforms: [],
        userUnownedPlatforms: []
    }

    /* 
        import methods
    */
    /* 
        platform manager
    */
    // getPlatforms = PlatformManager.getPlatforms.bind(this)
    addPlatform = PlatformManager.addPlatform.bind(this)
    removePlatform = PlatformManager.removePlatform.bind(this)
    isPlatformOwned = PlatformManager.isPlatformOwned.bind(this)

    /* 
        user manager
    */
    getUserInformation = UserManager.getUserInformation.bind(this)
    setActiveUser = UserManager.setActiveUser.bind(this)
    clearActiveUser = UserManager.clearActiveUser.bind(this)

    /* 
        game manager functions
    */
    addGameToCollection = GameManager.addGameToCollection.bind(this)
    removeGameFromCollection = GameManager.removeGameFromCollection.bind(this)
    toggleGameFavorite = GameManager.toggleGameFavorite.bind(this)
    /* 
        View manager functions
    */
    setView = ViewManager.setView.bind(this)
    showView = ViewManager.showView.bind(this)

    /*
        Since this is just an ordinary component that extends
        React.Component, you can use `componentDidMount` to
        hit your API and then update state.
    */
    componentDidMount() {
        if (localStorage.getItem('user_token')) {
            this.getUserInformation()
        }
    }

    /*
        This component will not render any DOM element itself.
        Rather it becomes a virtual wrapper around any component
        that wants to serve as the data provider for its children.
    */
    render() {
        return (
            <Context.Provider value={{
                state: this.state,
                // game manager methods
                addGameToCollection: this.addGameToCollection,
                removeGameFromCollection: this.removeGameFromCollection,
                toggleGameFavorite: this.toggleGameFavorite,
                // platform manager
                addPlatform: this.addPlatform,
                removePlatform: this.removePlatform,
                isPlatformOwned: this.isPlatformOwned,
                // user manager
                getUserInformation: this.getUserInformation,
                setActiveUser: this.setActiveUser,
                clearActiveUser: this.clearActiveUser,
                setView: this.setView,
                showView: this.showView
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}
