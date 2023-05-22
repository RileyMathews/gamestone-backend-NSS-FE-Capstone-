import React, { Component } from "react";
import { Media, Image, Content, Level, Button, Icon, Tag } from "react-bulma-components";

/* 
    module to display the results of searching giant bombs api of games *context
    authors Riley Mathews
*/
class Result extends Component {
    isGameOwned = function () {
        if (this.props.userGames.map((game) => game.giantbomb_game).includes(this.props.info.id)) {
            return true;
        } else {
            return false;
        }
    };

    isGameOwnedCheckMark = function () {
        if (this.isGameOwned()) {
            return <Icon className="fas fa-check-circle" />;
        }
    }.bind(this);

    isGameOwnedButton = function () {
        if (this.isGameOwned()) {
            return (
                <Button color="primary" onClick={() => this.removeGameById()}>
                    Remove Game
                </Button>
            );
        } else {
            return (
                <Button color="primary" onClick={() => this.addGame()}>
                    Add Game
                </Button>
            );
        }
    }.bind(this);

    addGameFavorite = function () {
        this.props.addGameToCollection(this.props.info, true);
    }.bind(this);

    removeGameById = function () {
        this.props.removeGameFromCollection(this.props.info.id);
    }.bind(this);

    addGame = function () {
        this.props.addGameToCollection(this.props.info, false);
    }.bind(this);

    render() {
        return (
            <Media>
                <Media.Item align="left">
                    <Image src={this.props.info.image.icon_url} />
                </Media.Item>
                <Media.Item align="center">
                    <Content>
                        <p>
                            <strong>{this.props.info.name}</strong>
                            {this.isGameOwnedCheckMark()}
                            <br />
                            {this.props.info.deck}
                            <a href={this.props.info.site_detail_url} target="_blank" rel="noreferrer">
                                {" "}
                                learn more
                            </a>
                        </p>
                    </Content>

                    <Level>
                        <Level.Side align="left">
                            {this.props.info.platforms !== null ? (
                                <div className="tags">
                                    {this.props.info.platforms.map((platform) => (
                                        <Tag key={platform.id}>{platform.name}</Tag>
                                    ))}
                                </div>
                            ) : null}
                        </Level.Side>
                        <Level.Side align="right">
                            {this.props.addGameToCollection ? (
                                <Button.Group>
                                    {this.isGameOwnedButton()}
                                    {this.isGameOwned() ? null : (
                                        <Button color="primary" onClick={this.addGameFavorite}>
                                            Add Game as Favorite
                                        </Button>
                                    )}
                                </Button.Group>
                            ) : null}
                        </Level.Side>
                    </Level>
                </Media.Item>
            </Media>
        );
    }
}

export default Result;
