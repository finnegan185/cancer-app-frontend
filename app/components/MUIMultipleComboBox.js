import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useImmer } from "use-immer";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import LoadingDotsIcon from "./LoadingDotsIcon";

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
  const [data, setData] = useImmer({
    isLoading: true,
    multiSelectItems: [],
    selectedData: [],
  });

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchData() {
      try {
        const response = await Axios.post("/competing-search", { field: props.title });
        if (!response.data) {
        } else {
          setData((draft) => {
            draft.isLoading = false;
            draft.multiSelectItems = response.data;
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    return () => ourRequest.cancel();
  }, []);

  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setData((draft) => {
      if (typeof value === "string") {
        draft.selectedData = value.split(",");
      } else {
        draft.selectedData = value;
      }
    });
  };

  if (data.isLoading) {
    return <LoadingDotsIcon />;
  }

  return (
    <div>
      <FormControl sx={{ m: 1, my: 4, display: "flex", bgcolor: "#f7f8f8", boxShadow: 1, borderRadius: 2 }}>
        <InputLabel id="demo-multiple-chip-label">{props.title}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={data.selectedData}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={props.title} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip sx={{ bgcolor: "#ffcd00" }} key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.multiSelectItems.map((term) => (
            <MenuItem key={term} value={term} style={getStyles(term, data.selectedData, theme)}>
              {term}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
