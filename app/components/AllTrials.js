import React, { useEffect, useState } from "react";
import Axios from "axios";

// My Components
import Page from "./Page";
import LoadingDotsIcon from "./LoadingDotsIcon";
import TrialSearchResults from "./TrialSearchResults";
import TrialResultCard from "./TrialResultCard";

function AllTrials(props) {
  const [trials, setTrials] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchData() {
      try {
        const allTrials = await Axios.get("/all-trials");
        if (allTrials.data) {
          setTrials(allTrials.data);
        } else {
          console.log("No Trial Data Found");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    return () => ourRequest.cancel();
  }, []);

  useEffect(() => {
    if (trials.length) {
      setLoading(false);
    }
  }, [trials]);

  if (isLoading) {
    return <LoadingDotsIcon />;
  }

  return (
    <Page title="All Trials" wide={true}>
      <h2 className="header--text">All Trials</h2>
      <div className="results-container shadow py-3">
        <TrialSearchResults>
          {trials.map((trial) => {
            return <TrialResultCard trial={trial} key={trial._id} />;
          })}
        </TrialSearchResults>
      </div>
    </Page>
  );
}

export default AllTrials;
