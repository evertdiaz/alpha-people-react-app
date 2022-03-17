import { React , useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
// import Web3 from 'web3';
import Web3 from "web3/dist/web3.min"; // Used this bc compatibility problems with webpack5
import { Web3ReactProvider } from '@web3-react/core';

import { getLibrary } from './config/web3'

import Home from './views/home';
import Punks from './views/punks';
import PunkDetail from './views/punkDetail';
import MainLayout from './layouts/main';

function App() {
  return (
    <div>
      <HashRouter>
        <ChakraProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <MainLayout>
              <Routes>
                <Route
                  path='/'
                  exact
                  element={<Home/>}
                ></Route>
                <Route
                  path='/punks'
                  element={<Punks/>}
                ></Route>
                <Route
                  path='/punks/:tokenId'
                  element={<PunkDetail/>}
                ></Route>
              </Routes>
            </MainLayout>
          </Web3ReactProvider>
        </ChakraProvider>
      </HashRouter>
    </div>
  );
}

export default App;
