import { Box, Button, Grid, GridItem, Text, Textarea, useMediaQuery, Spinner } from "@chakra-ui/react";
import DynamicForm from "./DynamicForm";
import Header from "./Header";
import { useState } from "react";
import { useFormContext } from "./FormContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [formSchema, setFormSchema] = useState([]);
  const [isMobile] = useMediaQuery("(max-width: 760px)");
  const [loading, setLoading] = useState(true);

  const leftSideStyles = isMobile
    ? { height: "50vh", overflowY: "scroll" }
    : { height: "100vh" };

  const rightSideStyles = isMobile
    ? { height: "50vh", overflowY: "scroll" }
    : { height: "100vh", overflowY: "scroll" };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    try {
      const parsedFields = JSON.parse(e.target.value);
      if (Array.isArray(parsedFields)) {
        setLoading(true);
        setTimeout(() => {
          setFormSchema(parsedFields);
          setLoading(false);
        }, 250);
      }
    } catch (error) {
      toast.error("Invalid Form Schema", toastOptions);
    }
  };

  const { handleResetData } = useFormContext();

  const handleReset = () => {
    setFormSchema([]);
    setInputValue("");
    handleResetData();
    toast.success("Form Reset Successfully", toastOptions);
  };

  return (
    <>
      <Header />
      <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={6} marginLeft={2} marginRight={2}>
        <GridItem {...leftSideStyles}>
          <Textarea
            value={inputValue}
            placeholder="Paste your UI schema here"
            onChange={handleInputChange}
            height="85vh"
            resize="none"
            overflow={"auto"}
            color="gray.100"
            bg="gray.700"
            fontSize={"20px"}
          />
        </GridItem>

        <GridItem {...rightSideStyles} height={"85vh"} overflow={"auto"} marginLeft={2} marginRight={2}>
          {loading ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Text color="gray.500" fontSize="lg" mb={4}>
                Enter the schema to see the output
              </Text>
              <Spinner size="lg" color="blue.500" />
            </Box>
          ) : (
            formSchema.length > 0 && (
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <DynamicForm formSchema={formSchema} />
                <Box
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Button colorScheme="blue" marginTop={"10px"} onClick={handleReset}>
                    Reset{" "}
                  </Button>
                </Box>
              </Box>
            )
          )}
        </GridItem>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default Home;
