import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import Axios from "axios";
import { FormControlLabel, FormControl } from "@mui/material";

// My Components
import Page from "./Page";
import MUIMultipleComboBox from "./MUIMultipleComboBox";
import GoldSwitch from "./GoldSwitch";
import LoadingDotsIcon from "./LoadingDotsIcon";
import TrialSearchResults from "./TrialSearchResults";

function CompetingSearch(props) {
  console.log("Competing search linked to");

  // Create the state for the component
  const [state, setState] = useImmer({
    isLoading: true,
    types: { title: "Disease Type(s)", data: [], selectedData: [], id: "type" },
    stages: { title: "Disease Stage(s)", data: [], selectedData: [], id: "stage" },
    mutations: { title: "Disease Mutation(s)", data: [], selectedData: [], id: "mutation" },
    line: { title: "Line of Therapy", data: [], selectedData: [], id: "line" },
    expectancy: { title: "Life Expectancy", data: [], selectedData: [], id: "expectancy" },
    needsMeasurableDisease: false,
    haveResults: false,
  });

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchData() {
      try {
        let fields = [state.types.id, state.stages.id, state.mutations.id, state.line.id, state.expectancy.id];

        let response = await Axios.post("/competing-search-get-data", { fields: fields });

        // Looping through the responses to populate the data for each of the multiselect objects
        if (response.data) {
          console.log("needs measurable disease", state.needsMeasurableDisease);
          setState((draft) => {
            draft.types.data = response.data[0];
            draft.stages.data = response.data[1];
            draft.mutations.data = response.data[2];
            draft.line.data = response.data[3];
            draft.expectancy.data = response.data[4];
            draft.isLoading = false;
          });
        } else {
          // need 404 page
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    return () => ourRequest.cancel();
  }, []);

  // handle submit not done, probably not needed
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(state.types.selectedData);
    console.log(state.mutations.selectedData);
  }

  // Individual handlechange functions for each of the multiselects
  function handleTypeChange(event) {
    console.log(event);
    setState((draft) => {
      draft.types.selectedData = event.target.value;
    });
  }

  function handleStageChange(event) {
    setState((draft) => {
      draft.stages.selectedData = event.target.value;
    });
  }

  function handleMutationChange(event) {
    setState((draft) => {
      draft.mutations.selectedData = event.target.value;
    });
  }

  function handleLineChange(event) {
    setState((draft) => {
      draft.line.selectedData = event.target.value;
    });
  }

  function handleExpectancyChange(event) {
    setState((draft) => {
      draft.expectancy.selectedData = event.target.value;
    });
  }

  function handleSwitch() {
    setState((draft) => {
      draft.needsMeasurableDisease = !draft.needsMeasurableDisease;
      draft.haveResults = !draft.haveResults;
    });
  }

  function getSelectedData() {
    let allSelectedData = [];
    if (state.types.selectedData.length) {
      allSelectedData.push({ id: state.types.id, selectedData: state.types.selectedData });
    }
    if (state.stages.selectedData.length) {
      allSelectedData.push({ id: state.stages.id, selectedData: state.stages.selectedData });
    }
    if (state.mutations.selectedData.length) {
      allSelectedData.push({ id: state.mutations.id, selectedData: state.mutations.selectedData });
    }
    if (state.line.selectedData.length) {
      allSelectedData.push({ id: state.line.id, selectedData: state.line.selectedData });
    }
    if (state.expectancy.selectedData.length) {
      allSelectedData.push({ id: state.expectancy.id, selectedData: state.expectancy.selectedData });
    }

    return allSelectedData;
  }

  async function handleClose(menuClosedId) {
    let allSelectedData = getSelectedData();
    console.log(allSelectedData);
    if (allSelectedData.length) {
      console.log("we have data");
      try {
        let matchingTrials = await Axios.post("/competing-search-results", { searchData: allSelectedData });
        console.log("we have a response", matchingTrials);
      } catch {
        console.log("sad");
      }
    }
  }

  if (state.isLoading) {
    return <LoadingDotsIcon />;
  }

  return (
    <Page title="Competing Trial Search">
      <form className="form-control">
        <label className="lead d-flex justify-content-center align-items-center mt-4">Select Prospective Trial Patient Criteria</label>
        <MUIMultipleComboBox selectProps={state.types} onClose={handleClose} onChange={handleTypeChange} />
        <MUIMultipleComboBox selectProps={state.stages} onClose={handleClose} onChange={handleStageChange} />
        <MUIMultipleComboBox selectProps={state.mutations} onClose={handleClose} onChange={handleMutationChange} />
        <MUIMultipleComboBox selectProps={state.line} onClose={handleClose} onChange={handleLineChange} />
        <FormControlLabel control={<GoldSwitch title="Needs Measurable Disease?" onChange={handleSwitch} />} label="Needs Measurable Disease?" className="mx-3" />
        <MUIMultipleComboBox selectProps={state.expectancy} onClose={handleClose} onChange={handleExpectancyChange} />
      </form>
      {state.haveResults ? <TrialSearchResults></TrialSearchResults> : ""}
    </Page>
  );
}

export default CompetingSearch;
