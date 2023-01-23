import React, { Component } from "react";
import { Tag } from "react-bulma-components";

/* 
    module to display a genre passed to it
    author Riley Mathews
*/
class Genre extends Component {
    render() {
        return <Tag>{this.props.genre}</Tag>;
    }
}

export default Genre;
