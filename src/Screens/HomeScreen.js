import React from 'react';
import Header from '../Components/Header';
import Mainbody from '../Components/MainBody';
import Sidebar from '../Components/Sidebar';

function HomeScreen(props) {
    return (
        <div>
            <Header />
            <Sidebar />
            <Mainbody />            
        </div>
    );
}

export default HomeScreen;