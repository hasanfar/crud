import {
  VStack,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

// import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import React from "react";

function ListConcepts({ concepts = [], deleteConcept, openConceptForm }) {
  console.log("inside List: ", concepts);
  return !concepts.length ? (
    <Badge colorScheme="purple" variant="outline" borderRadius="4" p="4" m="5">
      No concepts available to list!!
    </Badge>
  ) : (
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
          {concepts.map((concept) => (
            <ConceptRows
              concept={concept}
              key={concept.id}
              deleteConcept={deleteConcept}
              openConceptForm={openConceptForm}
            />
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
}

function ConceptRows({ concept, deleteConcept, openConceptForm }) {
  console.log("inside row: ", concept);
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
