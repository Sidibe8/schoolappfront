import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";


import reportWebVitals from "./reportWebVitals";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { getEleves } from "./actions/eleveActions";
import { getClasses } from "./actions/classeActions";
import { getMatieres } from "./actions/matiereActions";
import { getProfesseurs } from "./actions/professeurActions";
import { getTrimestres } from "./actions/trimestreActions";
import { Provider } from "react-redux";
import { getAllUsers } from "./actions/userActions";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(getEleves());
store.dispatch(getClasses());
store.dispatch(getMatieres());
store.dispatch(getProfesseurs());
store.dispatch(getTrimestres());
store.dispatch(getAllUsers());

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
