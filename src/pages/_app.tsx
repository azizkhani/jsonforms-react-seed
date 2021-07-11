import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './layout/header';

import Routes from './routes';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default App;
