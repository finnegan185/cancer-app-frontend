import React, { useEffect } from "react";
import Page from "./Page";
import Downshift from "downshift";
import MultipleComboBox from "./MultipleComboBox";
import MUIMultipleComboBox from "./MUIMultipleComboBox";
import { FormControlLabel, FormControl } from "@mui/material";
import GoldSwitch from "./GoldSwitch";

function CompetingSearch(props) {
  console.log("Competing search linked to");

  return (
    <Page title="Competing Trial Search">
      <form className="form-control">
        <label className="lead d-flex justify-content-center align-items-center mt-4">Select Prospective Trial Patient Criteria</label>
        <MUIMultipleComboBox title="Disease Type(s)" />
        <MUIMultipleComboBox title="Disease Stage(s)" />
        <MUIMultipleComboBox title="Disease Mutation(s)" />
        <MUIMultipleComboBox title="Line of Therapy" />
        <FormControlLabel control={<GoldSwitch title="Needs Measurable Disease?" />} label="Needs Measurable Disease?" className="mx-3" />
        <MUIMultipleComboBox title="Life Expectancy" />
        <div className="d-flex justify-content-center align-items-center mb-4">
          <button className="btn">Submit</button>
        </div>
      </form>
    </Page>
  );
}

export default CompetingSearch;
