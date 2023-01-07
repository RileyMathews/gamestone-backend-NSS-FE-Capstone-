import React, { Component } from 'react'
import { Context } from '../Provider';
import {Icon, Tag} from 'react-bulma-components'


class PlatformTag extends Component {

    tagPlatformCompany = function (context) {
        const platformId = this.props.platformGbId
        const allPlatforms = context.state.allPlatforms
        const platform = allPlatforms.find(platform => platform.gbId === platformId)
        if (platform !== undefined) {
            return platform.company
        } else {
            return "generic"
        }
    }.bind(this)

    render() {
        return (
            <Context.Consumer>
                {
                    context => (
                        <Tag>
                            {this.props.platform.name}
                            {context.isPlatformOwned(this.props.platform.id) || this.props.isOwned === true ?
                                <Icon className="fas fa-check" />
                                :
                                null
                            }
                        </Tag>
                    )
                }
            </Context.Consumer>
        )
    }
}

export default PlatformTag
