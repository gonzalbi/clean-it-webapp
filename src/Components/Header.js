import React from 'react';

function Header(props) {

  const tabs = [
    {
        name : "Gestion",
        url : ""
    },
    {
        name : "Reportes",
        url : ""
    },
  ]

    return (
        
            <div className="headerContainer">
            {tabs.map((tab,index) => {
                return (
                <div className={`headerTab ${index === 0 ? 'selected' : ''}`} key={index} id={`header-${index}`}>
                    <h3>{tab.name}</h3>
                </div>
                )
            })}
            </div>
        
    );
}

export default Header;

