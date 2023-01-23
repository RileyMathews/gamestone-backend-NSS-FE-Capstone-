import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import { Provider, Context } from "./Provider";

/* 
    module to handle top level data management and view displaying of the app
    authors Riley Mathews
*/
class App extends Component {
    render() {
        return (
            <div>
                <Provider>
                    <Context.Consumer>
                        {(context) => (
                            <div>
                                <NavBar
                                    setView={context.setView}
                                    setSearchType={context.setSearchType}
                                    setSearchValue={context.setSearchValue}
                                    searchDisplay={context.state.searchDisplay}
                                    deleteActiveUser={context.deleteActiveUser}
                                    activeUser={context.state.activeUser}
                                    setActiveUser={context.setActiveUser}
                                    gamertag={context.state.userGamertag}
                                    currentView={context.state.currentView}
                                />
                                {context.showView()}
                            </div>
                        )}
                    </Context.Consumer>
                </Provider>
            </div>
        );
    }
}

export default App;
