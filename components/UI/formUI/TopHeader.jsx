import React from "react";
import styled from "styled-components";
import { dfCener } from "../../../styles/style";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";

function TopHeader({ title, edit, onPrevDay, onNextDay }) {
  const leftHandler = () => {
    onPrevDay();
  };
  const rightHandler = () => {
    onNextDay();
  };
  return (
    <Header>
      {!edit && <Title>{title}</Title>}
      {edit && (
        <>
          <ArrowDiv onClick={leftHandler}>
            <FiChevronLeft />
          </ArrowDiv>
          <Title>{title}</Title>
          <ArrowDiv onClick={rightHandler}>
            <FiChevronRight />
          </ArrowDiv>
        </>
      )}
    </Header>
  );
}

export default TopHeader;

const Header = styled.div`
  ${dfCener}
`;

const Title = styled.h1`
  text-align: center;
  margin: 0 10px;
`;

const ArrowDiv = styled.div`
  ${dfCener}
  color: black;
  width: 30px;
  height: 30px;
  :hover {
    cursor: pointer;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;
