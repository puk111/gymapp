import React, { useState } from "react";
import ExerciseSeries from "./ExerciseSeries";
import ExerciseTitle from "./ExerciseTitle";
import Series from "./Series";
import Time from "./Time";
import styled from "styled-components";

function ExercisesCard({
  onExerciseTitleChange,
  onExerciseSeriesCounterChange,
  onExerciseSeriesObjectChange,
  onExerciseTimeChange,
  exercises,
  id,
}) {
  const handleTitleChange = (newTitle, id) => {
    onExerciseTitleChange(newTitle, id);
  };
  const handleSeriesChange = (series, sign, id, obj) => {
    onExerciseSeriesCounterChange(series, sign, id, obj);
  };
  const handleSeriesObjectChange = (obj, id) => {
    onExerciseSeriesObjectChange(obj, id);
  };
  const handleTimeChange = (time, operand, id) => {
    onExerciseTimeChange(time, operand, id);
  };
  // console.log(id);
  return (
    <Card>
      <ExerciseTitle
        onExerciseTitleChange={handleTitleChange}
        exercises={exercises[id]}
        id={id}
      />
      <Time
        onExerciseTimeChange={handleTimeChange}
        exercises={exercises[id]}
        id={id}
      />
      <Series
        onExerciseSeriesObjectChange={handleSeriesObjectChange}
        exercises={exercises[id]}
        id={id}
      />
      <ExerciseSeries
        onExerciseSeriesCounterChange={handleSeriesChange}
        exercises={exercises[id]}
        id={id}
      />
    </Card>
  );
}

export default ExercisesCard;

const Card = styled.div`
  margin: 20px 0;
  padding: 15px;
  border: 2px solid var(--secondary-font-color);
  box-shadow: 2px 2px 5px var(--secondary-font-color);
  border-radius: 5px;
`;
