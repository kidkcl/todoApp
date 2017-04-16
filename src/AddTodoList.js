import React, { Component } from 'react';

class AddTodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { inputText: '' };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOnChange(e) {
        this.setState({ inputText: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefualt();
        this.props.newTodo(this.state.inputText);
        this.setState({ inputText: '' });
        // return false;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name your list"
                        value={this.state.inputText}
                        onChange={this.handleOnChange}
                    />
                    <button>add</button>
                </form>
            </div>
        );
    }
}

export default AddTodoList;