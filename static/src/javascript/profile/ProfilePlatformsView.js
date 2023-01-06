/* 
    module: profile platforms view
    purpose: to display an array of platforms passed to it
    authors: Riley Mathews
*/
import React, { Component } from 'react'
import { Heading, Columns, Box } from 'react-bulma-components'
import Platform from './Platform';
import { Context } from '../Provider';
import './ProfilePlatformsView.css'


class ProfilePlatformsView extends Component {


    componentDidMount() {

    }

    render() {
        return (
            <Context.Consumer>
                {context => (
                    <div>
                        <Heading size={4}>Platforms</Heading>
                        <Columns>
                            <Columns.Column size='1/2'>
                                <Box>
                                    <Heading>Owned</Heading>
                                    {context.state.userPlatforms.map(platform => (<div key={platform.id} className="platform__list__item"><Platform key={platform.id} allPlatforms={context.state.allPlatforms} platform={platform} owned={true} removePlatform={context.removePlatform} togglePlatform={context.removePlatform} platformGbId={platform.gbId} /> </div>))}
                                </Box>
                            </Columns.Column>
                            <Columns.Column size='1/2'>
                                <Box>
                                    <Heading>Add</Heading>
                                    {context.state.userUnownedPlatforms.map(platform => (<div key={platform.id} className="platform__list__item"><Platform key={platform.id} allPlatforms={context.state.allPlatforms} platform={platform} owned={false} addPlatform={context.addPlatform} togglePlatform={context.addPlatform} platformGbId={platform.gbId} /> </div>))}
                                </Box>
                            </Columns.Column>
                        </Columns>
                    </div>
                )}
            </Context.Consumer>
        )
    }
}

export default ProfilePlatformsView
