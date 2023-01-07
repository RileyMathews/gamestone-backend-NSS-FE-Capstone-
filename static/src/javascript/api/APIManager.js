/* 
    module to provide functionality for working with api
    Authors: Riley Mathews
*/
import url from './APISettings'
import $ from 'jquery'

const APIManager = Object.create(null, {
    // get an entire collection of items from apps api
    getAllOfCollection: {
        value: function (collection) {
            return fetch(`${url}${collection}`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('user_token')}`, 
                    'Content-Type': 'application/json'
                }
            })
        }
    },
    // get a single game from apps api
    getSingleGame: {
        value: function (gameId) {
            return fetch(`${url}games?id=${gameId}`)
        }
    },
    // get all games from the intersection table with user id
    getUsersGames: {
        value: function (user) {
            return fetch(`${url}usersGames?userId=${user}`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('user_token')}`, 
                    'Content-Type': 'application/json'
                }
            })
        }
    },
    // get all platforms from one user and expand platform information
    getUsersPlatforms: {
        value: function (user) {
            return fetch(`${url}usersPlatforms?userId=${user}&_expand=platform`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('user_token')}`, 
                    'Content-Type': 'application/json'
                }
            })
        }
    },
    // search own api for games
    searchGames: {
        value: function (searchString) {
            return fetch(`${url}games?name_like=${encodeURI(searchString)}`)
        }
    },
    // get single user information
    getUser: {
        value: function () {
            return fetch (`${url}user`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('user_token')}`, 
                    'Content-Type': 'application/json'
                }
            })
        }
    },
    // register new user
    registerUser: {
        value: function (data) {
            return fetch (`${url}user-auth/registration/`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    },
    // login user
    loginUser: {
        value: function (data) {
            return fetch(`${url}user-auth/login/`, {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }) 
        }
    },
    logoutUser: {
        value: function() {
            return fetch(`${url}user-auth/logout/`, {
                method: 'post',
                body: JSON.stringify({}),
                headers: {
                    'Authorization': `Token ${localStorage.getItem('user_token')}`,
                    'Content-Type': 'application/json'
                }
            })
        }
    },
    // search users in api
    searchUsers: {
        value: function (userName) {
            return fetch(`${url}user/?gamertag=${userName}`)
        }
    },
    // post information to a collection
    post: {
        value: function (collection, data) {
            return fetch(`${url}${collection}/`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('user_token')}`
                }
            })
        }
    },
    // update information in a certain collection by id
    put: {
        value: function (collection, data, id) {
            return fetch(`${url}${collection}/${id}/`, {
                method: "put",
                headers: {
                    'Authorization': `Token ${localStorage.getItem('user_token')}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        }
    },
    // delete information in a collection by id
    delete: {
        value: function (collection, id) {
            return fetch(`${url}${collection}/${id}/`, {
                method: 'delete',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('user_token')}`,
                    "Content-Type": "application/json"
                }
            })
        }
    },
    // get a game from the giantbomb api
    getGbGame: {
        value: function (gbId) {
            return $.ajax({
                type: "GET",
                dataType: "jsonp",
                crossDomain: true,
                jsonp: "json_callback",
                url: `http://www.giantbomb.com/api/game/3030-${gbId}/?api_key=817e4ec0b4026b38424f3c98970b14d273226692&format=jsonp&field_list=name,genres,developers,franchises,image,similar_games,deck,guid,id,platforms,site_detail_url`
            })
        }
    },
    // search giantbombs database for games
    searchGbGames: {
        value: function (searchString, page) {
            return $.ajax({
                type: "GET",
                dataType: "jsonp",
                crossDomain: true,
                jsonp: "json_callback",
                url: `http://www.giantbomb.com/api/search?api_key=817e4ec0b4026b38424f3c98970b14d273226692&format=jsonp&query=${searchString}&resources=game&page=${page}`
            })
        }
    },
    // get information about a company, specifically developed games
    getGbCompany: {
        value: function (id) {
            return $.ajax({
                type: "GET",
                dataType: "jsonp",
                crossDomain: true,
                jsonp: "json_callback",
                url: `https://www.giantbomb.com/api/company/3010-${id}/?api_key=817e4ec0b4026b38424f3c98970b14d273226692&format=jsonp&field_list=developed_games`
            })
        }
    }
})

export default APIManager


/* 

    Giantbomb api search string templates
    http://www.giantbomb.com/api/game/3030-39775/?api_key=817e4ec0b4026b38424f3c98970b14d273226692&format=json&field_list=name,genres,developers,franchises,image,similar_games,deck,guid,id,platforms

    search
    http://www.giantbomb.com/api/search?api_key=817e4ec0b4026b38424f3c98970b14d273226692&query=mario&resources=game

*/
