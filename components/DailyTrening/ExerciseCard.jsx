import React from "react";
import styled from "styled-components";
import Tab from "../UI/formUI/Tab";
import { dfCener } from "../../styles/style";
import ExerciseSeries from "./ExerciseSeries";
import Stoper from "./Stoper";

function ExerciseCard({ title, seriesCounter, seriesObj, time, itemId }) {
  return (
    <Card>
      <Tab border={false}>
        <h2>{title}</h2>
      </Tab>
      <Tab column={3}>
        <CenterEl>
          <p>Serie</p>
        </CenterEl>
        <CenterEl>
          <p>Ostatnio</p>
        </CenterEl>
        <CenterEl>
          <p>Dzis</p>
        </CenterEl>
      </Tab>
      {seriesObj.map((obj, idx) => {
        return <ExerciseSeries key={idx} obj={obj} idx={idx} itemId={itemId} />;
      })}
      <Stoper itemId={itemId} />
    </Card>
  );
}

export default ExerciseCard;
const Card = styled.div`
  margin: 20px;
  padding: 15px;
  border: 2px solid var(--secondary-font-color);
  box-shadow: 2px 2px 5px var(--secondary-font-color);
  border-radius: 5px;
`;
const CenterEl = styled.div`
  ${dfCener}
`;
