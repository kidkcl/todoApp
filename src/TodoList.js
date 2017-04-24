import React, { Component } from 'react';
import TodoItem from './TodoItem';
import '../style/TodoList.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            nameInEdit: false,
            listTitle: this.props.listContent.listName,
            itemIndex: 0,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleCheckItem = this.handleCheckItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleEditListName = this.handleEditListName.bind(this);
        this.handleListNameKeyUp = this.handleListNameKeyUp.bind(this);
        this.handleEditListOnClick = this.handleEditListOnClick.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);
    }
    handleInputChange(e) {
        this.setState({ inputValue: e.target.value });
    }

    handleKeyUp(e) {
        if(e.key === 'Enter') {
            e.preventDefault();
            this.props.addItem(this.props.listContent.listId, this.state.inputValue, this.state.itemIndex)
            this.setState({ itemIndex: this.state.itemIndex+1});
            this.setState({ inputValue: '' });
            console.log("yabbi");
        }
    }
    
    handleCheckItem(itemId, check) {
        this.props.checkItem(this.props.listContent.listId, itemId, check);
    }

    handleDeleteItem(itemId) {
        this.props.deleteItem(this.props.listContent.listId, itemId);
    }
    handleEditListName(e) {
        this.setState({ listTitle: e.target.value });
    }

    handleListNameKeyUp(e) {
        let name = this.state.listTitle;
        if(e.key === 'Enter') {
            e.preventDefault();
            this.props.editTitle(this.props.listContent.listId, name);
            this.setState({ listTitle: this.props.listContent.listName });
            this.setState({ nameInEdit: false });
        }
    }

    handleEditListOnClick() {
        this.setState({ nameInEdit: true });
    }

    handleDeleteList() {
        this.props.deleteList(this.props.listContent.listId);
    }

    render() {
        let title;
        if(this.state.nameInEdit) {
            title = (
                <input
                    type="text"
                    value={this.state.listTitle}
                    onChange={this.handleEditListName}
                    onKeyUp={this.handleListNameKeyUp}
                />
            );
        } else {
            title = (
                <p 
                    title="Click to edit"
                    onClick={this.handleEditListOnClick}
                >{this.state.listTitle}</p>
            );
        }
        return(
            <div className="TodoList">
                <div className="ListHeader">
                    <div className="ListName">
                        {title} 
                        <button type="button" onClick={this.handleEditListOnClick}>edit</button>
                        <button type="button" onClick={this.handleDeleteList}>delete</button>
                    </div>
                    <input
                        type="text"
                        placeholder="Add a new todo"
                        className="AddItemInput" value={this.state.inputValue}
                        onChange={this.handleInputChange} onKeyUp={this.handleKeyUp}
                    />    
                </div> 
                <div className="ListContent">
                    {this.props.listContent.listItems.map(item =>
                    <TodoItem
                        key={item.itemId}
                        itemContent={item} itemCheck={this.handleCheckItem} itemDelete={this.handleDeleteItem}
                    />)}
                </div>
            </div>
        )
    }
}


export default TodoList;