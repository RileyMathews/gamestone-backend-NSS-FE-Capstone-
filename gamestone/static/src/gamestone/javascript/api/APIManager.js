/* 
    module to provide functionality for working with api
    Authors: Riley Mathews
*/
import url from "./APISettings";
import Cookies from "js-cookie";

const APIManager = Object.create(null, {
    // get an entire collection of items from apps api
    getAllOfCollection: {
        value: function (collection) {
            return fetch(`${url}${collection}`, {
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken"),
                    "Content-Type": "application/json",
                },
            });
        },
    },
    // get a single game from apps api
    getSingleGame: {
        value: function (gameId) {
            return fetch(`${url}games?id=${gameId}`);
        },
    },
    // get all games from the intersection table with user id
    getUsersGames: {
        value: function (user) {
            return fetch(`${url}usersGames?userId=${user}`, {
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken"),
                    "Content-Type": "application/json",
                },
            });
        },
    },
    // search own api for games
    searchGames: {
        value: function (searchString) {
            return fetch(`${url}games?name_like=${encodeURI(searchString)}`);
        },
    },
    // get single user information
    getUser: {
        value: function () {
            return fetch(`${url}user`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        },
    },
    // search users in api
    searchUsers: {
        value: function (userName) {
            return fetch(`${url}user/?gamertag=${userName}`);
        },
    },
    // post information to a collection
    post: {
        value: function (collection, data) {
            return fetch(`${url}${collection}/`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },
            });
        },
    },
    // update information in a certain collection by id
    put: {
        value: function (collection, data, id) {
            return fetch(`${url}${collection}/${id}/`, {
                method: "put",
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken"),
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        },
    },
    // delete information in a collection by id
    delete: {
        value: function (collection, id) {
            return fetch(`${url}${collection}/${id}/`, {
                method: "delete",
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken"),
                    "Content-Type": "application/json",
                },
            });
        },
    },
    // get a game from the giantbomb api
    getGbGame: {
        value: function (giantbombId) {
            return fetch(`${url}giantbomb-proxy/game/${giantbombId}?field_list=name,genres,developers,franchises,image,similar_games,deck,guid,id,platforms,site_detail_url`, {
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken"),
                    "Content-Type": "application/json",
                },
            });
        },
    },
    // search giantbombs database for games
    searchGbGames: {
        value: function (searchString, page) {
            return fetch(`${url}giantbomb-proxy/search?query=${searchString}&resources=game&page=${page}`, {
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken"),
                    "Content-Type": "application/json",
                },
            });
        },
    },
    // get information about a company, specifically developed games
    getGbCompany: {
        value: function (id) {
            return fetch(`${url}giantbomb-proxy/company/${id}?field_list=developed_games`, {
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken"),
                    "Content-Type": "application/json",
                },
            });
        },
    },
});

export default APIManager;
