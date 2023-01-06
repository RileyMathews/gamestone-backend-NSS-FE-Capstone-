import React, { Component } from 'react'
import { Heading, Button } from 'react-bulma-components'
import { Context } from '../Provider';

class NoGamesDisplay extends Component {


    render() {
        return (
            <Context.Consumer>
                {context => (
                    <div>
                        <Heading>You have no games! click the button below to get started!</Heading>
                        <Button color="primary" onClick={() => context.setView("search")}>Add Games</Button>
                        <Heading isSize={4}>or click below to view more information about using the app</Heading>
                        <Button color="primary" onClick={() => context.setView("instructions")}>Get Started</Button>
                    </div>
                )}
            </Context.Consumer>
        )
    }
}

export default NoGamesDisplay
