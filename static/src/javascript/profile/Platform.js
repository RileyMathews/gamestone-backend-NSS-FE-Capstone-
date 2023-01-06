import React, { Component } from 'react'
import PlatformTag from '../platforms/PlatformTag'
import './Platform.css'

/* 
    module to display information about game platforms based on info passed to it
    authors Riley Mathews
*/
class Platform extends Component {


    render() {
        return (
            <div className="platform clickable" onClick={this.props.togglePlatform} id={"toggle__platform__"+this.props.platform.id}>
                <p><PlatformTag isOwned={this.props.owned} allPlatforms={this.props.allPlatforms} platform={this.props.platform} platformGbId={this.props.platformGbId}/></p>
            </div>
        )   
    }
}

export default Platform
