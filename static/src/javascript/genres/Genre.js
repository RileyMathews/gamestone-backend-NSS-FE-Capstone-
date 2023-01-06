import React, { Component } from 'react'
import './Genre.css'

/* 
    module to display a genre passed to it
    author Riley Mathews
*/
class Genre extends Component {


    render() {
        return (
            <p className="genre">{this.props.genre}</p>
        )
    }
}

export default Genre
