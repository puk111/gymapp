import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useFetch } from "../../helpers/functions/useFetch";
import days from "../../helpers/data/days";
import { disapearRequest, loadingActions } from "../../store/loading-slice";
import {
  setSoftData,
  setTrainingProggresArrStore,
} from "../../store/daily-slice";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FromConteiner from "../UI/formUI/FromConteiner";
import TopHeader from "../UI/formUI/TopHeader";
import Tab from "../UI/formUI/Tab";
import styled from "styled-components";
import { dfCener } from "../../styles/style";
import { removeDuplicateObjects } from "../../helpers/functions/removeDuplicates";
import DailyContainer from "./DailyContainer";

function Daily() {
  const [responseMsg, setResponseMsg] = useState();

  const dataProcessed = useRef(false);

  const { trainingPlan, refetch } = useFetch(responseMsg);
  const dispatch = useDispatch();

  useEffect(() => {
    if (trainingPlan && !dataProcessed.current) {
      console.log("yo");
      findTrainingDay();
      dataProcessed.current = true;
    }
  }, [trainingPlan, dataProcessed]);

  const findTrainingDay = () => {
    const d = new Date().getDay();
    let currentDay;
    if (d == 0) {
      currentDay = days[6];
    } else {
      currentDay = days[d - 1];
    }
    const goodDay = trainingPlan.find((item) => item.day === currentDay);
    if (goodDay) {
      dispatch(
        setSoftData({
          day: goodDay.day,
          active: goodDay.active,
          exerciseCounter: goodDay.exerciseCounter,
        })
      );
      const deepCopy = JSON.parse(JSON.stringify(goodDay.seriesArr));
      dispatch(setTrainingProggresArrStore(deepCopy));
    }
  };

  return <DailyContainer />;
}

export default Daily;
