import React from 'react';

function Sidebar(props) {
   // const { title, content } = accordionData;

  const options = [
    {
        name : "Locaciones",
        optionName : "locationTable"
    },
    {
        name : "Operaciones",
        optionName : "operations"
    },
    {
        name : "Carga Entrega EPP",
        optionName: "eppHandler"
    },
    
    {
        name : "Carga Entrega de Ropa",
        optionName: "entregaRopaHandler"
    }
  ]

    return (
        
            <div className="sideBar" >
                {
                    options.map((opt,index) => {return(
                        <div className="sideOption" key={index}>
                            <p>{opt.name}</p>
                        </div>
                    )})
                }
            </div>
        
    );
}

export default Sidebar;

