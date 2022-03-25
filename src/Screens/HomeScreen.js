import React, { useState } from 'react';
import Header from '../Components/Header';
import Mainbody from '../Components/MainBody';
//import Sidebar from '../Components/Sidebar';

function HomeScreen(props) {
    const [selectedTab,setSelectedTab] = useState("locationTable")

    return (
        <>
            <Header  selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <Mainbody selectedTab={selectedTab} />            
        </>
    );
}

export default HomeScreen;