import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../actions/itemAction'
import PropTypes from 'prop-types'

class ShoppingList extends Component {

    componentDidMount(){
        this.props.getItems()
    }

    onDeleteClick = id => {
        this.props.deleteItem(id)
    }

    render() {
        const { items } = this.props.item;
        return (
            <Container>
                
                <ListGroup>
                    <TransitionGroup className='shoppingList'>
                        { items.map(({_id, name })=>(
                            <CSSTransition key={_id} timeout={5000} classNames="fade">
                                <ListGroupItem>
                                    <Button className='remove-btn' color="danger" size="sm" onClick={this.onDeleteClick.bind(this, _id)}> &times;

                                    </Button>
                                    { name }
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>

            </Container>
        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    items : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
})

// when you bring in an action from redux, it's gonna be stored as props

// we are mapping the redux state to a component property

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList)