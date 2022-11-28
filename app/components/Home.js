import React from "react";
import Page from "./Page";

function Home(props) {
  return (
    <Page title="Home">
      <h1 className="header--text mx-0">University of Zack</h1>
      <div className="mx-1">
        <h3 className="text-muted">Clinical Cancer Research Assistance App</h3>
        <p className="lead text-muted pt-3 mb-0">This is an evolving application created to aid in running a clinical cancer research institution. Currently, our app helps in determining if a prospective clinical trial will compete for the same patient population as one or more of the institutions existing clinical trials. </p>
        <p className="lead text-muted pt-3 mb-0">Future functionality we plan to add includes:</p>
        <ul className="text-muted pt-2">
          <li className="">Enhancing the Competing Trial Search Functionality</li>
          <ul className="pt-1">
            <li>Add patient recruitment timelines & quantity for each trial</li>
            <li className="pt-1">Add trials newly opened at the site</li>
            <li className="pt-1">Add trials as "Prospective" to ensure multiple trials targeting the same patient population are not opened in parallel</li>
            <li className="pt-1">Remove trials when recruitment ends</li>
          </ul>
          <li className="pt-1">ECG Calculator</li>
          <li className="pt-1">Conversion Calculator</li>
        </ul>
      </div>
    </Page>
  );
}

export default Home;
