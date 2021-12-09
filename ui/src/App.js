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
  // const conceptList = [
  //   { id: 1, text: "Buy eggs" },
  //   { id: 2, text: "Walk the dog" },
  //   { id: 3, text: "Watch a movie" },
  // ];
  // useEffect(() => {
  //   const fetchData = async () => {
  //     //try {
  //     const result = await axios(config.apiUrl);
  //     setConcepts(result.data.Items);
  //     // } catch (err) {
  //     //   toast({
  //     //     title: "Error while trying to retrieve concepts",
  //     //     status: "warning",
  //     //     duration: 2000,
  //     //     isClosable: true,
  //     //   });

  //     return null;
  //     // }
  //   };
  //   fetchData();
  // }, [toast]);

  useEffect(() => {
    async function fetch() {
      const result = await axios(config.apiUrl);
      setConcepts(result.data.Items);
    }
    fetch();
  }, []);
  function saveConcept(concept) {
    console.log("Save:", concept);
    // Save it to lambda
    toast({
      title: "Saving concept...",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
    setCurrentConcept({});
    // setModalValue("");
    setIsOpen(false);
  }

  function deleteConcept(id) {
    const newConcepts = concepts.filter((item) => {
      return item.id !== id;
    });
    setConcepts(newConcepts);
    console.log(newConcepts);
  }

  // function AddConceptHandler(newConcepts) {
  //   setConcepts([...concepts, newConcepts]);
  // }

  // function saveConcept(id, updatedConcept) {
  //   const updatedItem = concepts.map((concept) => {
  //     return concepts.id === id ? updatedConcept : concept;
  //   });
  //   setConcepts(updatedItem);
  // }

  function onClose() {
    setIsOpen(false);
  }

  function openConceptForm(concept) {
    console.log("concept - openConceptForm: ", concept);
    setIsOpen(true);
    setCurrentConcept(concept);
  }

  return (
    <AppContext.Provider
      value={{
        setCurrentConcept,
        setIsOpen,
        onClose,
      }}
    >
      <Header />
      <VStack p={5}>
        {/* {
          <Button leftIcon={<AddIcon />} colorScheme="teal" variant="solid">
            Add Concept
          </Button>
        }
        <Text
          bgGradient="linear(to-l, #007475,#229389)"
          bgClip="text"
          fontSize="2xl"
          fontWeight="extrabold"
        >
          Concept List
        </Text> */}
        <Grid templateColumns="repeat(5, 1fr)" gap={12}>
          <GridItem colSpan={2} h="10">
            <Text
              bgGradient="linear(to-l, #007475,#229389)"
              bgClip="text"
              fontSize="2xl"
              fontWeight="extrabold"
            >
              Concept List
            </Text>
          </GridItem>
          <GridItem colStart={6} colEnd={6} h="10">
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              size="sm"
              variant="solid"
              onClick={() => openConceptForm({})}
            >
              Add
            </Button>
          </GridItem>
        </Grid>
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
      />
    </AppContext.Provider>
  );
}

export default App;
