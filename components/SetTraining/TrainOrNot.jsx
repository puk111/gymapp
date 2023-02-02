import React from "react";
import Tab from "../UI/formUI/Tab";
import styled from "styled-components";
import { dfCener } from "../../styles/style";

function TrainOrNot({ onChangeRadio, radioVal }) {
  const radioChangeHandler = (val) => {
    onChangeRadio(val);
  };
  return (
    <Tab column={2}>
      <CenterEl>Zamierzasz trenować</CenterEl>
      <CenterEl>
        <input
          type="radio"
          value="Tak"
          id="1"
          onChange={() => radioChangeHandler("Tak")}
          checked={radioVal === "Tak"}
        />
        <RadioLabel htmlFor="1">Tak</RadioLabel>
        <input
          type="radio"
          value="Nie"
          id="2"
          onChange={() => radioChangeHandler("Nie")}
          checked={radioVal === "Nie"}
        />
        <RadioLabel htmlFor="2">Nie</RadioLabel>
      </CenterEl>
    </Tab>
  );
}

export default TrainOrNot;

const CenterEl = styled.div`
  ${dfCener}
  margin: 10px 0;
`;
const RadioLabel = styled.label`
  margin: 0 5px 0 2px;
`;
