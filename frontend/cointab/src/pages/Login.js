import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { NavLink, Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useContext, useState } from 'react';
export default function Login() {
  const bgColor1 = useColorModeValue('gray.50', 'gray.800');
  const bgColor2 = useColorModeValue('white', 'gray.700');
  const { SigninState, LoginFn, SignupFn, LogoutFn, details, loggedIn } =
    useContext(AuthContext);
  const [cred, setCred] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value });
  };
  const handleSubmit = () => {
    console.log({ LoginFn, SignupFn, LogoutFn }, cred);
    LoginFn(cred);
    return;
  };
  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {details?.message && (
        <Alert status="error">
          <AlertIcon />
          {details.message} a limit ,Attempted - {details.Attempted} ,Remaining
          are {details.Attempt_Remaing}
        </Alert>
      )}

      <Flex minH={'100vh'} align={'center'} justify={'center'} bg={bgColor1}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Login in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              don't have an Account{' '}
              <NavLink to="/signup" style={{ color: 'blue' }}>
                Sign Up
              </NavLink>{' '}
              ✌️
            </Text>
          </Stack>
          <Box rounded={'lg'} bg={bgColor2} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={cred.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={cred.password}
                  onChange={handleChange}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <NavLink color={'blue.400'}>Forgot password?</NavLink>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleSubmit}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
