import React, { useEffect } from "react";
import Container from "./Container";

function Page(props) {
  useEffect(() => {
    try {
      document.title = `${props.title} | University of Zack`;
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  }, [props.title]);

  return <Container wide={props.wide}>{props.children}</Container>;
}

export default Page;
