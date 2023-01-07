import React, { Component } from 'react'
import { Media, Image, Content, Level, Button, Icon, Tag } from 'react-bulma-components';
import { Context } from '../Provider';

/* 
    module to display the results of searching giant bombs api of games *context
    authors Riley Mathews
*/
class Result extends Component {

    isGameOwned = function (context) {
        if (context.state.userGamesIds.includes(this.props.info.id)) {
            return true
        } else {
            return false
        }
    }

    isGameOwnedCheckMark = function (context) {
        if (this.isGameOwned(context)) {
            return <Icon className="fas fa-check-circle" />
        }
    }.bind(this)

    isGameOwnedButton = function (context) {
        if (this.isGameOwned(context)) {
            return <Button color="primary" onClick={() => this.removeGameById(context)}>Remove Game</Button>
        } else {
            return <Button color="primary" onClick={() => this.addGame(context)}>Add Game</Button>
        }
    }.bind(this)



    addGameFavorite = function () {
        this.props.addGameToCollection(this.props.info, true)
    }.bind(this)

    removeGameById = function (context) {
        context.removeGameFromCollection(this.props.info.id)
    }.bind(this)

    addGame = function (context) {
        context.addGameToCollection(this.props.info, false)
    }.bind(this)


    render() {
        return (
            <Context.Consumer>
                {context => (
                    <Media>
                        <Media.Item align='left'>
                            <Image src={this.props.info.image.icon_url} />
                        </Media.Item>
                        <Media.Item align='center'>
                            <Content>
                                <p>
                                    <strong>{this.props.info.name}</strong>
                                    {this.isGameOwnedCheckMark(context)}
                                    <br />
                                    {this.props.info.deck}
                                    <a href={this.props.info.site_detail_url} target="_blank">  learn more</a>
                                </p>
                            </Content>

                            <Level>
                                <Level.Side align='left'>
                                    {this.props.info.platforms !== null ?
                                        <div className="tags">
                                            {this.props.info.platforms.map(platform => <Tag key={platform.id}>{platform.name}</Tag>)}
                                        </div>
                                        :
                                        null
                                    }
                                </Level.Side>
                                <Level.Side align='right'>
                                    <Button.Group>
                                    {this.isGameOwnedButton(context)}
                                    {this.isGameOwned(context) ? null : <Button color="primary" onClick={this.addGameFavorite}>Add Game as Favorite</Button>}
                                    </Button.Group>
                                </Level.Side>
                            </Level>
                        </Media.Item>
                    </Media>
                )}
            </Context.Consumer>
        )
    }
}

export default Result
