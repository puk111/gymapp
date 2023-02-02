import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Tab from "../UI/formUI/Tab";
import { dfCener } from "../../styles/style";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTimer } from "../../store/daily-slice";

function Stoper({ itemId }) {
  const { timeInSec, idTimer, idxEl, isRunning } = useSelector(
    (state) => state.dailyStoper
  );
  const dailyTreningProggresArr = useSelector(
    (state) => state.dailyTreningProggresArr
  );

  const min = dailyTreningProggresArr[itemId].time.min;
  const sec = dailyTreningProggresArr[itemId].time.sec;

  const dispatch = useDispatch();
  let intervalId;

  useEffect(() => {
    if (isRunning) {
      if (timeInSec > 0) {
        intervalId = setInterval(() => {
          dispatch(
            setCurrentTimer({
              timeInSec: timeInSec - 1,
              isRunning: true,
              idTimer: idTimer,
              idxEl: idxEl,
            })
          );
        }, 50);
      } else {
        clearInterval(intervalId);
        dispatch(setCurrentTimer({ isRunning: false }));
      }
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timeInSec]);

  const minutes = Math.floor(timeInSec / 60);
  const seconds = timeInSec % 60;

  return (
    <StoperContainer>
      {isRunning && itemId === idTimer ? (
        <CenterElTimer>
          <TimerCon>
            <Circle>
              <Dots></Dots>
              <svg>
                <circle cx="70" cy="70" r="70"></circle>
                <circle
                  style={{
                    strokeDashoffset:
                      440 - 440 * (timeInSec / (min * 60 + +sec)),
                  }}
                  cx="70"
                  cy="70"
                  r="70"
                  id="T"
                ></circle>
              </svg>
              <Time>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </Time>
            </Circle>
          </TimerCon>
        </CenterElTimer>
      ) : (
        <CenterElTimer>
          <TimerCon>
            <Circle>
              <Dots></Dots>
              <svg>
                <circle cx="70" cy="70" r="70"></circle>
                <circle cx="70" cy="70" r="70" id="T"></circle>
              </svg>
              <Time>
                {min}:{sec < 10 && sec !== "00" ? `0${sec}` : sec}
              </Time>
            </Circle>
          </TimerCon>
        </CenterElTimer>
      )}
    </StoperContainer>
  );
}

export default Stoper;

const TimerCon = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & div {
    position: absolute;
  }
`;

const Circle = styled.div`
  --clr: blue;
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    position: relative;
    width: 150px;
    height: 150px;
    transform: rotate(270deg);
    & circle {
      width: 100%;
      height: 100%;
      fill: transparent;
      stroke-width: 8;
      stroke: var(--secondary-font-color);
      transform: translate(5px, 5px);
      &:nth-child(2) {
        stroke: var(--clr);
        stroke-dasharray: 440;
        stroke-dashoffset: 440;
      }
    }
  }
`;
const Dots = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: -3px;

    width: 15px;
    height: 15px;
    background-color: var(--clr);
    border-radius: 50%;
    box-shadow: 0 0 20px var(--clr), 0 0 60px var(--clr);
  }
`;
const Time = styled.div``;
const CenterElTimer = styled.div`
  ${dfCener}
  position: relative;
  min-height: 200px;
`;

const StoperContainer = styled.div`
  width: 100%;
  margin: 5px;
`;
