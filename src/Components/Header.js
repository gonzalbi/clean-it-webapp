import React from 'react';

function Header(props) {

  const tabs = [
    {
        name : "Gestion",
        tabName : "locationTable"
    },
    {
        name : "Reportes",
        tabName : "reports"
    },
  ]

  

    return (
            <header>
                <div className="headerContainer">
                {tabs.map((tab,index) => {
                    return (
                    <div 
                        className={`headerTab ${props.selectedTab === tab.tabName ? 'selected' : ''}`} 
                        key={index} 
                        onClick={() => props.setSelectedTab(tab.tabName)}>
                        <h3>{tab.name}</h3>
                    </div>
                    )
                })}
                </div>
                <div className="headerDivisor"></div>
            </header>
        
    );
}

export default Header;

