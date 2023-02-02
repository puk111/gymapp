import React from "react";
import Tab from "../UI/formUI/Tab";
import styled from "styled-components";
import { dfCener } from "../../styles/style";
import { css } from "styled-components";

function ExercisesCounter({ onChangeExerciseCounter, exerciseCounter }) {
  const handleExerciseChange = (sign) => {
    if (sign === "+") {
      const obj = {
        id: exerciseCounter,
        title: "",
        seriesCounter: 1,
        seriesObj: [{ id: 0, val: "1" }],
        time: { min: "5", sec: "00" },
      };
      // let arr = [...exercises.seriesObj, obj];
      // const filltered = removeDuplicateObjects(arr, "id");
      onChangeExerciseCounter((prev) => prev + 1, sign, obj);
    } else if (sign === "-") {
      if (exerciseCounter > 1) {
        onChangeExerciseCounter((prev) => prev - 1, sign);
      }
    }
  };
  return (
    <Tab column={2}>
      <CenterEl>Dodaj lub usuń ćwiczenie</CenterEl>
      <CenterEl>
        <BtnMinus onClick={() => handleExerciseChange("-")}>-</BtnMinus>
        {exerciseCounter}
        <BtnPlus onClick={() => handleExerciseChange("+")}>+</BtnPlus>
      </CenterEl>
    </Tab>
  );
}

export default ExercisesCounter;
const btn = css`
  margin: 0 15px;
  width: 25px;
  height: 25px;
  border: 1px solid black;
  font-size: 18px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  color: white;
`;

const CenterEl = styled.div`
  ${dfCener}
  margin: 10px 0;
`;

const BtnPlus = styled.div`
  ${btn}
  border-radius: 50%;
  background-color: #40be40;
  border-color: #1a661a;
  &:hover {
    background-color: #1a661a;
  }
`;
const BtnMinus = styled.div`
  ${btn}
  background-color: #e02020ae;
  border-color: #9c0707ad;
  &:hover {
    background-color: #9c0707ad;
  }
`;
