import React, { Component } from "react";
import { Panel, Icon, Button, Form, Heading } from "react-bulma-components";

class GamesFilters extends Component {
    render() {
        return (
            <Panel>
                <Heading>Games</Heading>
                <Panel.Block>
                    <Form.Control>
                        <Form.Input size="small" id="filter__search" placeholder="Search" onChange={this.props.updateSearchString} />
                        <Icon size="small" align="left">
                            <span className="fa fa-search" aria-hidden="true" />
                        </Icon>
                    </Form.Control>
                </Panel.Block>
                <Panel.Block tag="label">
                    <Form.Checkbox id="filter__favorite" value="favorite" onChange={this.props.toggleFavoriteFilter}>
                        {" "}
                        Favorite
                    </Form.Checkbox>
                </Panel.Block>
                <Panel.Block>
                    <Button outlined fullwidth color="primary" onClick={this.props.clearFilters}>
                        {" "}
                        Reset all filters
                    </Button>
                </Panel.Block>
            </Panel>
        );
    }
}

export default GamesFilters;
