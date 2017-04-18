import React, { Component } from 'react';
import AddTodoList from './AddTodoList';
import TodoList from './TodoList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTodoLists: [],
      index: 0,
      done: 0,
      undone: 0,
    };
    this.handleAddList = this.handleAddList.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.checkItemInApp = this.checkItemInApp.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleEditListName = this.handleEditListName.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
    this.countDisplay = this.countDisplay.bind(this);
    this.findListId = this.findListId.bind(this);
  }

  findListId(findId, isList, fixId = 0) {
    const todolist = this.state.allTodoLists;
    if(isList) {
      for(let i = 0; i < todolist.length; i++) {
        if(todolist[i].listId === findId) {
          return i;
        }
      }
      return -1;
    } else {
      for(let j = 0; j < todolist[fixId].listItems.length; j++) {
        if(todolist[fixId].listItems[j].itemId === findId) {
          return j;
        }
      }
      return -1;
    }
  }

  countDisplay() {
    const todolist = this.state.allTodoLists;
    let not = 0;
    let yes = 0;
    for(let i = 0; i < todolist.length; i++) {
      for(let j = 0; j < todolist[i].listItems.length; j++) {
        let item = todolist[i].listItems[j];
        if(item.checked === false) {
          not += 1;
        }
        else {
          yes += 1;
        }
      }
    }
    console.log('notcmp: '+not);
    this.setState({ undone: not, done: yes });
  }

  handleAddItem(listId, text, id) {
    const newItem = {
      itemText: text,
      checked: false,
      itemId: id,
    };
    const todolist = this.state.allTodoLists;
    const idx = this.findListId(listId, true);
    //console.log('listId = ' + listId);
    //console.log('is it find? ' + idx);
    todolist[idx].listItems.push(newItem);
    this.setState({ allTodoLists: todolist });
    this.countDisplay();
  }

  checkItemInApp(listId, itemId, check) {
    const todolist = this.state.allTodoLists;
    const id = this.findListId(listId, true);
    const iid = this.findListId(itemId, false, id);
    //console.log('my iid is: ' + iid);
    //console.log(todolist[id].listItems[iid].itemText);
    //console.log('check is: '+check);
    todolist[id].listItems[iid].checked = check;
    //console.log("ischecked: " +todolist[id].listItems[iid].checked);
    this.setState({ allTodoLists: todolist });
    this.countDisplay();
  }

  handleDeleteItem(listId, itemId) {
    const todolist = this.state.allTodoLists;
    const id = this.findListId(listId, true);
    const iid = this.findListId(itemId, false, id);
    console.log('my iid is: ' + iid);
    todolist[id].listItems.splice(iid, 1);
    this.setState({ allTodoLists: todolist });
    this.countDisplay();
  }

  handleAddList(text) {
    let id = this.state.index;
    const newList = {
      listId: id,
      listName: text,
      listItems: [],
    };
    this.setState({ index: id + 1 });
    const newTodoLists = this.state.allTodoLists;
    newTodoLists.push(newList);
    console.log("there there: " + newList.listName);
    console.log(newTodoLists.length);
    this.setState({ allTodoLists: newTodoLists });
  }

  handleEditListName(id, name) {
    const todolist = this.state.allTodoLists;
    for(let i = 0; i < todolist.length; i++) {
      if(todolist[i].listId === id) {
        todolist[i].listName = name;
      }
    }
    this.setState({ allTodoLists: todolist });
  }

  handleDeleteList(id) {
    const todolist = this.state.allTodoLists;
    for(let i = 0; i < todolist.length; i++) {
      if (todolist[i].listId === id) {
        todolist.splice(i, 1);
      }
    }
    this.setState({ allTodoLists: todolist });
    this.countDisplay();
  }

  render() {
    console.log(this.state.allTodoLists.length);
    return (
      <div className="App">
        <div className="App-header">
          <h1>我是一ㄍ todo list</h1>
          <h2>Done:{this.state.done} Undone:{this.state.undone} </h2>
          <AddTodoList newList={this.handleAddList}/>
        </div>
        <div className="App-content">
          <h3>這裡render todolist</h3>
          {this.state.allTodoLists.map(todolist =>
            <TodoList
              key={todolist.listId} checkItem={this.checkItemInApp}
              addItem={this.handleAddItem} deleteItem={this.handleDeleteItem}
              editTitle={this.handleEditListName} deleteList={this.handleDeleteList}
              listContent={todolist}
              />)}
        </div>
      </div>
    );
  }
}

export default App;
