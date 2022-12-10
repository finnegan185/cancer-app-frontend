import React, { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

function SearchInfoIcon() {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "info-popover" : undefined;

  return (
    <div>
      <InfoIcon data-cy="find-trials-tooltip-icon" className="mt-1" aria-describedby={id} onClick={handleClick} color="info"></InfoIcon>
      <Popover
        data-cy="find-trials-tooltip-text"
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          Dropdown menus are only populated with inclusion criteria from site's current trials. <br />
          If the criteria is not listed, leave dropdown blank or select "Not Listed."
        </Typography>
      </Popover>
    </div>
  );
}

export default SearchInfoIcon;
