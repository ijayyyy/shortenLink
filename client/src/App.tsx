import React from "react";

import "./App.css";
import MainRoutes from "./Routes";
import SnackBar from "./components/snackbar/snackBar";

function App() {
  return (
    <div className="herosection">
      <SnackBar />
      <MainRoutes />
    </div>
  );
}

export default App;
