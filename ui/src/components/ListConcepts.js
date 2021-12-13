import {
  VStack,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Input,
  FormControl,
  FormLabel,
  Text,
  Divider,
} from "@chakra-ui/react";

import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";

function ListConcepts({ concepts = [], deleteConcept, openConceptForm }) {
  const [filteredConcepts, setFilteredConcepts] = useState([]);
  const [ListConcept, setListConcept] = useState([]);

  useEffect(() => {
    setListConcept([...concepts]);
  }, [setFilteredConcepts, concepts]);

  function searchHandler(e) {
    const key = e.target.value.toUpperCase();
    setListConcept([
      ...concepts.filter(
        (c) =>
          (c.displayName.toUpperCase() || "").includes(key) ||
          (c.description.toUpperCase() || "").includes(key) ||
          (c.alternateName.toUpperCase() || "").includes(key)
      ),
    ]);
  }
  return (
    <>
      <Box w="47%">
        <VStack>
          <Text
            bgGradient="linear(to-l, #007475,#229389)"
            bgClip="text"
            fontSize="xl"
            fontWeight="extrabold"
          >
            Search Concept
          </Text>
          <FormControl id="displayName">
            {/* <FormLabel>Search</FormLabel> */}
            <Input
              placeholder="Type in part of display name or desscription or altenate name "
              onChange={searchHandler}
              variant="outline"
              type="text"
              name="displayName"
              size="lg"
            />
          </FormControl>
          <Divider />
          <Text
            bgGradient="linear(to-l, #007475,#229389)"
            bgClip="text"
            fontSize="xl"
            fontWeight="extrabold"
          >
            Concept List
          </Text>
        </VStack>
      </Box>
      <VStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Display Name</Th>
              <Th>Description</Th>
              <Th>Alternate Names</Th>
              <Th>View / Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!ListConcept.length ? (
              <Badge
                colorScheme="purple"
                variant="outline"
                borderRadius="4"
                p="4"
                m="5"
              >
                No concepts available to list!!
              </Badge>
            ) : (
              ListConcept.map((concept) => (
                <>
                  <ConceptRows
                    concept={concept}
                    key={concept.id}
                    deleteConcept={deleteConcept}
                    openConceptForm={openConceptForm}
                  />
                  <Divider />
                </>
              ))
            )}
          </Tbody>
        </Table>
      </VStack>
    </>
  );
}

function ConceptRows({ concept, deleteConcept, openConceptForm }) {
  return (
    <Tr>
      <Td>{concept.displayName}</Td>
      <Td>{concept.description}</Td>
      <Td>{concept.alternateName}</Td>
      <Td>
        <ViewIcon onClick={() => openConceptForm({ ...concept })} />
      </Td>
      <Td>
        <DeleteIcon
          color="red.500"
          mr="2"
          onClick={() => deleteConcept(concept.id)}
        />
      </Td>
    </Tr>
  );
}
export default ListConcepts;
