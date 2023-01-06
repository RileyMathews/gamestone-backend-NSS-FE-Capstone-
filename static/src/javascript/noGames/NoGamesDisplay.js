import React, { Component } from 'react'
import { Heading, Button } from 'react-bulma-components'
import { Context } from '../Provider';

class NoGamesDisplay extends Component {


    render() {
        return (
            <Context.Consumer>
                {context => (
                    <div>
                        <Heading.Title>You have no games! click the button below to get started!</Heading.Title>
                        <Button isColor="primary" onClick={() => context.setView("search")}>Add Games</Button>
                        <Heading.Title isSize={4}>or click below to view more information about using the app</Heading.Title>
                        <Button isColor="primary" onClick={() => context.setView("instructions")}>Get Started</Button>
                    </div>
                )}
            </Context.Consumer>
        )
    }
}

export default NoGamesDisplay
