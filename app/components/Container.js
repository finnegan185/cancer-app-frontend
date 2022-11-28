import React, { useEffect } from "react";

function Container(props) {
  return (
    <div className="page-color">
      <div className={"container py-md-5 " + (props.wide ? "" : "container--narrow")}>{props.children}</div>
    </div>
  );
}

export default Container;
