import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

class IGDAManager extends Component {
    constructor(){
        super();
        this.state = {
            IGDAData : [],
            Loading : "Retrieving data",
            showModal : false
        };
    }

    componentDidMount = () => {
        axios.get("/getLocationData").then( (res) => {
            this.setState({
                IGDAData : res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleModal = () => {
        this.setState(
            {
                showModal : true
            }
        )
    }

    renderLocation = (locationArray) => {
        return (
            locationArray.map(data => 
                <div 
                  className="location-container" 
                  key={"location-id-"+data.Id}>
                <div 
                  className="location-header" 
                  location-id={data.Id}>
                    <p>{data.Name}</p>
                    <Button className="idga-add-button" variant="success">Add Sector </Button>{' '}
                </div>
                {
                this.renderSector(data.Sectors)
                }
                </div>
            )
        )
    }

    renderSector = (sectorArray) => {
        return (
            sectorArray.map(sector => 
                <div 
                className="sector-container" 
                key={"sector-id-"+sector.Id}>
                <div 
                className="sector-header" 
                sector-id={sector.Id}>
                    <p>{sector.Name}</p>
                    <Button className="idga-add-button" variant="success">Add Subsector </Button>{' '}
                </div>
                {
                    this.renderSubSector(sector.SubSectors)
                }
                </div>
            )
        )
    }

    renderSubSector = (subSectorArray) => {
        return (
            subSectorArray.map(subsector => 
                <div 
                key={subsector.Id} 
                className="subsector-container" 
                subsector-id={subsector.Id}>
                    <p>{subsector.Name}</p>
                    <Button className="idga-edit" variant="primary">Edit Operations </Button>{' '}
                </div>
            )
        )
    }

    render() {
        return (
            <>
                <div>
                <div 
                  className="idga-headear">   
                    <p>IGDA Manager</p>
                    <Button 
                      className="idga-add-button" 
                      variant="success"
                      >
                          Add Location
                    </Button>{' '}
                </div> 
                {
                    this.renderLocation(this.state.IGDAData)
                }
                </div>
            
        </>
        );
    }
}

export default IGDAManager;