import React from "react";
import { Box } from "@mui/material";

export default function TrialSearchResults(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {props.children}
    </Box>
  );
}
