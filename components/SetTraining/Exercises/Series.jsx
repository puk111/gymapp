import React, { useState } from "react";
import Tab from "../../UI/formUI/Tab";
import styled from "styled-components";
import { dfCener } from "../../../styles/style";
import { removeDuplicateObjects } from "../../../helpers/functions/removeDuplicates";

function Series({ onExerciseSeriesObjectChange, exercises, id }) {
  const handleObjectChange = (i, e) => {
    const obj = { id: i, val: e.target.value };

    let arr = [...exercises.seriesObj, obj];

    const fill = removeDuplicateObjects(arr, "id");

    onExerciseSeriesObjectChange(fill, id);
  };
  let items = [];
  for (let i = 0; i < exercises?.seriesCounter; i++) {
    items.push(
      <Tab column={2} key={i}>
        <CenterEl>
          <p>seria {i + 1}</p>
        </CenterEl>
        <CenterEl>
          <InputSeries
            type="number"
            required
            onChange={(e) => {
              handleObjectChange(i, e);
            }}
            // value={
            //   //seriesObj?.find((item) => i === item.id)?.val
            //   //   seriesObjTest?.find((item) => i === item.id)?.val
            // }
            value={exercises.seriesObj?.find((item) => i === item.id)?.val}
          />
        </CenterEl>
      </Tab>
    );
  }

  return (
    <>
      <Tab column={2}>
        <CenterEl>
          <p>ilość serii</p>
        </CenterEl>
        <CenterEl>
          <p>ilość powtórzeń</p>
        </CenterEl>
      </Tab>
      {items}
    </>
  );
}

export default Series;

const CenterEl = styled.div`
  ${dfCener}
`;
const InputSeries = styled.input`
  /* max-width: 60px;
  height: 30px;
  padding: 0 5px; */

  max-width: 60px;
  height: 30px;
  padding: 0 10px;
  border: none;
  background-color: #f5f5f5;
  border: 2px solid var(--secondary-font-color);
  border-radius: 15%;
  outline: none;
`;
