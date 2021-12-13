import {
  VStack,
  Text,
  useToast,
  Button,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import "./App.css";
import { useState, useEffect } from "react";
import { AppContext } from "./AppContextLib";
import ListConcepts from "./components/ListConcepts";
import ConceptForm from "./components/ConceptForm";
import Header from "./components/Header";
import axios from "axios";
import config from "./config";

function App() {
  // const [modalValue, setModalValue] = useState({});
  const [concepts, setConcepts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentConcept, setCurrentConcept] = useState({});
  const toast = useToast();

  useEffect(() => {
    async function fetch() {
      const result = await axios(config.apiUrl);
      setConcepts(result.data.Items);
    }
    fetch();
  }, []);

  async function saveConcept(concept) {
    console.log("Save:", concept);
    // Save it to lambda
    await axios.put(config.apiUrl, concept);
    // find and replace concept if exist if it does't, then add it
    const filteredConcepts = concepts.filter((item) => item.id !== concept.id);
    setConcepts([...filteredConcepts, concept]);
    toast({
      title: "Concept saved!",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
    setCurrentConcept({});
    // setModalValue("");
    setIsOpen(false);
  }

  async function deleteConcept(id) {
    if (window.confirm("Are your sure you want to delete this concept?")) {
      await axios.delete(`${config.apiUrl}/${id}`);
      const remainingConcepts = concepts.filter((item) => item.id !== id);
      setConcepts(remainingConcepts);
      toast({
        title: "Concept deleted!",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  // Get collection of concept display names and ids
  const conceptOptions = concepts.map((item) => {
    return {
      value: item.id,
      label: item.displayName,
    };
  });
  function onClose() {
    setIsOpen(false);
  }

  function openConceptForm(concept) {
    console.log("concept - openConceptForm: ", concept);
    setIsOpen(true);
    setCurrentConcept(concept);
  }
  // const handleCreateItem = (item) => {
  //   setPickerItems((curr) => [...curr, item]);
  //   setSelectedItems((curr) => [...curr, item]);
  // };

  // const handleSelectedItemsChange = (selectedItems) => {
  //   if (selectedItems) {
  //     setSelectedItems(selectedItems);
  //   }
  // };
  return (
    <AppContext.Provider
      value={{
        setCurrentConcept,
        setIsOpen,
        onClose,
      }}
    >
      <Header />
      <VStack p={5} spacing={"30px"}>
        {/* <Grid templateColumns="repeat(5, 1fr)" gap={12}>
          <GridItem colStart={6} colEnd={6} h="10"> */}
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          size="sm"
          variant="solid"
          onClick={() => openConceptForm({})}
        >
          Add New Concept
        </Button>
        {/* </GridItem>
        </Grid> */}
        <Divider />
        <ListConcepts
          concepts={concepts}
          deleteConcept={deleteConcept}
          openConceptForm={openConceptForm}
        />
      </VStack>
      <ConceptForm
        concept={currentConcept}
        isOpen={isOpen}
        onClose={onClose}
        saveConcept={saveConcept}
        conceptOptions={conceptOptions}
      />
    </AppContext.Provider>
  );
}

export default App;
