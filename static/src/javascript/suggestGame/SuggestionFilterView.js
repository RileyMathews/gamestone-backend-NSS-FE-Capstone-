import React, { Component } from 'react'
import { Panel, Button, Form } from 'react-bulma-components'

class SuggestionFilterView extends Component {


    render() {
        return (
            <Panel>
                <Panel.Header>Filters</Panel.Header>

                <Panel.Block tag='label'>
                    <Form.Checkbox onChange={this.props.setFilters} id="favoriteFilter"> Favorites</Form.Checkbox>
                </Panel.Block>
                <Panel.Block tag='label'>
                    <Form.Checkbox onChange={this.props.setFilters} id="consoleFilter"> Platforms</Form.Checkbox>
                </Panel.Block>
                <Panel.Block>
                    <Button outlined isFullWidth onClick={this.props.clearFilters} color='primary'> Reset all filters</Button>
                </Panel.Block>
                <Panel.Block>
                    <p><small>note, depending on the games and platforms you own, checking too many filters may make finding games more difficult. If no game is found, try again after a second. The search is sometimes stopped before finding a game that meets all criteria to lessen the load on the database.</small></p>
                </Panel.Block>
            </Panel>
        )
    }
}

export default SuggestionFilterView
