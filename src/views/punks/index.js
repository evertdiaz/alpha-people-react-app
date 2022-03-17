import { useWeb3React } from '@web3-react/core';
import { 
  Grid,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  FormHelperText,
  FormControl,
 } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { React, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PunkCard from '../../components/punk-card';
import Loading from '../../components/loading';
import RequestAccess from '../../components/request-access';
import {usePunksData} from '../../hooks/usePunksData';

const Punks = () => {
  const { search } = useLocation();
  const { active, library } = useWeb3React();
  const [submitted, setSubmitted] = useState(true);
  const [validAddress, setValidAddress] = useState(true);
  const [address, setAddress] = useState(new URLSearchParams(search).get('address'));
  const navigate = useNavigate()
  const { punks, loading } = usePunksData({
    owner: submitted && validAddress? address: null
  });


  const handleAddressChange = ({ target: { value }}) => {
    setAddress(value);
    setSubmitted(false);
    setValidAddress(false);
  }

  const submit = (event) => {
    event.preventDefault();

    if (address) {
      const isValid = library.utils.isAddress(address);
      setValidAddress(isValid);
      setSubmitted(true)
      if(isValid) navigate(`/punks?address=${address}`)
    } else {
      navigate('/punks')
    }
  }

  if(!active) return <RequestAccess/>

  return (
    <>
    <form onSubmit={submit}>
      <FormControl>
        <InputGroup mb={3}>
          <InputLeftElement 
            pointerEvents="none" 
            children={<SearchIcon color="gray.300"/>}>
          </InputLeftElement>
          <Input
            isInvalid={false} 
            value={address ?? ''}
            onChange={handleAddressChange}
            placeholder="Search by owner address"
          ></Input>
          <InputRightElement width="5.5rem">
            <Button type="submit" h="1.75rem" size="sm">
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
        {
          submitted && !validAddress && (
          <FormHelperText>Invalid Address</FormHelperText>
          )
        }
      </FormControl>
    </form>
    {
      loading?
      <Loading></Loading>
      :
      <Grid templateColumns={"repeat(auto-fill, minmax(250px, 1fr))"} gap={6}>
        {
          punks.map(({ name, image, tokenId}) => 
          <Link key={tokenId} to={`/punks/${tokenId}`}>
            <PunkCard key={tokenId} image={image} name={name}>
            </PunkCard>
          </Link>
          
          )
        }
      </Grid>
      
      // <Gallery></Gallery>
    }
    </>
  )
}

export default Punks;