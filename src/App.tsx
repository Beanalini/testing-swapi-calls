import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import yoda from "./assets/yoda.png";

const App: React.FC = () => {
  const [personName, setPersonName] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  useEffect(() => {
    const fetchStarWarsPeople = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/1");
        setIsFetching(false);

        if (!response.ok) {
          if (response.status === 418) setErrMessage("I'm a tea pot 🫖, silly");
          if (response.status === 500)
            setErrMessage("Oops... something went wrong, try again 🤕");
        }
        const json = await response.json();
        setPersonName(json.name);
      } catch (error) {
        console.log(error);
        setIsFetching(false);
      }
    };
    fetchStarWarsPeople();
  }, []);

  return (
    <>
      <div className="App">
        <h1>Star Wars:Testing API Calls</h1>
        {isFetching ? (
          <>
            <p className="loading">Fetching Data</p>
            <img className="yoda" src={yoda} alt="yoda caricature" />
          </>
        ) : (
          <h2>
            <span className="person-name">{personName}</span>...you're being
            tested!
          </h2>
        )}
        {errMessage && <h3>{errMessage}</h3>}
      </div>
    </>
  );
};

export default App;
