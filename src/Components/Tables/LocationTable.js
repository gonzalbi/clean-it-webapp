import React,{useState,useEffect} from 'react';
import CustomTable from './CustomTable';
import axios from 'axios'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Tooltip,IconButton,Drawer } from '@mui/material';
import BasePanel from '../Panels/BasePanel';
import SectorPanel from '../Panels/SectorPanel';
import SubsectorPanel from '../Panels/SubsectorPanel';
import OperationPanel from '../Panels/OperationPanel';
import ManageOperationPanel from '../Panels/ManageOperationPanel';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import EPPPanel from '../Panels/EPPPanel';
import EntregaRopaPanel from '../Panels/EntregaRopaPanel';
import LocationPanel from '../Panels/LocationPanel';

function LocationTable(props) {

    const [locationData,setLocation] = useState([])
    const [toggleDrawer,setDrawer] = useState(false)
    const [panelTitle, setTitle] = useState("")
    const [customPanel, setCustomPanel] = useState(null)
    const [refreshKey,setRefreshKey] = useState(1)

    const openDrawer = (panelType,itemId,name = null) => {

        switch(panelType){
          case "location":
            setTitle("Locacion")
            setCustomPanel(<LocationPanel width={"500px"} closeDrawer={() => setDrawer(false)} reloadData={() => setRefreshKey(e => e + 1)} />)
            break;
          case "sector":
            setTitle("Sector")
            setCustomPanel(<SectorPanel  width={"500px"} closeDrawer={() => setDrawer(false)} locationId={itemId} reloadData={() => setRefreshKey(e => e + 1)} />)
            break;
          case "subsector":
            setTitle("Subsector")
            setCustomPanel(<SubsectorPanel  width={"500px"} closeDrawer={() => setDrawer(false)} sectorId={itemId} reloadData={() => setRefreshKey(e => e + 1)} />)
            break;
          case "operation":
            setTitle("Operacion")
            setCustomPanel(<OperationPanel  width={"500px"} closeDrawer={() => setDrawer(false)} subsectorId={itemId} reloadData={() => setRefreshKey(e => e + 1)} />)
            break;
          case "manage_operations":
              setTitle("Gestionar Operaciones")
              setCustomPanel(<ManageOperationPanel  width={"800px"} closeDrawer={() => setDrawer(false)} subsectorId={itemId} reloadData={() => setRefreshKey(e => e + 1)}  />)
              break;
          case "mangage_epp":
              setTitle("Cargar Entrega de EPP por Operario")
              setCustomPanel(<EPPPanel  width={"800px"} closeDrawer={() => setDrawer(false)} sectorName={name} sectorId={itemId} reloadData={() => setRefreshKey(e => e + 1)}  />)
              break;
          case "manage_ropa":
            setTitle("Cargar Entrega de Ropa por Operario")
            setCustomPanel(<EntregaRopaPanel width={"800px"} closeDrawer={() => setDrawer(false)} sectorName={name} sectorId={itemId} reloadData={() => setRefreshKey(e => e + 1)}  />)
              break;
          default :
            break;
        }
    
        setDrawer(true)
      }
    
    const generateActionCell = (cellName,id_item,tooltip,panelType) => {
        return (
            <div className={"actionCell"}>
            <div className={"actionCellTitle"}>
            {cellName ? cellName : '\u00A0'}
            </div>
            {id_item ? 
                (
                <div className={"actionCellButton"}>
                    <Tooltip title={tooltip}>
                        <IconButton color="secondary" onClick={() => openDrawer(panelType,id_item)}>
                            <AddCircleOutlineRoundedIcon />
                        </IconButton>
                    </Tooltip>
                    {
                    panelType === 'operation' ? 
                    renderManageOperations('manage_operations', id_item) :
                    panelType === 'subsector' ?
                    renderManageEPPRopa(id_item,cellName) :
                    <></>
                    }
                </div>
                ) :
             <></>
            }

        </div>
        )
    }

    const renderManageOperations = (panelType,id_item) => {
        return (
            <div className={"actionCellButton"}>
                <Tooltip title='Gestionar operaciones'>
                    <IconButton color="secondary" onClick={() => openDrawer(panelType,id_item)}>
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>
            </div>
        )
    }

    const renderManageEPPRopa = (id_item,sectorName) =>{
        return (
        <>
            <div className={"actionCellButton"}>
                <Tooltip title='Gestionar entrega de EPP'>
                    <IconButton color="secondary" onClick={() => openDrawer('mangage_epp',id_item,sectorName)}>
                        <ListAltIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <div className={"actionCellButton"}>
                <Tooltip title='Gestionar entrega de Ropa'>
                    <IconButton color="secondary" onClick={() => openDrawer('manage_ropa',id_item,sectorName)}>
                        <CheckroomIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </>)
    }


    useEffect(() => {
        getData()
    }, [refreshKey])

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
                sort: false,
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
                sort: false,
                customBodyRender: (sectors, tableMeta, updateValue) => {
                    return sectors ? 
                        sectors.map(sector => { 
                            return sector.Subsectors.length > 0 ?
                            sector.Subsectors.map((subsector,index) => index === 0 ?
                                generateActionCell(sector.name,sector.id_sector,"Agregar Subsector","subsector") :
                                generateActionCell("",null,null,null))  :
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
                sort: false,
                customBodyRender: (sectors, tableMeta, updateValue) => {
                    return sectors ? 
                        sectors.map(sector => { return sector.Subsectors.length > 0 ?
                            sector.Subsectors.map(subsector => 
                                generateActionCell(subsector.name,subsector.id_subsector,"Agregar Operaciones","operation") 
                            )  :
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

    const renderAddLocation = () => {
        return (<div>{"Locaciones"}<Tooltip title={"Agregar Locacion"}><IconButton color="secondary" onClick={() => openDrawer("location",null)}><AddCircleOutlineRoundedIcon /></IconButton></Tooltip></div>)
    }

  return (
        <>
            <CustomTable 
                title={renderAddLocation()}
                columns={columns}
                data={locationData}
            />
            <Drawer
            anchor='right'
            open={toggleDrawer}
            onClose={() => setDrawer(false)}
            >
            <BasePanel
                width={"500px"}
                title={panelTitle}
                customPanel={customPanel}
            >
            </BasePanel>
            </Drawer>
        </>
  );

}

export default LocationTable;