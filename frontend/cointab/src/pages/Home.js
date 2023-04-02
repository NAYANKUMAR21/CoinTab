import { Box, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';

const Home = () => {
  const [cred, setCred] = useState({});
  useEffect(() => {
    let x = JSON.parse(localStorage.getItem('loggedIn'));

    setCred({ email: x.email, token: x.token });
  }, []);
  return (
    <Box>
      <Navbar />
      <Box textAlign="center" py={10} px={6}>
        <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          User Authenticated Successfully
        </Heading>
        <Text color={'gray.500'}>
          <span style={{ color: 'white' }}>Email</span> - {cred?.email}
        </Text>
        <Text color={'gray.500'}>
          <span style={{ color: 'white' }}>Token</span> - {cred?.token}
        </Text>
      </Box>
    </Box>
  );
};

export default Home;
