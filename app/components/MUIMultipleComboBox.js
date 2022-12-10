import React from "react";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

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
  const theme = useTheme();

  let selectID = props.selectProps.id + "-select";
  let inputID = props.selectProps.id + "-label";

  return (
    <div>
      <FormControl sx={{ m: 1, mb: 4, display: "flex", bgcolor: "#f7f8f8", boxShadow: 1, borderRadius: 2 }}>
        <InputLabel id={selectID}>{props.selectProps.title}</InputLabel>
        <Select
          data-cy={props.dataCY}
          name={props.selectProps.title}
          labelId={inputID}
          id={selectID}
          onClose={(e) => props.onClose(e.target.id)}
          multiple
          value={props.selectProps.selectedData}
          onChange={(e) => props.onChange(e)}
          input={<OutlinedInput id="select-multiple-chip" label={props.selectProps.title} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip sx={{ bgcolor: "#ffcd00" }} key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.selectProps.data.map((term) => (
            <MenuItem key={term} value={term} style={getStyles(term, props.selectProps.selectedData, theme)}>
              {term}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
