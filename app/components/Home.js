import React from "react";
import Page from "./Page";

function Home(props) {
  return (
    <Page title="Home">
      <h1>University of Zack</h1>
      <h3 className="text-muted">Clinical Cancer Research Assistance App</h3>
      <p className="lead text-muted pt-3 mb-0">This is an evolving application created to aid in running a clincal cancer research institution. Currently, our app helps in determining if a prospective clinical trial will compete for the same patient population as one or more of the institutions existing clinical trials. </p>
    </Page>
  );
}

export default Home;
