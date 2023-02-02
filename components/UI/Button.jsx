import React from "react";
import styled from "styled-components";

function Button({ onClick, children, type }) {
  return (
    <Btn onClick={onClick} type={type}>
      {children}
    </Btn>
  );
}

export default Button;

const Btn = styled.button`
  border: 2px solid var(--secondary-font-color);
  border: ${(props) =>
    props.type === "Primary"
      ? "3px solid var(--secondary-font-color)"
      : "3px solid black"};
  border-radius: 10px;
  margin: 10px 0;
  outline: none;
  padding: 10px 20px;
  font-size: 22px;
  color: ${(props) =>
    props.type === "Primary" ? "var(--secondary-font-color)" : "black"};
`;
