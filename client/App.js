import React from 'react';
import TopMenu from './components/TopMenu';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Map from './components/Map';

const App = () => {
  return (
    <div className='no-margin-div'>
      <TopMenu />
      <div id='top-spacer-div' />
      <Routes />
      <Navbar />
      <div id='bottom-spacer-div' />
    </div>
  );
};

export default App;
