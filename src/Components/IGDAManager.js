import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

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
                {
                    this.state.IGDAData.map(data => 
                        <div class="location-container">
                        <div class="location-text" id={"location-id-"+data.Id} location-id={data.Id}>Locacion: {data.Name}</div>
                        {data.Sectors.map(sector => 
                            <div class="sector-container">
                            <div class="sector-text" id={"sector-id-"+sector.Id} sector-id={sector.Id}>Sector : {sector.Name}</div>
                            {
                                sector.SubSectors.map(subsector => 
                                    <div class="subsector-text" id={"subsector-id-"+subsector.Id} subsector-id={subsector.Id}>SubSector: {subsector.Name}</div>
                                )
                            }
                            </div>
                        )}
                        <div>
                            <Button variant="primary">Edit</Button>{' '}
                            <Button variant="danger">Delete</Button>{' '}
                        </div>
                        </div>
                    )
                }
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