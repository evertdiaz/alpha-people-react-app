import { useMemo } from 'react';
import { useWeb3React } from "@web3-react/core";
import PunkPeopleArtifact from '../../config/web3/artifacts/PunkPeople';

const { address, abi } = PunkPeopleArtifact;

const usePunks = () => {
  const { active, library, chainId}  = useWeb3React();
  const punkPeople = useMemo(() => {
    if (active)  
      return new library.eth.Contract(abi, address[chainId])
  }, [active, chainId, library?.eth?.Contract]);


  return punkPeople;
}

export default usePunks;