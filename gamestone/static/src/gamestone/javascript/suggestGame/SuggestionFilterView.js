import React, { Component } from "react";
import { Panel, Button, Form } from "react-bulma-components";

class SuggestionFilterView extends Component {
    render() {
        return (
            <Panel>
                <Panel.Header>Filters</Panel.Header>

                <Panel.Block tag="label">
                    <Form.Checkbox onChange={this.props.setFilters} id="favoriteFilter">
                        {" "}
                        Favorites
                    </Form.Checkbox>
                </Panel.Block>
                <Panel.Block>
                    <Button outlined onClick={this.props.clearFilters} color="primary">
                        {" "}
                        Reset all filters
                    </Button>
                </Panel.Block>
                <Panel.Block>
                    <p>
                        <small>Using too many filters or having not enough games may prevent us from being able to find suggestions.</small>
                    </p>
                </Panel.Block>
            </Panel>
        );
    }
}

export default SuggestionFilterView;
