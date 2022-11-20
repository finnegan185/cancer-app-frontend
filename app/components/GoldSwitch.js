import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { FormControl, Switch } from "@mui/material";

const GoldSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#ffcd00",
    "&:hover": {
      backgroundColor: alpha("#ffcd00", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#ffcd00",
  },
}));

export default function TheSwitch(props) {
  const label = { inputProps: { "aria-label": "measurable disease switch", label: "need measurable disease" } };

  return <GoldSwitch {...label} onChange={() => props.onChange()} />;
}
