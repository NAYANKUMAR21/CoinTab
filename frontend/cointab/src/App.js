import { Text } from '@chakra-ui/react';
import AllROutes from './Routes/AllROutes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const nav = useNavigate();
  useEffect(() => {
    nav('/login');
  }, []);
  return (
    <>
      <AllROutes />
    </>
  );
}

export default App;
