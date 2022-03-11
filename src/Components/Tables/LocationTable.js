import React,{useState,useEffect} from 'react';
import CustomTable from './CustomTable';
import axios from 'axios'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Tooltip,IconButton } from '@mui/material';

function LocationTable(props) {

    const [locationData,setLocation] = useState([])

    const generateActionCell = (cellName,tooltip) => {
        return (
            <div className={"actionCell"}>
            <div className={"actionCellTitle"}>
            {cellName}
            </div>
            <div className={"actionCellButton"}>
                <Tooltip title={tooltip}>
                    <IconButton color="secondary" onClick={props.openDrawer}>
                        <AddCircleOutlineRoundedIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
        )
    }


    useEffect(() => {
        axios.get("/idga/getLocationData")
        .then( (res) => {
            setLocation(res.data)
        })
        .catch((err) => {
            setLocation([])
            console.log(err)
        })
    }, [])

    const columns = [
        {
            name : "name",
            label : "Locacion",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    generateActionCell(value,"Agregar Sector")
                  );
                }
              }  
        },
        {
            name : "Sectors",
            label : "Sector",
            options: {
                customBodyRender: (sectors, tableMeta, updateValue) => {
                    return sectors ? 
                        sectors.map(sector => { return sector.Subsectors.length > 0 ?
                            sector.Subsectors.map(subsector => 
                            generateActionCell(sector.name,"Agregar Subsector"))  :
                            generateActionCell(sector.name,"Agregar Subsector")
                        }) : 
                        <div>--sin sector--</div>;
                }
            }
        },
        {
            name : "Sectors",
            label : "Subsectors",
            options: {
                customBodyRender: (sectors, tableMeta, updateValue) => {
                    return sectors ? 
                        sectors.map(sector => { return sector.Subsectors.length > 0 ?
                            sector.Subsectors.map(subsector => generateActionCell(subsector.name,"Agregar Operaciones"))  :
                            <div>A</div>
                        }) : 
                        <div>--sin subsector--</div>;
                }
            }
        },
        /*{
            name: "Actions",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <Button variant="outlined" color="secondary">
                    {`Review`}
                  </Button>
                );
              }
            }  
        },*/
    ];

  return (
        <CustomTable 
            title={"Locaciones"}
            columns={columns}
            data={locationData}
        />
  );

}

export default LocationTable;