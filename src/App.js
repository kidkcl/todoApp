import React, { Component } from 'react';
import AddTodoList from './AddTodoList';
import TodoItem from './TodoItem';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTodoLists: [],
      done: 0,
      undone: 0,
    };
    this.addAList = this.addAList.bind(this);
  }

  addAList(text) {
    const newList = {
      listName: text,
      listContent: [],
    };
    const newTodoLists = this.state.allTodoLists;
    newTodoLists.push(newList);
    console.log("there there: ");
    console.log(newTodoLists.length);
    this.setState({ allTodoLists: newTodoLists });
  }

  render() {
    console.log(this.state.allTodoLists.length);
    return (
      <div className="App">
        <div className="App-header">
          <h1>我是一ㄍ todo list</h1>
          <h2>Done:{this.state.done} Undone:{this.state.undone} </h2>
          <AddTodoList newList={this.addAList}/>
        </div>
        <div className="App-content">
          <h3>這裡render todolist</h3>
          <TodoItem />
        </div>
      </div>
    );
  }
}

export default App;
