import React from "react";
import "./App.css";
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from "react-router-dom";
import { isLoggedIn } from "./utils/cookie-utils";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

const JobListing = React.lazy(() =>
  import("./components/JobListing/JonListing"),
);

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          Component={(props) => {
            return !isLoggedIn() ? (
              <Login />
            ) : (
              <Navigate
                to="/app/Job-Listing"
                replace={true}
                state={{
                  roload: true,
                }}
              />
            );
          }}
        />
        <Route
          path="/signup"
          Component={(props) => {
            return !isLoggedIn() ? (
              <SignUp />
            ) : (
              <Navigate
                to="/app/Job-Listing"
                replace={true}
                state={{
                  roload: true,
                }}
              />
            );
          }}
        />
        <Route
          path="/app/Job-Listing"
          Component={(props) => {
            return isLoggedIn() ? (
              <JobListing />
            ) : (
              <Navigate
                to="/"
                replace={true}
                state={{
                  roload: true,
                }}
              />
            );
          }}
        />
      </Routes>
    </Router>
  );
}

export default App;
