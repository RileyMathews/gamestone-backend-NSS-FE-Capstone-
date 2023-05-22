/* 
    module to hold methods for pulling and adding information from arrays
    authors Riley Mathews
*/

const ArrayManager = Object.create(null, {
    // method to take in an array of items and return a random one
    getRandomItem: {
        value: function (array) {
            // get length of the array
            const arrayLength = array.length;
            // make random number from array length
            const randomNumber = Math.floor(Math.random() * arrayLength);
            // return the item at that index
            return array[randomNumber];
        },
    },
    // method that takes an array of gb api games, and a list of ids the users owns, and will return
    // either a random unowned game, or false if they own all the games
    getRandomUnownedGame: {
        value: function (games, userGamesIds) {
            if (games !== null) {
                const gamesForFunction = games.map((game) => Object.assign({}, game));
                while (gamesForFunction.length >= 0) {
                    const randomIndex = Math.floor(Math.random() * gamesForFunction.length);
                    const selectedGame = gamesForFunction.splice(randomIndex, 1);
                    if (!userGamesIds.includes(selectedGame[0].id)) {
                        return selectedGame[0];
                    }
                    if (gamesForFunction.length === 0) {
                        return false;
                    }
                }
            } else {
                return false;
            }
        },
    },
    // takes in the intersection table of games from apps api
    // and returns a the first random game it finds that is
    // listed as a favorite, or false if none are found
    getRandomFavoriteGame: {
        value: function (usersGames) {
            const array = usersGames.map((game) => Object.assign({}, game));
            while (array.length >= 0) {
                const randomIndex = Math.floor(Math.random() * array.length);
                const selectedGame = array.splice(randomIndex, 1)[0];
                if (selectedGame.isFavorited === true) {
                    return selectedGame;
                }
                if (array.length === 0) {
                    return false;
                }
            }
        },
    },
    /* 
        takes in an array of objects and a key:value pair
        will find the object that has that key value pair
        and return the array with the item removed
    */
    removeItemByProperty: {
        value: function (array, property, propertyValue) {
            const index = array.findIndex((item) => item[property] === propertyValue);
            const removedItem = array.splice(index, 1);
            return { newArray: array, item: removedItem[0] };
        },
    },
    // takes an array, and an item to be added to that array
    addItem: {
        value: function (array, item) {
            array.push(item);
            return array;
        },
    },
    // takes an array and an item to be removed, and returns the array without that item
    removeItem: {
        value: function (array, item) {
            const newArray = Object.assign([], array);
            const index = newArray.findIndex((itemInArray) => itemInArray === item);
            newArray.splice(index, 1);
            return newArray;
        },
    },
    // finds a random user game based on favorites filter
    // and returns a valid game object with gb's data
    getRandomUserGame: {
        value: function (games, gamesStats, filters) {
            let selectedGame;
            if (filters.favorite) {
                const gameStats = this.getRandomFavoriteGame(gamesStats);
                selectedGame = games.find((game) => game.id === gameStats.giantbomb_game);
            } else {
                selectedGame = this.getRandomItem(games);
            }
            return selectedGame;
        },
    },
});

export default ArrayManager;
