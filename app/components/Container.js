import React, { useEffect } from "react";

function Container(props) {
  return (
    <div className="page-color">
      <div className="container-sm container--narrow py-md-5">{props.children}</div>
    </div>
  );
}

export default Container;
