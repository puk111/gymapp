import React, { useState } from "react";
import Tab from "../../UI/formUI/Tab";
import styled from "styled-components";
import { dfCener } from "../../../styles/style";

function ExerciseTitle({ onExerciseTitleChange, exercises, id }) {
  const handleInputChange = (value) => {
    onExerciseTitleChange(value, id);
  };

  return (
    <Container>
      <Tab column={2} border={false}>
        <CenterEl>Tytół</CenterEl>
        <Input
          type="text"
          onChange={(e) => handleInputChange(e.target.value)}
          required
          value={exercises?.title}
          placeholder="Tytół..."
        />
      </Tab>
    </Container>
  );
}

export default ExerciseTitle;

const CenterEl = styled.div`
  ${dfCener}
`;
const Input = styled.input`
  max-width: 180px;
  text-align: center;
  border: none;
  background-color: #f5f5f5;
  font-size: 18px;
  border-bottom: 2px solid var(--secondary-font-color);
  outline: none;
`;

const Container = styled.div`
  width: 100%;
  padding: 10px 0px;
`;
