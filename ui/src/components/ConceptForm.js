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
import { nanoid } from "nanoid";

export default function ConceptForm({
  concept = {},
  isOpen,
  onClose,
  saveConcept,
  conceptList,
}) {
  console.log("conceptList: ", conceptList);
  const saveMode = isEmpty(concept) ? "Create" : "Update";
  const [formValues, setFormValues] = useState({});
  const pickerItems = conceptList.filter((item) => {
    console.log("---------");
    console.log("item.id- ", item.id);
    console.log("Concept ", concept);
    console.log(
      "!concept.parentIds?.includes(item) ",
      !concept.parentIds?.includes(item.id)
    );
    console.log(
      " !concept.childIds?.includes(item) ",
      !concept.childIds?.includes(item.id)
    );
    console.log("item.id !== concept.id ", item.id !== concept.id);
    return (
      !concept.parentIds?.includes(item.id) &&
      !concept.childIds?.includes(item.id) &&
      item.id !== concept.id
    );
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  useEffect(() => {
    setFormValues({
      id: concept.id || nanoid(),
      displayName: concept.displayName,
      description: concept.description,
      alternateName: concept.alternateName,
    });
  }, [concept]);
  const inputsHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  function submitHandler(e) {
    e.preventDefault();
    console.log("saveConcept: ", { ...concept, ...formValues });
    saveConcept({ ...concept, ...formValues });
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
