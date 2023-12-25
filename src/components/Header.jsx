import React from 'react';
import { Box,Text } from '@chakra-ui/react';
import { ColorSwitch } from './ColorSwitch';

const Header = () => {
  return (
    <Box width="100%" display="flex" padding={["0px", "20px"]} alignItems="center" justifyContent={"center"}>
      
      <Box alignItems="center" gap="12px">
        <Text fontSize={["2xl", '4xl']}>
          Json Schema to React Form
        </Text>
      </Box>
      <ColorSwitch/>
    </Box>
  );
};

export default Header;
