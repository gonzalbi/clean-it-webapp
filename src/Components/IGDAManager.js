import React, { Component } from 'react';
import axios from 'axios';

class IGDAManager extends Component {
    constructor(){
        super();
        this.state = {
            IGDAData : [],
            Loading : "Retrieving data"
        };
    }

    render() {
        return (
            <div>
                <div>
                <h2>IGDA Manager</h2>
                <p>
                    {
                    this.state.IGDAData.map(data => <p>{data.toString()}</p>)
                    }
                </p>
                </div>
            </div>
        );
    }

    componentDidMount(){
        axios.get("/getLocationData").then( (res) => {
            this.setState({
                IGDAData : res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export default IGDAManager;