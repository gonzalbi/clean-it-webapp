import React,{useEffect, useState} from 'react';
import LocationTable from './Tables/LocationTable';

function Mainbody(props) {

  const [mainBodyComponent, setmainBodyComponent] = useState(<LocationTable />)

  const renderContent = () => {
    switch(props.selectedTab){
      case "locationTable":
        setmainBodyComponent(<LocationTable />)
        break
      default:
        setmainBodyComponent(<div></div>)
        break
    }
  }

  useEffect(() => {
      renderContent()
  }, [props.selectedTab])

  return (
      <div className="mainBodyContainer">
        {
          mainBodyComponent
        }
      </div>
  );

}

export default Mainbody;