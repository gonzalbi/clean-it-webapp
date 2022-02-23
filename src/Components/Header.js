import React from 'react';

function Header(props) {
   // const { title, content } = accordionData;

   const style = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial"
  };

    return (
        <Header>
            <div style={style}>
                <div>
                    <h3>IGDA</h3>
                </div>
            </div>
        </Header>
    );
}

export default Header;

