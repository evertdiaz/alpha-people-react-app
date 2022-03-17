import { useEffect, useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import usePunks from '../usePunks';

// Plural
const getPunksData = async(punksPeople, tokenId) => {
  const dna = await punksPeople.methods.tokenDNA(tokenId).call();
  
  //TASK ADD EVERY ATTRIBUTE GET, CONST AND PUT ON RETURN
  const [
    tokenURI, 
    owner,
    accesoryType,
    clotheColor,
    clotheType,
    eyeType,
    eyebrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType
  ] = await Promise.all([
    punksPeople.methods.tokenURI(tokenId).call(),
    punksPeople.methods.ownerOf(tokenId).call(),

    punksPeople.methods._getAccesoryType(dna).call(),
    punksPeople.methods._getClotheColor(dna).call(),
    punksPeople.methods._getClotheType(dna).call(),
    punksPeople.methods._getEyeType(dna).call(),
    punksPeople.methods._getEyebrowType(dna).call(),
    punksPeople.methods._getFacialHairColor(dna).call(),
    punksPeople.methods._getFacialHairType(dna).call(),
    punksPeople.methods._getHairColor(dna).call(),
    punksPeople.methods._getHatColor(dna).call(),
    punksPeople.methods._getGraphicType(dna).call(),
    punksPeople.methods._getMouthType(dna).call(),
    punksPeople.methods._getSkinColor(dna).call(),
    punksPeople.methods._getTopType(dna).call()
  ])
  console.log(`tokenId: ${tokenId} - eyebrowType: ${eyebrowType}`)
  const responseMetadata = await fetch(tokenURI)
  const metadata = await responseMetadata.json();

  return {
    tokenId,
    attributes: {
      accesoryType,
      clotheColor,
      clotheType,
      eyeType,
      eyebrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      graphicType,
      mouthType,
      skinColor,
      topType
    },
    tokenURI, 
    dna, 
    owner,
    ...metadata,
  }
}

// Singular
const useOnePunkData = (tokenId) => {
  console.log('Entered the hook')
  const [punk, setPunk] = useState();
  const [loading, setLoading] = useState(true);
  const punksPpl = usePunks();

  const update = useCallback(async() => {
    if(punksPpl) {
      setLoading(true)
      const _punk = await getPunksData(punksPpl, tokenId)
      setPunk(_punk);
      
      setLoading(false)
    }
  }, [punksPpl, tokenId])

  useEffect(() => {
    update(tokenId);
  }, [update, tokenId]);

  return {
    loading, punk, update
  }

}


//Plural
const usePunksData = ({ owner = null} = {}) => {
  const [punks, setPunks] = useState();
  const { library } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const punksPpl = usePunks();

  const update = useCallback(async() => {
    if(punksPpl) {
      setLoading(true)

      let tokenIds = [];

      if(!library.utils.isAddress(owner)) {
        const totalSupply = await punksPpl.methods.totalSupply().call();
        console.log('totalSupply: ', totalSupply)

        tokenIds = new Array(Number(totalSupply))
          .fill()
          .map((_, index) => {
            console.log(index)
            return index
          });
      } else {
        const balanceOf = await punksPpl.methods.balanceOf(owner).call();;

        const tokenIdsOfOwner = new Array(Number(balanceOf)).fill().map((_, index) => 
          punksPpl.methods.tokenOfOwnerByIndex(owner, index).call()
        );
        tokenIds = await Promise.all(tokenIdsOfOwner);
      }


      
      const punksPromise = tokenIds.map((tokenId) => getPunksData(punksPpl, tokenId));
      const punks = await Promise.all(punksPromise);

      setPunks(punks);

      setLoading(false)
    }
  }, [punksPpl, owner, library?.utils])

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading, punks, update
  }
}



export { usePunksData, useOnePunkData };