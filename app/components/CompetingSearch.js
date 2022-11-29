import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import Axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";

// My Components
import Page from "./Page";
import MUIMultipleComboBox from "./MUIMultipleComboBox";
import GoldSwitch from "./GoldSwitch";
import LoadingDotsIcon from "./LoadingDotsIcon";
import TrialSearchResults from "./TrialSearchResults";
import TrialResultCard from "./TrialResultCard";
import SearchInfoIcon from "./SearchInfoIcon";

function CompetingSearch(props) {
  // Create the state for the component
  const [state, setState] = useImmer({
    isLoading: true,
    types: { title: "Disease Type(s)", data: [], selectedData: [], id: "type" },
    stages: { title: "Disease Stage(s)", data: [], selectedData: [], id: "stage" },
    mutations: { title: "Disease Mutation(s)", data: [], selectedData: [], id: "mutation" },
    line: { title: "Line of Therapy", data: [], selectedData: [], id: "line" },
    expectancy: { title: "Life Expectancy", data: [], selectedData: [], id: "expectancy" },
    needsMeasurableDisease: { needsMeasurable: false, id: "needsMeasurable" },
    closeCount: 0,
    matchingTrials: [],
  });

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchData() {
      try {
        let fields = [state.types.id, state.stages.id, state.mutations.id, state.line.id, state.expectancy.id];

        let response = await Axios.post("/competing-search-get-data", { fields: fields });

        // Looping through the responses to populate the data for each of the multiselect objects
        if (response.data) {
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

  // Individual handlechange functions for each of the multiselects
  function handleTypeChange(event) {
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
      draft.needsMeasurableDisease.needsMeasurable = !draft.needsMeasurableDisease.needsMeasurable;
      draft.closeCount++;
    });
  }

  // Database Results Search Operations

  // Get all criteria that has been user selected up to the most recent
  // menu close.
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
    if (state.closeCount > 0) {
      allSelectedData.push({ id: state.needsMeasurableDisease.id, needsMeasurable: state.needsMeasurableDisease.needsMeasurable });
    }

    return allSelectedData;
  }

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const allSelectedData = getSelectedData();

    async function fetchResults() {
      try {
        const matchingResponse = await Axios.post("/competing-search-results", { searchData: allSelectedData });
        if (matchingResponse.data) {
          setState((draft) => {
            draft.matchingTrials = matchingResponse.data;
          });
        } else {
          setState((draft) => {
            draft.matchingTrials = [];
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (allSelectedData.length) {
      fetchResults();
    }
    return () => ourRequest.cancel();
  }, [state.closeCount]);

  // Handle close. Increments closeCount which activates the useEffect
  // to search db for matching trials.
  function handleClose(menuClosedId) {
    try {
      setState((draft) => {
        draft.closeCount++;
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (state.isLoading) {
    return <LoadingDotsIcon />;
  }

  return (
    <Page title="Competing Trial Search">
      <h2 className="header--text">Competing Trial Search</h2>
      <form className="form-control shadow mb-5">
        <div className="d-flex justify-content-between">
          <h4 className="mt-2 ms-2">Select the inclusion criteria of the prospective trial.</h4>
          <SearchInfoIcon />
        </div>
        <MUIMultipleComboBox selectProps={state.types} onClose={handleClose} onChange={handleTypeChange} />
        <MUIMultipleComboBox selectProps={state.stages} onClose={handleClose} onChange={handleStageChange} />
        <MUIMultipleComboBox selectProps={state.mutations} onClose={handleClose} onChange={handleMutationChange} />
        <MUIMultipleComboBox selectProps={state.line} onClose={handleClose} onChange={handleLineChange} />
        <FormControlLabel control={<GoldSwitch title="Needs Measurable Disease?" onChange={handleSwitch} />} label="Needs Measurable Disease?" className="mx-3 mb-3" />
        <MUIMultipleComboBox selectProps={state.expectancy} onClose={handleClose} onChange={handleExpectancyChange} />
      </form>
      {state.matchingTrials.length === 0 && state.closeCount > 0 ? (
        <h2 className="header--text mt-4">Congratulations! No Competing Trials</h2>
      ) : state.matchingTrials.length > 0 ? (
        <div>
          <h2 className="header--text mt-4">{state.matchingTrials.length > 1 ? state.matchingTrials.length + " Competing Trials" : "1 Competing Trial"}</h2>
          <div className="results-container shadow py-3">
            <TrialSearchResults>
              {state.matchingTrials.map((trial) => {
                return <TrialResultCard trial={trial} key={trial._id} />;
              })}
            </TrialSearchResults>
          </div>
        </div>
      ) : (
        ""
      )}
    </Page>
  );
}

export default CompetingSearch;
