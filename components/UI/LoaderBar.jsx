import React from "react";
import styled from "styled-components";
import Loader from "./Loader";

function LoaderBar({ status, message }) {
  return (
    <Container>
      {status === "pending" && <Loader />}
      {status === "success" && <SuccessMsg>{message}</SuccessMsg>}
      {status === "error" && <ErrorMsg>{message}</ErrorMsg>}
      {status === "" && ""}
    </Container>
  );
}

export default LoaderBar;

const Container = styled.div`
  width: 100%;
  height: 30px;
  text-align: center;
`;

const SuccessMsg = styled.p`
  color: green;
  font-size: 18px;
  font-weight: 600;
`;
const ErrorMsg = styled.p`
  color: black;
  font-size: 14px;
`;
