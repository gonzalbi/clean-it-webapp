import React from 'react';

function Sidebar(props) {
   // const { title, content } = accordionData;

   const style = {
    color: "white",
    backgroundColor: "#1f1f56",
    width: "15%",
    height: "100%",
    flex : '1',
    flexDirection : 'row',
    margin: 0,
    padding: 0,
    position: 'fixed',
    overflow: 'auto',
  };

  const options = [
    {
        name : "Locaciones",
        url : ""
    },
  ]

    return (
        
            <div style={style} >
                {
                    options.map((opt,index) => {return(
                        <div key={index}>
                            <p>{opt.name}</p>
                        </div>
                    )})
                }
            </div>
        
    );
}

export default Sidebar;

