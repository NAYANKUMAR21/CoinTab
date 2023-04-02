import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink, Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function SignupCard() {
  const bgColor1 = useColorModeValue('gray.50', 'gray.800');
  const bgColor2 = useColorModeValue('white', 'gray.700');
  let toast = useToast();
  const { SigninState, LoginFn, SignupFn, LogoutFn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [cred, setCred] = useState({ name: '', email: '', password: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value });
  };
  const handleSubmit = () => {
    console.log({ LoginFn, SignupFn, LogoutFn }, cred);
    const { password } = cred;
    if (password && password.length < 8) {
      if (password.includes(' ')) {
        return toast({
          title: 'Password.',
          description: 'Charcaters should not have spaces included',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      return toast({
        title: 'Password.',
        description: 'Charcaters should be of 8 and not spaces included',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    SignupFn(cred);
    return;
  };
  if (SigninState) {
    return <Navigate to="/login" />;
  }
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={bgColor1}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Already have an account{' '}
            <NavLink to="/login" style={{ color: 'blue' }}>
              Log In
            </NavLink>
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={bgColor2} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={cred.name}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <Flex>
                    <FormLabel>Last Name</FormLabel>
                    <Text fontSize={'10px'} mt="5px">
                      (optional)
                    </Text>
                  </Flex>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={cred.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={cred.password}
                  name="password"
                  onChange={handleChange}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <NavLink style={{ color: 'blue' }} to="/login">
                  Log In
                </NavLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
