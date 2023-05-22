import APIManager from "../api/APIManager";

/* 
    module to manage active users information
    authors Riley Mathews
*/

const UserManager = Object.create(null, {
    // function to get user information from api and post it to state
    getUserInformation: {
        value: function () {
            // fetches the users account information
            APIManager.getUser(this.state.activeUser)
                .then((r) => r.json())
                .then((userResponse) => {
                    const user = userResponse[0];
                    // get users game information
                    const usersGames = user.games;
                    // get users games giant bomb ids into seperate array
                    const arrayOfGbIds = usersGames.map((game) => game.giantbomb_game);
                    // push ids into promise array for getting giantbombs info
                    let promises = [];
                    arrayOfGbIds.forEach((id) => {
                        promises.push(APIManager.getGbGame(id));
                    });
                    // set information we have access to now. our users game info, and users owned platforms and ids for owned games and platforms
                    this.setState({
                        userGamesStats: usersGames,
                        userGamesIds: arrayOfGbIds,
                        userId: user.id,
                        activeUser: user.id,
                        userFirstName: user.first_name,
                        userLastName: user.last_name,
                        userGamertag: user.username,
                    });
                    Promise.all(promises)
                        .then((r) => r.json())
                        .then((response) => {
                            // with the response of that array, setstate of app
                            const userGamesState = response.map((response) => response.results);
                            this.setState({ userGames: userGamesState });
                        });
                });
        },
    },
    // function to set the active user in state
    setActiveUser: {
        value: function (userId) {
            this.setState({ activeUser: userId });
        },
    },
    clearActiveUser: {
        value: function () {
            APIManager.logoutUser();
            this.setState({
                activeUser: null,
                userFirstName: "",
                userLastName: "",
                userGamertag: "",
                userGamesIds: [],
                userGamesStats: [],
                userGames: [],
                userPlatforms: [],
                userPlatformsIds: [],
                allPlatforms: [],
                userUnownedPlatforms: [],
            });
        },
    },
});

export default UserManager;
