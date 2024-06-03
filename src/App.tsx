import { Fragment } from "react/jsx-runtime";
import FormBuilder from "./components/FormBuilder";
import "react-nestable/dist/styles/index.css";

// Roboto Fonts for Material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <Fragment>
      <FormBuilder />
    </Fragment>
  );
}

export default App;
