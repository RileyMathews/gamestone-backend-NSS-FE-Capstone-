import APIManager from "../api/APIManager";
import ArrayManager from "./ArrayManager";

/* 
    module to handle managing users platforms
    authors Riley Mathews
*/


const PlatformManager = Object.create(null, {
    isPlatformOwned: {
        value: function (platformId) {
            return this.state.userPlatformsIds.includes(platformId)
        }
    },
    // function to add a platform to users owned platforms
    addPlatform: {
        value: function (evt) {
            // get id of event
            const platformId = parseInt(evt.currentTarget.id.split("__")[2], 10)
            // split the item out of unowned platforms
            const splitItem = ArrayManager.removeItemByProperty(this.state.userUnownedPlatforms, "id", platformId)
            // seperate the response as needed
            const newUnownedPlatforms = splitItem.newArray
            const platformToMove = splitItem.item
            // add id to array of ids
            const newPlatformsIds = ArrayManager.addItem(this.state.userPlatformsIds, platformId)
            // add the item to owned games
            const newOwnedPlatforms = ArrayManager.addItem(this.state.userPlatforms, platformToMove)
            // set state
            this.setState({
                userPlatforms: newOwnedPlatforms,
                userUnownedPlatforms: newUnownedPlatforms,
                userPlatformsIds: newPlatformsIds
            })
            APIManager.post("userplatform", { user: parseInt(this.state.activeUser, 10), platform: platformToMove.id })
        }
    },
    // function to remove a platform from users owned platforms
    removePlatform: {
        value: function (evt) {
            // get id of event
            const platformId = parseInt(evt.currentTarget.id.split("__")[2], 10)
            // split the item out of owned platforms
            const splitItem = ArrayManager.removeItemByProperty(this.state.userPlatforms, "id", platformId)
            // seperate response as needed
            const newOwnedPlatforms = splitItem.newArray
            const platformToMove = splitItem.item
            // remove id from owned ids array
            const newPlatformsIds = ArrayManager.removeItem(this.state.userPlatformsIds, platformId)
            // add item to unowned games
            const newUnownedPlatforms = ArrayManager.addItem(this.state.userUnownedPlatforms, platformToMove)
            // set state
            this.setState({
                userPlatforms: newOwnedPlatforms,
                userUnownedPlatforms: newUnownedPlatforms,
                userPlatformsIds: newPlatformsIds
            })
            APIManager.getAllOfCollection('userplatform')
                .then(r => r.json())
                .then(usersplatforms => {
                    const intersectionToDelete = usersplatforms.find(platform => platform.user === parseInt(this.state.activeUser, 10) && platform.platform === platformId)
                    APIManager.delete('userplatform', intersectionToDelete.id)
                })
            // find intersection item to remove
            // APIManager.getUsersPlatforms(this.state.activeUser)
            //     .then(r => r.json())
            //     .then(response => {
            //         const intersectionToRemove = response.find(intersection => intersection.platformId === platformId)
            //         const idToRemove = intersectionToRemove.id
            //         APIManager.delete("usersPlatforms", idToRemove)
            //     })
        }
    }, 
    // function to check and make sure the user has a console
    // the game passed to it is available on
    canUserPlayGame: {
        value: function (game, userPlatformsIds) {
            let platformFound = false
            userPlatformsIds.forEach(id => {
                game.platforms.forEach(gamePlatform => {
                    if (gamePlatform.id === id) {
                        platformFound = true
                    }
                })
            })
            return platformFound
        }
    }
})

export default PlatformManager