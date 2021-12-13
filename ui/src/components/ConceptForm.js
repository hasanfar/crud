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
import { CUIAutoComplete } from "chakra-ui-autocomplete";

export default function ConceptForm({
  concept = {},
  isOpen,
  onClose,
  saveConcept,
  conceptOptions,
}) {
  const saveMode = isEmpty(concept) ? "Create" : "Update";
  const [formValues, setFormValues] = useState({});
  const [options, setOptions] = useState([]);
  const [selectedParents, setSelectedParents] = useState([]);
  const [selectedChild, setSelectedChild] = useState([]);
  const [parentIds, setParentIds] = useState("");
  const [childIds, setChildIds] = useState("");

  useEffect(() => {
    const selectedParentOptions = conceptOptions.filter((co) =>
      concept.parentIds?.split(",").includes(co.value)
    );
    const selectedChildOptions = conceptOptions.filter((co) =>
      concept.childIds?.split(",").includes(co.value)
    );
    setSelectedParents(selectedParentOptions);
    setSelectedChild(selectedChildOptions);
  }, [conceptOptions, concept.parentIds, concept.childIds]);

  useEffect(() => {
    setParentIds(selectedParents.map((p) => p.value).join());
    setChildIds(selectedChild.map((p) => p.value).join());
    setFormValues({
      parentIds: selectedParents.map((p) => p.value).join(),
      childIds: selectedChild.map((p) => p.value).join(),
    });
  }, [selectedParents, selectedChild]);

  useEffect(() => {
    const result = conceptOptions
      .filter((co) => !selectedParents.some((sp) => sp.value === co.value))
      .filter((co) => !selectedChild.some((sp) => sp.value === co.value))
      .filter((co) => co.value !== concept.id);
    setOptions(result);
  }, [conceptOptions, selectedParents, selectedChild, concept.id]);

  useEffect(() => {
    setParentIds(selectedParents.map((p) => p.value).join());
    setChildIds(selectedChild.map((p) => p.value).join());
  }, [selectedParents, selectedChild]);

  const handleSelectedParentsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedParents(selectedItems);
      setParentIds(selectedParents.map((p) => p.value).join());
      setChildIds(selectedChild.map((p) => p.value).join());
    }
  };
  const handleSelectedChildChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedChild(selectedItems);
      setParentIds(selectedParents.map((p) => p.value).join());
      setChildIds(selectedChild.map((p) => p.value).join());
    }
  };
  useEffect(() => {
    setFormValues({
      id: concept.id || nanoid(),
      displayName: concept.displayName,
      description: concept.description,
      alternateName: concept.alternateName,
      parentIds: concept.parentIds,
      childIds: concept.childIds,
    });
  }, [concept]);

  const inputsHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  function submitHandler(e) {
    e.preventDefault();
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
            <Input
              name="parentIds"
              value={parentIds}
              onInput={inputsHandler}
              type="hidden"
            />
            <Input
              name="childIds"
              value={childIds}
              onInput={inputsHandler}
              type="hidden"
            />
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
            <FormControl id="parentIds">
              <CUIAutoComplete
                label="Parent Concepts"
                placeholder="Type a Concept name"
                disableCreateItem="true"
                items={options}
                selectedItems={selectedParents}
                onSelectedItemsChange={(changes) =>
                  handleSelectedParentsChange(changes.selectedItems)
                }
              />
            </FormControl>
            <FormControl id="ChildIds">
              <CUIAutoComplete
                label="Child Concepts"
                placeholder="Type a Concept name"
                disableCreateItem="true"
                items={options}
                selectedItems={selectedChild}
                onSelectedItemsChange={(changes) =>
                  handleSelectedChildChange(changes.selectedItems)
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
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
