import React from "react";
import styled from "styled-components";

function Tab({ children, column, border }) {
  return (
    <Con col={column} b={border}>
      {children}
    </Con>
  );
}

export default Tab;

const Con = styled.div`
  width: 100%;
  border-bottom: ${(props) =>
    props.b === false ? "" : "2px solid var(--secondary-font-color)"};
  display: grid;
  padding: 5px 0;
  text-align: center;
  grid-template-columns: ${(props) =>
    props.col === 2 ? "2fr 2fr" : props.col === 3 ? "1fr 1fr 1fr" : "1fr"};
`;
