import {
  HStack,
  VStack,
  Text,
  Flex,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  //   Modal,
  //   ModalOverlay,
  //   ModalContent,
  //   ModalHeader,
  //   ModalFooter,
  //   ModalBody,
  //   ModalCloseButton,
  //   Button,
  //   Input,
} from "@chakra-ui/react";

// import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import { useAppContext } from "../AppContextLib";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import ConceptForm from "./ConceptForm";

function ListConcepts({ concepts = [], deleteConcept, openConceptForm }) {
  return !concepts.length ? (
    <Badge colorScheme="purple" variant="outline" borderRadius="4" p="4" m="5">
      No concepts available to list!!
    </Badge>
  ) : (
    <VStack>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Display Name</Th>
            <Th>Description</Th>
            <Th>ParentIds</Th>
            <Th>ChildIds</Th>
            <Th>Alternate Names</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {concepts.map((concept) => (
            <Tr>
              <Td>{concept.id}</Td>
              <Td>{concept.displayName}</Td>
              <Td>{concept.description}</Td>
              <Td>{concept.parentIds}</Td>
              <Td>{concept.childIds}</Td>
              <Td>{concept.alternateNames}</Td>
              <Td>
                <EditIcon onClick={() => openConceptForm({ ...concept })} />
              </Td>
              <Td>
                <DeleteIcon
                  color="red.500"
                  mr="2"
                  onClick={() => deleteConcept(concept.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
}

export default ListConcepts;
