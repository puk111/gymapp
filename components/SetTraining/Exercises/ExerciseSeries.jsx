import React from "react";
import Tab from "../../UI/formUI/Tab";
import styled from "styled-components";
import { dfCener } from "../../../styles/style";
import { removeDuplicateObjects } from "../../../helpers/functions/removeDuplicates";
import { css } from "styled-components";
function ExerciseSeries({ onExerciseSeriesCounterChange, exercises, id }) {
  // console.log(exercises);

  const handleSeriesChange = (sign) => {
    if (sign === "+") {
      const obj = { id: exercises.seriesCounter, val: "0" };
      let arr = [...exercises.seriesObj, obj];
      const filltered = removeDuplicateObjects(arr, "id");

      onExerciseSeriesCounterChange(
        exercises.seriesCounter + 1,
        "+",
        id,
        filltered
      );
    } else if (sign === "-") {
      if (exercises.seriesCounter > 1) {
        onExerciseSeriesCounterChange(exercises.seriesCounter - 1, "-", id);
      }
    }
  };
  //   console.log(data.seriesCounter);
  return (
    // <Tab column={2}>
    //   <CenterEl>
    //     <BtnSeries onClick={() => handleSeriesChange("-")}>-</BtnSeries>
    //     {exercises?.seriesCounter}
    //     <BtnSeries onClick={() => handleSeriesChange("+")}>+</BtnSeries>
    //   </CenterEl>
    // </Tab>
    <Container>
      <BtnMinus onClick={() => handleSeriesChange("-")}>x</BtnMinus>
      <BtnPlus onClick={() => handleSeriesChange("+")}>+</BtnPlus>
    </Container>
  );
}

export default ExerciseSeries;

const btn = css`
  margin: 0 15px;
  width: 25px;
  height: 25px;
  /* border-radius: 50%; */
  border: 1px solid black;
  font-size: 18px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  color: white;
`;

const Container = styled.div`
  position: relative;
  min-height: 30px;
`;

const BtnPlus = styled.div`
  ${btn}
  border-radius: 50%;
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #40be40;
  border-color: #1a661a;
  &:hover {
    background-color: #1a661a;
  }
`;
const BtnMinus = styled.div`
  ${btn}
  position: absolute;
  right: 0px;
  top: -35px;
  background-color: #e02020ae;
  border-color: #9c0707ad;
  &:hover {
    background-color: #9c0707ad;
  }
`;

const CenterEl = styled.div`
  ${dfCener}
`;

const BtnSeries = styled.div`
  margin: 0 15px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid black;
  font-size: 18px;
  display: inline-block;
`;
