import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

function Loader() {
  return <LoaderD></LoaderD>;
}

export default Loader;
const loading = keyframes`
0% {
    background-position:0 0;
  }
  100% {
    background-position:500% 0;
  }
`;
const LoaderD = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  background-color: #fff;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      #0000ff,
      #00ff00,
      #24248b,
      #124e12,
      #0000ff,
      #00ff00,
      #24248b,
      #124e12,
      #0000ff
    );
    animation: ${loading} 15s linear infinite;
    background-size: 500%;
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      #0000ff,
      #00ff00,
      #24248b,
      #124e12,
      #0000ff,
      #00ff00,
      #24248b,
      #124e12,
      #0000ff
    );
    animation: ${loading} 15s linear infinite;
    background-size: 500%;
    filter: blur(20px);
  }
`;
