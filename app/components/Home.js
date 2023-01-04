import React from "react";
import Page from "./Page";

function Home(props) {
  return (
    <Page title="Home">
      <h1 className="header--text mx-0">University of Zack</h1>
      <div className="mx-1">
        <h3 className="text-muted">Why I Created This Clinical Oncology Research Assistance App</h3>
        <p className="lead text-muted pt-3 mb-0">The medical field woefully underutilizes software-based technologies to enhance productivity. One of the problems my institution has faced, as the oncology research space has gotten more and more complex, is the need for more trials to be open at one time. This is a result of our growing understanding of the different tumor types and the mutations within them and the rise of targeted therapies. Gone are the days when we could put 100 people with “cancer” on a clinical trial at one institution. We are struggling to put more than five people on a specific trial.</p>
        <p className="lead text-muted pt-3 mb-0">This means that for institutions to stay financially solvent more trials must be open to enroll a similar number of patients. This leads to the problem; how do we ensure that no two trials are competing for the same patient population? Opening two studies targeting the same patient population when we can only enroll 1-5 patients on them is a bad deal for the institution and the sponsor of the trial.</p>
        <p className="lead text-muted pt-3 mb-0">This web app is my attempt at helping an institution more quickly determine, through some basic eligibility criteria, if a prospective clinical trial will compete for the same population as one of our currently open clinical trials.</p>
        <p className="lead text-muted pt-3 mb-0">As dozens of new clinical trials can be requested by physicians or proposed by the sponsors of the clinical trials each month, being able to limit the time spent on this activity would be a significant boon to the institution. Particularly at this time when we are already stretched thinly.</p>
      </div>
    </Page>
  );
}

export default Home;
