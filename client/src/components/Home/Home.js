import React from 'react';
import NavigationBar from '../UI/NavigationBar/NavigationBar';
import MainPage from '../../containers/MainPage/MainPage';

const home = () => {
    return (
        <div className="container-fluid">
            <NavigationBar />
            <MainPage />
        </div>
    );
}

export default home;
