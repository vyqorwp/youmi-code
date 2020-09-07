import React from 'react'
import { Box } from '@chakra-ui/core';

interface WrapperProps {

}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (<Box mt={8} maxW="800px" w="100%" mx="auto">{children}</Box>);
}