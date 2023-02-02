import React from "react";
import Tab from "../../UI/formUI/Tab";
import styled from "styled-components";
import { dfCener } from "../../../styles/style";

function Time({ onExerciseTimeChange, exercises, id }) {
  const handleTimeChange = (e, val) => {
    if (val === "min") {
      const min = e.target.value;
      onExerciseTimeChange(min, val, id);
    } else if (val === "sec") {
      const sec = e.target.value;
      onExerciseTimeChange(sec, val, id);
    }
  };

  return (
    <Container>
      <Tab column={2} border={false}>
        <CenterEl>Przrwa miedzy seriami</CenterEl>
        <CenterEl>
          <InputCon>
            <Input
              type="number"
              required
              onChange={(e) => {
                handleTimeChange(e, "min");
              }}
              value={exercises?.time?.min}
            />
            <p>min</p>
          </InputCon>
          :
          <InputCon>
            <Input
              type="number"
              required
              onChange={(e) => {
                handleTimeChange(e, "sec");
              }}
              value={exercises?.time?.sec}
            />
            <p>sec</p>
          </InputCon>
        </CenterEl>
      </Tab>
    </Container>
  );
}

export default Time;

const Container = styled.div`
  width: 100%;
  padding: 10px 0px;
`;

const CenterEl = styled.div`
  ${dfCener}
`;

const Input = styled.input`
  max-width: 60px;
  height: 30px;
  padding: 0 10px;
  border: none;
  background-color: #f5f5f5;
  border-bottom: 3px solid var(--secondary-font-color);
  border-left: 2px solid var(--secondary-font-color);
  border-radius: 15%;
  outline: none;
`;
const InputCon = styled.div`
  position: relative;
  & p {
    position: absolute;
    top: -8px;
    left: 10px;
    font-size: 12px;
  }
`;
