## calls made from react app

list of all api calls made from the react app to determine which ones will need to be refactored and how the new django api can be made to conform to what the front end is doing unless changes to how django handles data vs json-server requires front end refactoring.

## user manager
### get user information (refactoring maybe required)
this function first makes calls to get user information. it needs
1. userid
1. user first name
1. user last name
1. user gamertag

It then needs an array of gamestones user games stats with each object having
1. isFavorite
1. progress


## platform manager
### get platforms (refactoring maybe required)
this function first gets all platforms from the gamestone api

then sends a call to only get platforms the current user owns


### add platform (refactoring required)
this function takes in the event handler for adding a platform and gets the gbId of the platform
it runs some local logic to set platforms in state and then posts the relationship to the jsonserver intersection table. this will need a lot of refactoring to make it work well with the django server

### remove platform (refactoring required)
same as above function but removes relationship instead of adding it

## game manager
### change game progress (refactoring unlikely)
function takes in a games gbId and posts changes to the progress to the relationship table

### add game to collection (refactoring unlikely)
this function takes in a games gbId and posts it to the relationship table

### remove game from collection (refactoring unlikely)
same as above but removes

### toggle game favorite (refactoring unlikely)
function changes favorite status of a game and posts change to api

## login view
### login (refactoring not required, but nessesary if switching to django auth)
function gets all users, finds the one to login, and then calls get user information functions

### register (refactoring unlikely)
function takes in user info and posts a new user to api
