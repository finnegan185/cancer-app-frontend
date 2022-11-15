import React from "react";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useImmer } from "use-immer";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(term, selectedData, theme) {
  return {
    fontWeight: selectedData.indexOf(term) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function MUIMultipleComboBox(props) {
  const [state, setState] = useImmer({
    title: props.selectProps.title,
    multiSelectData: props.selectProps.multiSelectData,
    selectedData: props.selectProps.selectedData,
  });

  const theme = useTheme();

  function handleSelectedChange(e) {
    props.onChange(e, state.title);
  }
  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setState((draft) => {
  //     if (typeof value === "string") {
  //       draft.selectedData = value.split(",");
  //     } else {
  //       draft.selectedData = value;
  //     }
  //   });
  // };

  return (
    <div>
      <FormControl sx={{ m: 1, my: 4, display: "flex", bgcolor: "#f7f8f8", boxShadow: 1, borderRadius: 2 }}>
        <InputLabel id="demo-multiple-chip-label">{state.title}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={state.selectedData}
          onChange={handleSelectedChange}
          input={<OutlinedInput id="select-multiple-chip" label={state.title} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip sx={{ bgcolor: "#ffcd00" }} key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {state.multiSelectData.map((term) => (
            <MenuItem key={term} value={term} style={getStyles(term, state.selectedData, theme)}>
              {term}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
