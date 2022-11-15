import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import Axios from 'axios'
import Page from "./Page";
import Downshift from "downshift";
import MultipleComboBox from "./MultipleComboBox";
import MUIMultipleComboBox from "./MUIMultipleComboBox";
import { FormControlLabel, FormControl } from "@mui/material";
import GoldSwitch from "./GoldSwitch";
import LoadingDotsIcon from "./LoadingDotsIcon";

function CompetingSearch(props) {
  console.log("Competing search linked to");

  // Create the state for the component
  const [state, setState] = useImmer({
    isLoading: true,
    multiSelectTypes: {title: "Disease Type(s)", multiSelectData: [], selectedData: [] },
    multiSelectStages: { title: "Disease Stage(s)", multiSelectData: [], selectedData: [] }, 
    multiSelectMutations: { title: "Disease Mutation(s)", multiSelectData: [], selectedData: [] }, 
    multiSelectLine: { title: "Line of Therapy", multiSelectData: [], selectedData: [] }, 
    multiSelectExpectancy: { title: "Life Expectancy", multiSelectData: [], selectedData: [] },
    needsMeasurableDisease: false,
  });

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchData() {
      try {
        Promise.all([
          Axios.post("/competing-search", { field: state.multiSelectTypes.title}),
          Axios.post("/competing-search", { field: state.multiSelectStages.title}),
          Axios.post("/competing-search", { field: state.multiSelectMutations.title}),
          Axios.post("/competing-search", { field: state.multiSelectLine.title}),
          Axios.post("/competing-search", { field: state.multiSelectExpectancy.title})
        ])
        // Looping through the responses to populate the data for each of the multiselect objects
        .then(response => {

          setState((draft) => {
            draft.multiSelectTypes.multiSelectData = response[0].data
            draft.multiSelectStages.multiSelectData = response[1].data
            draft.multiSelectMutations.multiSelectData = response[2].data
            draft.multiSelectLine.multiSelectData = response[3].data
            draft.multiSelectExpectancy.multiSelectData = response[4].data
            draft.isLoading = false;
          })
          
        })
        .catch((e) =>{console.log("lame")})
        // const response = await Axios.post("/competing-search", { fields: state.multiSelectTitles });

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    return () => ourRequest.cancel();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(state.multiSelectTypes.selectedData)
    console.log(state.multiSelectMutations.selectedData)
  }

  function handleChange(event, title) {
    console.log(state.multiSelectTypes.selectedData)
    console.log("competeing search event handler triggered")
    console.log(event)
    console.log(title)
    const {
      target: { value },
    } = event;
    setState((draft) => {
      if (typeof value === "string") {
        draft.multiSelectTypes.selectedData = value.split(",");
      } else {
        draft.multiSelectTypes.selectedData = {...state.multiSelectTypes, value};
      }
    });
    
  };

  if (state.isLoading) {
    return <LoadingDotsIcon />;
  }

  return (
    <Page title="Competing Trial Search">
      <form className="form-control" onSubmit={handleSubmit}>
        <label className="lead d-flex justify-content-center align-items-center mt-4">Select Prospective Trial Patient Criteria</label>
        <MUIMultipleComboBox selectProps={state.multiSelectTypes} onChange={handleChange} />
        <MUIMultipleComboBox selectProps={state.multiSelectStages} onChange={handleChange} />
        <MUIMultipleComboBox selectProps={state.multiSelectMutations} onChange={handleChange} />
        <MUIMultipleComboBox selectProps={state.multiSelectLine} onChange={handleChange} />
        <FormControlLabel control={<GoldSwitch title="Needs Measurable Disease?" />} label="Needs Measurable Disease?" className="mx-3" />
        <MUIMultipleComboBox selectProps={state.multiSelectExpectancy} onChange={handleChange} />
        <div className="d-flex justify-content-center align-items-center mb-4">
          {state.multiSelectTypes.selectedData}
          <button className="btn">Submit</button>
        </div>
      </form>
    </Page>
  );
}

export default CompetingSearch;
