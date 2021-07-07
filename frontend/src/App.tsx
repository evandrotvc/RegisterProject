import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/global";

import Routes from "./routes";
import ContextApp from "./context/index";

const App: React.FC = () => (
  <Router>
    <ContextApp>
      <Routes />
    </ContextApp>
    <GlobalStyle />
  </Router>
);
export default App;
