import React, { Component } from 'react';
import '../style/TodoItem.css';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = { status: 'undone' }

        this.handleCheckItem = this.handleCheckItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    handleCheckItem() {
        this.props.itemCheck(this.props.itemContent.itemId, !this.props.itemContent.checked); // FIX ME
    }

    handleDeleteItem() {
        this.props.itemDelete(this.props.itemContent.itemId);
    }

    render() {
        return (
            <div className="TodoItem">
                <input type="checkbox" checked={this.props.itemContent.checked} onChange={this.handleCheckItem}/>
                <label className="CheckButton" onClick={this.handleCheckItem}>{this.props.itemContent.itemText}</label>
                <button className="DeleteButton" onClick={this.handleDeleteItem}>del</button>
            </div>
        );
    }
}

export default TodoItem;