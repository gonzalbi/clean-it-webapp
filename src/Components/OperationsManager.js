import React, { Component } from 'react';
import Accordion from './Accordion'

class OperationsManager extends Component {
    constructor(props){
        super(props);
        this.state = {
            operations : [],
            active : false,
        };

    }

    componentWillReceiveProps(nextProps) {
        this.setState({operations: nextProps.operations, active : nextProps.active});
    }

    
    render() {
            return (
            <div className={"operations-manager "+(this.state.active ? "show" : "hide")}>
                <div className="operations-manager-content">
                    <span className="close" onClick={this.props.hide}>&times;</span>
                    <h4>Operations Manager - {this.props.title}</h4>
                    <div className="operation-scroll">
                        <div>
                        {this.state.operations.map( item => 
                            <Accordion 
                                key={item.Id}
                                operationId={item.Id}
                                title={item.Name}
                                getItems={() => this.getOperationData(item.Id)}
                            />
                        )}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default OperationsManager;