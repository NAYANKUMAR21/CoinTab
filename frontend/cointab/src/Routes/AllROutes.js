import { Text } from '@chakra-ui/react';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import SignupCard from '../pages/Signup';
import Home from '../pages/Home';
const AllROutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupCard />} />
      </Routes>
    </>
  );
};

export default AllROutes;
