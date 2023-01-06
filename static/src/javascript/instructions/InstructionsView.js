import React, { Component } from 'react'
import { Heading, Container, Image } from 'react-bulma-components'
import './InstructionsView.css'


class InstructionsView extends Component {


    render() {
        return (
            <Container>
                <div id="instructions">
                    <Heading>Getting Started</Heading>
                    <p>
                        Welcome to game finder, the app that lets you track your games, and helps you discover new ones. Read on to learn how to get started.
                    </p>
                    <Heading isSize={4}>Adding Games</Heading>
                    <p>
                        To add a new game, start by clicking on 'add games' at the top of the page.
                    </p>
                    <div className="info">
                        <Image src='./static/images/instructions-navbar-addgame.png' />
                    </div>
                    <p>
                        This will take you to a search bar. Type in the name of a game you have played, and click search.
                    </p>
                    <div className="info">
                        <Image src='./static/images/instructions-addgame-search.png' />
                    </div>
                    <p>
                        A list of games matching your search should populate on the page. Find the game matching the one you want to add and click either the 'add game' button, or the 'add game as favorite' button if you want the game to be saved as a favorite.
                    </p>
                    <div className="info">
                        <Image src='./static/images/instructions-addgames-buttons.png' />
                    </div>
                    <p>
                        Any games you already have that show up in this search should have a remove game button in case you want to remove it from your collection.
                    </p>
                    <div className="info">
                        <Image src='./static/images/instructions-addgames-remove.png' />
                    </div>
                    <Heading isSize={4}>Your profile page</Heading>
                    <p>
                        To manage your game library, click on 'my profile' at the top of the page. This should take you to a list of games currently in your collection.
                    </p>
                    <div className="info">
                        <Image src='./static/images/instructions-navbar-myprofile.png' />
                    </div>
                    <p>
                        The star icon next to a game's title indicates whether or not it has been tagged as a favorite. If the star is hollow, the game is not currently a favorite. click the star to fill it in. The game should now be marked as a favorite.
                    </p>
                    <div className="info">
                        <Image src='./static/images/instructions-profile-favorite.png' />
                    </div>
                    <p>
                        The pencil icon next to the star will allow you to to change the status of a game, which is normally found next to the icon. If you would like to change the game’s status, click the pencil icon and a drop down menu should appear. Select the appropriate option from the menu.
                    </p>
                    <div className="info">
                        <Image src='./static/images/instructions-profile-status.png' />
                    </div>
                    <p>
                        If you want to remove a game from your collection, click on the “X” in the top right hand corner of a game’s listing.
                    </p>
                    <div className="info">
                        <Image src='./static/images/instructions-profile-remove.png' />
                    </div>
                    <Heading isSize={4}>Managing your platforms</Heading>
                    <p>
                        From your profile page, click on the button at the top marked “platforms,” This should take you to a new page where you can manage your platforms.
                    </p>
                    <div className="info">
                        <Image src='./static/images/instructions-profile-gotoplatforms.png' />
                    </div>
                    <p>
                        To add and remove platforms from your profile, click on the “plus” sign next to a platform you don’t already own to add a new one. Or, to remove a platform, click on the “minus” sign.
                    </p>
                    <div className="info">
                        <Image src='./static/images/instructions-profile-platforms.png' />
                    </div>
                    <Heading isSize={4}>Discovering new games</Heading>
                    <p>
                        To find new games related to ones you already own, start by clicking “suggest games” at the top of the page.
                    </p>
                    <div className="info">
                        <Image src='./static/images/instructions-navbar-suggestgame.png' />
                    </div>
                    <p>
                        To filter the games we suggest to you, click on the check boxes in the left hand column. Please note, Due to the fact we do not have direct control over the database we are using, we are trying to not demand too much data from them at once. If you check too many filters we may not immediately find a game matching games you have. Try again after a few seconds, and please don't spam click the buttons here.
                    </p>
                    <div className="info">
                        <Image src='./static/images/instructions-suggestgame.png' />
                    </div>
                    <p>
                        To find games that other gamers have marked similar to games in your library, click the button marked 'by similar games,' or if you would like to discover games made by the same people as other games you own, click 'by developer.'
                    </p>
                    <div className="info">
                        <Image src='./static/images/instructions-suggestgame-buttons.png' />
                    </div>
                </div>
            </Container>
        )
    }
}

export default InstructionsView
