import React, { Component } from 'react'
import {Tabs, Icon} from 'react-bulma-components'

class ProfileNav extends Component {

    activeTab = function (tabView) {
        return tabView === this.props.currentView
    }.bind(this)

    render() {
        return (
            <Tabs>
                <Tabs.Tab active={this.activeTab("games")} id="profileNav__games" onClick={this.props.setProfileView}>
                    <Icon isSize='small'><span className='fa fa-gamepad' aria-hidden='true' /></Icon>
                    <span>Games</span>
                </Tabs.Tab>
                <Tabs.Tab active={this.activeTab("platforms")} id="profileNav__platforms" onClick={this.props.setProfileView}>
                    <Icon isSize='small'><span className='fa fa-desktop' aria-hidden='true' /></Icon>
                    <span>Platforms</span>
                </Tabs.Tab>
            </Tabs>
        )
    }
}

export default ProfileNav
