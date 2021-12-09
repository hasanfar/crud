import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import isEmpty from "lodash/isEmpty";

export default function ConceptForm({
  concept = {},
  isOpen,
  onClose,
  saveConcept,
}) {
  const saveMode = isEmpty(concept) ? "Create" : "Update";
  const [formValues, setFormValues] = useState({});
  useEffect(() => {
    setFormValues({
      id: concept.id || null,
      displayName: concept.displayName,
      description: concept.description,
      alternateName: concept.alternateName,
    });
  }, [concept]);
  const inputsHandler = (e) => {
    setFormValues({ [e.target.name]: e.target.value });
  };
  function submitHandler(e) {
    e.preventDefault();
    saveConcept(formValues);
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{saveMode} Concept</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={submitHandler}>
          <ModalBody>
            <Input value={formValues.id} type="hidden" />
            <FormControl id="displayName" isRequired>
              <FormLabel>Display Name</FormLabel>
              <Input
                placeholder="Display Name"
                value={formValues.displayName}
                onChange={inputsHandler}
                variant="outline"
                type="text"
                name="displayName"
              />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                value={formValues.description}
                onChange={inputsHandler}
                variant="outline"
                type="text"
                name="description"
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Alternate Name</FormLabel>
              <Input
                placeholder="Altenate Name"
                value={formValues.alternateName}
                onChange={inputsHandler}
                variant="outline"
                type="text"
                name="alternateName"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button type="submit" colorScheme="teal" mr={3}>
              {saveMode}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
