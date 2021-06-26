import React, { Component } from 'react';
import Accordion from './Accordion'

class OperationsManager extends Component {
    constructor(props){
        super(props);
        this.state = {
        };

    }

    render() {
        return (
            <div className="operations-manager">
                <div className="operations-manager-content">
                    <span class="close">&times;</span>
                    <h4>Operations Manager - {this.props.title}</h4>
                    <div>
                    <Accordion 
                        title="Operation 1"
                        content="Holis"
                    />
                    </div>
                </div>

            </div>
        );
    }
}

export default OperationsManager;