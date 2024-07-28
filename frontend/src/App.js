import React, { Fragment, useReducer } from "react";
import Routes from "./components";
import { LayoutContext, layoutState, layoutReducer } from "./components/shop";

function App() {
  const [data, dispatch] = useReducer(layoutReducer, layoutState);
  return (
    <div>
      <Fragment>
        <LayoutContext.Provider value={{ data, dispatch }}>
          <Routes />
        </LayoutContext.Provider>
      </Fragment>
    </div>
  );
}

export default App;
