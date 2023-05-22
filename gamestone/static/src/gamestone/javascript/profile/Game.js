import React, { Component } from "react";
import { Media, Image, Content, Button, Icon } from "react-bulma-components";
import GenreList from "../genres/GenreList";

/* 
    module to display information about a game passed to it
    authors Riley Mathews
*/

class Game extends Component {
    state = {
        userGameId: "",
        isFavorited: false,
        isEditing: false,
    };

    getGameUserId = function () {
        const thisGamesStats = this.props.userGames.find((game) => game.giantbomb_game === this.props.game.id);
        if (thisGamesStats !== undefined) {
            return thisGamesStats.id;
        }
    }.bind(this);

    getGameFavorited = function () {
        const thisGamesStats = this.props.userGames.find((game) => game.giantbomb_game === this.props.game.id);
        if (thisGamesStats !== undefined) {
            return thisGamesStats.isFavorited;
        }
    };

    removeGameById = function () {
        this.props.removeGameFromCollection(this.props.game.id);
    }.bind(this);

    render() {
        return (
            <Media>
                <Media.Item align="left">
                    <Image src={this.props.game.image.icon_url} />
                </Media.Item>
                <Media.Item align="center">
                    <Content>
                        <span>
                            <strong>{this.props.game.name}</strong>
                            {this.getGameFavorited() ? (
                                <Icon className="fas fa-star" id={"game__toggle__favorite__" + this.getGameUserId()} onClick={() => this.props.toggleGameFavorite(this.props.game.id)} />
                            ) : (
                                <Icon className="far fa-star clickable" id={"game__toggle__favorite__" + this.getGameUserId()} onClick={() => this.props.toggleGameFavorite(this.props.game.id)} />
                            )}
                        </span>
                        <p>{this.props.game.deck}</p>
                    </Content>
                    {this.props.game.genres ? <GenreList genres={this.props.game.genres} /> : <span></span>}
                </Media.Item>
                <Media.Item align="right">
                    <Button remove onClick={this.removeGameById} />
                </Media.Item>
            </Media>
        );
    }
}

export default Game;
