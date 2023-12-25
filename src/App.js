import React from "react";
import Home from "./components/Home";
import { FormContextProvider } from "./components/FormContext";
const App = () => {
  return (
    <>
      <FormContextProvider>
        <Home/>
      </FormContextProvider>
    </>
  );
};

export default App;
