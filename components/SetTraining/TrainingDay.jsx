import React, { useState } from "react";
import TopHeader from "../UI/formUI/TopHeader";
import days from "../../helpers/data/days";
import styled from "styled-components";

function TrainingDay({ onChangeDay, day }) {
  const handleDayChange = (operation) => {
    if (operation === "next") {
      if (day === 6) {
        onChangeDay(-1);
      }
      onChangeDay((prev) => prev + 1);
    } else if (operation === "prev") {
      if (day === 0) {
        onChangeDay(7);
      }
      onChangeDay((prev) => prev - 1);
    }
  };

  return (
    <Con>
      <TopHeader
        title={days[day]}
        edit={true}
        onPrevDay={() => handleDayChange("prev")}
        onNextDay={() => handleDayChange("next")}
      />
    </Con>
  );
}

export default TrainingDay;

const Con = styled.div`
  margin: 15px 0;
`;
