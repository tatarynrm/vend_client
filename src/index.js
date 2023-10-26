import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ChakraProvider theme={theme}>
    {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </Router>
);
