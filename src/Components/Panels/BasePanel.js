import React from 'react';

function BasePanel(props) {

    const style = {
        width : props.customPanel.props.width,
        backgroundColor: "#1f1f56",
        height: "100%",
        color : "white",
    }

    return (
        <div style={style}>
            <div className={"panelContainer"}>
                <h2>{props.title}</h2>
                {props.customPanel}
            </div>
        </div>
    )
}

export default BasePanel;