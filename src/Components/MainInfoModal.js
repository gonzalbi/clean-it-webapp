import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

class MainInfoModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            callerId : null,
            showModal : props.show,
            input : "",
            saveFunc : null
        };

    }

    handleChange = (val) => {
        this.setState({ input: val.target.value });
    }

    saveChanges = () => {
        this.props.hideModal()
        this.state.saveFunc({parentId: this.state.callerId,name : this.state.input})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({saveFunc: nextProps.saveFunc,callerId : nextProps.parentId});
    }

    render() {
        return (
        <>
            <Modal show={this.props.show} >
                    <Modal.Header closeButton onClick={this.props.hideModal}>
                    <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <input placeholder={this.props.body} onChange={ this.handleChange } ></input>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.hideModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.saveChanges}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
            </Modal>
        </>
        );
    }
}

export default MainInfoModal;

