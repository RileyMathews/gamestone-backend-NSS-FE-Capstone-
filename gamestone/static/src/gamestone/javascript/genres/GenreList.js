import React, { Component } from "react";
import Genre from "./Genre";

/* 
    module to display a list of genres passed to it
    authors Riley Mathews
*/
class GenreList extends Component {
    checkForString = function (genre) {
        if (typeof genre === "string") {
            return <Genre genre={genre} />;
        } else {
            return <Genre genre={genre.name} key={genre.id} />;
        }
    };

    render() {
        return <div>{this.props.genres.map((genre) => this.checkForString(genre))}</div>;
    }
}

export default GenreList;
