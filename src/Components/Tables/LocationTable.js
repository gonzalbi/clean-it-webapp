import React,{useState,useEffect} from 'react';
import CustomTable from './CustomTable';
import axios from 'axios'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Tooltip,IconButton } from '@mui/material';

function LocationTable(props) {

    const [locationData,setLocation] = useState([])
    
    const generateActionCell = (cellName,id_item,tooltip,panelType) => {
        return (
            <div className={"actionCell"}>
            <div className={"actionCellTitle"}>
            {cellName}
            </div>
            <div className={"actionCellButton"}>
                <Tooltip title={tooltip}>
                    <IconButton color="secondary" onClick={() => props.openDrawer(panelType,id_item)}>
                        <AddCircleOutlineRoundedIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
        )
    }


    useEffect(() => {
        getData()
    }, [props.updateData])

    const getData = () => {
        axios.get("/idga/getLocationData")
        .then( (res) => {
            setLocation(res.data)
        })
        .catch((err) => {
            setLocation([])
            console.log(err)
        })
    }

    const columns = [
        {
            name : "id_location",
            options : {
                display : false
            }
        },
        {
            name : "name",
            label : "Locacion",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const location_id = tableMeta.currentTableData[tableMeta.rowIndex].data[0]
                  return (
                    generateActionCell(value,location_id,"Agregar Sector","sector")
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
                            generateActionCell(sector.name,sector.id_sector,"Agregar Subsector","subsector"))  :
                            generateActionCell(sector.name,sector.id_sector,"Agregar Subsector","subsector")
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
                            sector.Subsectors.map(subsector => generateActionCell(subsector.name,subsector.id_subsector,"Agregar Operaciones","operation"))  :
                            <div></div>
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