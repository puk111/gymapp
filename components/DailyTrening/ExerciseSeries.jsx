import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  setCurrentTimer,
  setProggressStore,
  onFinishedExercise,
} from "../../store/daily-slice";
import { dfCener } from "../../styles/style";

function ExerciseSeries({ obj, idx, itemId }) {
  const dispatch = useDispatch();

  const dailyTreningProgressArr = useSelector(
    (state) => state.dailyTreningProggresArr
  );

  const changeSeriesHandler = (id, e, idx) => {
    const obj = { id: idx, val: e.target.value };
    dispatch(setProggressStore({ id: id, obj: obj }));
  };

  const clockStart = (min, sec, idTimer, idxEl) => {
    const timeInSec = +min * 60 + +sec;
    dispatch(setCurrentTimer({ timeInSec, idTimer, idxEl, isRunning: true }));
  };

  const finishedTask = (itemId, idx) => {
    dispatch(onFinishedExercise({ id: itemId, elId: idx }));
  };

  return (
    <El
      key={idx}
      style={{
        backgroundColor: obj?.finished ? "green" : "",
      }}
    >
      <CenterEl>
        <p>{obj.id + 1}</p>
      </CenterEl>
      <CenterEl>
        <p>{obj.val}</p>
      </CenterEl>
      <CenterEl>
        <InputSeries
          type="number"
          required
          onChange={(e) => {
            changeSeriesHandler(itemId, e, idx);
          }}
          value={
            dailyTreningProgressArr[itemId]?.progressObj?.find(
              (o) => o.id === idx
            )?.val
          }
        />
        {obj?.finished ? (
          <SuccesText>zrobione</SuccesText>
        ) : (
          <TimerBtn
            type="button"
            onClick={() => {
              clockStart(
                dailyTreningProgressArr[itemId].time.min,
                dailyTreningProgressArr[itemId].time.sec,
                itemId,
                idx
              );
              finishedTask(itemId, idx);
            }}
          >
            Przerwa
          </TimerBtn>
        )}
      </CenterEl>
    </El>
  );
}

export default ExerciseSeries;

const El = styled.div`
  width: 100%;
  border-bottom: 2px solid var(--secondary-font-color);
  display: grid;
  padding: 5px 0;
  text-align: center;
  grid-template-columns: 1fr 1fr 1fr;
`;

const InputSeries = styled.input`
  max-width: 60px;
  height: 30px;
  padding: 0 10px;
  border: none;
  background-color: #f5f5f5;
  border: 2px solid var(--secondary-font-color);
  border-radius: 15%;
  outline: none;
`;

const CenterEl = styled.div`
  ${dfCener}
`;
const TimerBtn = styled.button`
  margin: 5px 10px;
  width: 80px;
  height: 30px;
  border: none;
  background-color: #f5f5f5;
  border: 2px solid var(--secondary-font-color);
  border-radius: 15%;
  outline: none;
  cursor: pointer;
  &:hover {
    scale: 1.2;
  }
`;

const SuccesText = styled.p`
  margin: 5px 10px;
  width: 80px;
`;
