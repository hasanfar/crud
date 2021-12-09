import React from "react";
import { Heading, Box, Center } from "@chakra-ui/react";

const Header = (props) => {
  return (
    <Box bg="teal.500" color="#EDF2F7" padding={6} {...props}>
      <Center>
        <Heading size="lg" letterSpacing={"tighter"} textAlign="center">
          Master Ontology Mananagement System (POC)
        </Heading>
      </Center>
    </Box>
  );
};

export default Header;
