import React, { Component } from 'react'
import {Panel, Icon, Button, Form} from 'react-bulma-components'

class GamesFilters extends Component {


    render() {
        return (
            <Panel>
                <Panel.Heading>Games</Panel.Heading>
                <Panel.Block>
                    <Form.Control hasIcons='left'>
                        <Form.Input isSize='small' id="filter__search" placeholder='Search' onChange={this.props.updateSearchString}/>
                        <Icon isSize='small' isAlign='left'>
                            <span className='fa fa-search' aria-hidden='true' />
                        </Icon>
                    </Form.Control>
                </Panel.Block>
                <Panel.Block tag='label'>
                    <Form.Checkbox id="filter__backlog" value="backlog" onChange={this.props.updateFilter} > Backlog</Form.Checkbox>
                </Panel.Block>
                <Panel.Block tag='label'>
                    <Form.Checkbox id="filter__toBePlayed" value="to be played" onChange={this.props.updateFilter} > To Be Played</Form.Checkbox>
                </Panel.Block>
                <Panel.Block tag='label'>
                    <Form.Checkbox id="filter__playing" value="playing" onChange={this.props.updateFilter} > Playing</Form.Checkbox>
                </Panel.Block>
                <Panel.Block tag='label'>
                    <Form.Checkbox id="filter__finished" value="finished" onChange={this.props.updateFilter} > Finished</Form.Checkbox>
                </Panel.Block>
                <Panel.Block tag='label'>
                    <Form.Checkbox id="filter__favorite" value="favorite" onChange={this.props.toggleFavoriteFilter} > Favorite</Form.Checkbox>
                </Panel.Block>
                <Panel.Block>
                    <Button isOutlined isFullWidth isColor='primary' onClick={this.props.clearFilters}> Reset all filters</Button>
                </Panel.Block>
            </Panel>
        )
    }
}

export default GamesFilters
