import Web3 from "web3/dist/web3.min";
import { InjectedConnector } from '@web3-react/injected-connector';

const connector = new InjectedConnector({ 
  supportedChainIds: [
    3  //4 for rinkeby
  ]
});

const getLibrary = (provider) => {
  console.log('==========')
  console.log(provider)
  return new Web3(provider);
}

export { getLibrary, connector };