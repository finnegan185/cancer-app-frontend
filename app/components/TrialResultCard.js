import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function BasicCard(props) {
  function formatArray(array) {
    if (array.length > 1) {
      return array.join(", ");
    }
    return array;
  }

  return (
    <Card data-cy={props.trial.trialNumber} sx={{ width: "300px", m: 1, background: "#f7f8f8" }} className="shadow">
      <CardContent sx={{ pb: 1, background: "#ffcd00" }}>
        <Typography variant="h6" component="div">
          Trial Number: {props.trial.trialNumber}
        </Typography>
      </CardContent>
      <CardContent sx={{ pt: ".5rem" }}>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Disease Type: {formatArray(props.trial.type)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Disease Stage: {formatArray(props.trial.stage)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Disease Mutation: {formatArray(props.trial.mutation)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Line of Therapy: {formatArray(props.trial.line)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Needs Measurable Disease: {props.trial.needsMeasurable}
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          Life Expectancy: {props.trial.expectancy}
        </Typography>
      </CardContent>
    </Card>
  );
}
