import React, { Component } from "react";
import { Heading, Button } from "react-bulma-components";
import { Context } from "../Provider";

class NoGamesDisplay extends Component {
  render() {
    return (
      <div>
        <Heading>
          You have no games! click 'Add Games' above to get started!
        </Heading>
      </div>
    );
  }
}

export default NoGamesDisplay;
