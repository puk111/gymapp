import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { dfCener } from "../../../styles/style";

function FromConteiner({ onSubmit, children, showBtn }) {
  return (
    <Cart onSubmit={onSubmit}>
      {children}
      <Footer>{showBtn && <Button>save</Button>}</Footer>
    </Cart>
  );
}

export default FromConteiner;

const Cart = styled.form`
  width: 100%;
  max-width: 500px;
  min-height: 100px;
  margin-top: 20px;
  background-color: #f5f5f5;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  border-radius: 15px;
`;

const Footer = styled.div`
  width: 100%;
  min-height: 30px;
  position: relative;
  bottom: 0;
  ${dfCener}
`;
