import React from "react";
import styled from "@emotion/styled";

function ViewMain({ item }) {
  return (
    <ViewMainWrap>
      <img className={"view-counter"} src={item.src} />
      <h1 className={"view-title"}>{item.name}</h1>
      <h2 className={"view-description"}>{item.desc}</h2>
    </ViewMainWrap>
  );
}

const ViewMainWrap = styled.div`
  & img {
    width: 600px;
    height: 600px;
  }
`;

export default ViewMain;
