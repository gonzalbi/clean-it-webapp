import React,{useState} from 'react';
import LocationTable from './Tables/LocationTable';
import BasePanel from './Panels/BasePanel';
import { Drawer } from '@mui/material';

function Mainbody(props) {
  const [toggleDrawer,setDrawer] = useState(false)

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

  const openDrawer = () => {
    setDrawer(true)
  }

  return (
      <div style={style}>
        <LocationTable 
          openDrawer={openDrawer}
        />
        <Drawer
          anchor='right'
          open={toggleDrawer}
          onClose={() => setDrawer(false)}
        >
          <BasePanel
            width={"500px"}
            title={"Agregar Sectores"}
          >
          </BasePanel>
        </Drawer>
      </div>
  );

}

export default Mainbody;