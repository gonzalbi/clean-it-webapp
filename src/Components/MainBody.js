import React,{useState} from 'react';
import LocationTable from './Tables/LocationTable';
import BasePanel from './Panels/BasePanel';
import { Drawer } from '@mui/material';
import SectorPanel from './Panels/SectorPanel';
import SubsectorPanel from './Panels/SubsectorPanel'; 

function Mainbody(props) {
  const [toggleDrawer,setDrawer] = useState(false)
  const [panelTitle, setTitle] = useState("")
  const [customPanel, setCustomPanel] = useState(null)

  const style = {
    color: "white",
    backgroundColor: "#1f1f56",
    marginLeft: "15%",
    height: "100%",
    padding: "10px",
    fontFamily: "Arial",
    flex : '1',
    flexDirection : 'row'
  };

  const openDrawer = (panelType,itemId) => {

    switch(panelType){
      case "location":
        setTitle("Locacion")
        break;
      case "sector":
        setTitle("Sector")
        setCustomPanel(<SectorPanel closeDrawer={() => setDrawer(false)} locationId={itemId} reloadData={reloadData} />)
        break;
      case "subsector":
        setTitle("Subsector")
        setCustomPanel(<SubsectorPanel closeDrawer={() => setDrawer(false)} sectorId={itemId} reloadData={reloadData} />)
        break;
      case "operation":
        setTitle("Operacion")
        break;
      default :
        break;
    }

    setDrawer(true)
  }

  const [updateData,setUpdateData] = useState(0) 
  const reloadData = () => { setUpdateData(d => d + 1) }

  return (
      <div style={style}>
        <LocationTable
          openDrawer={openDrawer}
          updateData={() => updateData}
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
      </div>
  );

}

export default Mainbody;