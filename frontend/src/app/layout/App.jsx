import React from "react";
import { Route } from "react-router-dom";
import NavBar from "./navBar";
import InsuranceList from "../InsuranceDetails/InsuranceList"
import InsuranceAnalysis from "../InsuranceDetails/InsuranceAnalysis"

function App() {
  return (
    <>
      <Route
        path='/analysis'
        render={() => (
          <div>
            <NavBar />
            <div className="mt-5">
              <InsuranceAnalysis />
            </div>
          </div>
        )}
      />
      <Route
        exact 
        path='/'
        render={() => (
          <div>
            <NavBar />
            <div className="mt-5">
              <InsuranceList />
            </div>
          </div>
        )}
      />
    </>
  );
}

export default App;
