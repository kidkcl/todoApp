import React, { Component } from 'react';

class AddTodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { inputText: '' };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOnChange(event) {
        this.setState({ inputText: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.newList(this.state.inputText);
        this.setState({ inputText: '' });
        // return false;
    }

    render() {
        return (
            <div>
                <form action="#" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name your list"
                        value={this.state.inputText}
                        onChange={this.handleOnChange}
                    />
                    <button onClick={this.handleSubmit}>add</button>
                </form>
            </div>
        );
    }
}

export default AddTodoList;