import React, { Component } from "react";
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }
    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/current');
        this.setState({
            seenIndexes: values.data
        });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({ index: '' });
    };
    renderSeenIndexs() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        const enteries = [];
        for (let key in this.state.values) {
            enteries.push(
                <div key={key}>
                    for index {key} I Calculated {this.state.values[key]}
                </div>
            );
        }
        return enteries;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter Your Index:</label>
                    <input values={this.state.index}
                        onChange={event => this.setState({ index: event.target.value })}>
                    </input>
                </form>
                <h3>Index I have Seen:</h3>
                {this.renderSeenIndexs()}
                <h3>Calculated Values:</h3>
                {this.renderValues()}
            </div>
        )
    }
}

export default Fib;
