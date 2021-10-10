import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import MainInfoModal from './MainInfoModal';
import OperationsManager from './OperationsManager'


class IGDAManager extends Component {
    constructor(){
        super();
        this.state = {
            IGDAData : [],
            showModal : false,
            modalData : {
                parentId : null,
                title : "",
                body : "",
                saveFunc : null
            },
            operationData : [],
            showOperation : false
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

    openModal = (title,body,saveFunc,parentId = null) => {
    
        this.setState({ 
            modalData : {title : title,body : body, saveFunc : saveFunc,parentId : parentId},
            showModal: true 
        });
    }
    
    hideModal= () => this.setState({ showModal: false });
    hideOperation= () => this.setState({ showOperation: false });

    addLocation = (data) => {
        axios.post("/addLocation",data).then( (res) => {
            console.log("success")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    addSector = (data) => {

        axios.post("/addSector",data).then( (res) => {
            console.log("success")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    addSubsector = (data) => {

        axios.post("/addSubsector",data).then( (res) => {
            console.log("success")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getOperations= (id,name) => {
        axios.get('/getOperations/'+id).then( (res) => {
            this.setState({
                modalData : {title : name},
                operationData : res.data,
                showOperation : true
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <>
                
                <MainInfoModal 
                    parentId={this.state.modalData.parentId}
                    show={this.state.showModal}
                    hideModal={this.hideModal}
                    title={this.state.modalData.title}
                    body={this.state.modalData.body}
                    saveFunc={this.state.modalData.saveFunc}
                />

                <OperationsManager 
                    title = {this.state.modalData.title}
                    operations={this.state.operationData}
                    active={this.state.showOperation}
                    hide={this.hideOperation}
                />

                <div>
                <div 
                  className="idga-headear">   
                    <p>IGDA Manager</p>
                    <Button 
                      className="idga-add-button" 
                      variant="success"
                      onClick={() => this.openModal("Add New Location","Add new location to client",this.addLocation)} >
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


    //RENDER FUNCTIONS
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
                    <Button 
                        className="idga-add-button" 
                        variant="success"
                        onClick={() => this.openModal("Add New Sector","Add new sector to location",this.addSector,data.Id)} >
                        Add Sector 
                    </Button>{' '}
                </div>
                {
                 data.Sectors != null ? this.renderSector(data.Sectors,data.id) : null
                }
                </div>
            )
        )
    }

    renderSector = (sectorArray,locationId) => {
        return (
            sectorArray.map(sector => 
                <div 
                className="sector-container" 
                key={"sector-id-"+sector.Id}>
                <div 
                className="sector-header" 
                sector-id={sector.Id}
                location-id={locationId}>
                    <p>{sector.Name}</p>
                    <Button 
                        className="idga-add-button" 
                        variant="success"
                        onClick={() => this.openModal("Add New Subsector","Add new sub sector to Sector",this.addSubsector,sector.Id)} 
                        >                    
                            Add Subsector 
                    </Button>{' '}
                </div>
                {
                    sector.SubSectors != null ? this.renderSubSector(sector.SubSectors,sector.Id) : null
                }
                </div>
            )
        )
    }

    renderSubSector = (subSectorArray,sectorId) => {
        if(subSectorArray) 
        return (
            subSectorArray.map(subsector => 
                <div 
                key={subsector.Id} 
                className="subsector-container" 
                subsector-id={subsector.Id}
                sector-id={sectorId}>
                    <p>{subsector.Name}</p>
                    <Button 
                        className="idga-edit" 
                        variant="primary"
                        onClick={() => this.getOperations(subsector.Id,subsector.Name)}
                        >
                            Manage Operations 
                    </Button>{' '}
                </div>
            )
        )
    }
}

export default IGDAManager;