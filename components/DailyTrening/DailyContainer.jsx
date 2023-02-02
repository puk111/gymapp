import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FromConteiner from "../UI/formUI/FromConteiner";
import TopHeader from "../UI/formUI/TopHeader";
import ExerciseCard from "./ExerciseCard";
import { useFetch } from "../../helpers/functions/useFetch";
import { disapearRequest, loadingActions } from "../../store/loading-slice";
import { useState } from "react";
import { afterSendData } from "../../store/daily-slice";

function DailyContainer() {
  const { day, active, exerciseCounter } = useSelector((state) => state.daily);

  const dailyTreningProgressArr = useSelector(
    (state) => state.dailyTreningProggresArr
  );

  const dispatch = useDispatch();
  const [responseMsg, setResponseMsg] = useState();
  const { trainingPlan, refetch } = useFetch(responseMsg);
  const stateReq = useSelector((state) => state.loading.loading);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const arrToSend = dailyTreningProgressArr.map((item) => {
      //przygotowanie odpowiedniego objektu do wysłania nadpisanie wczeszniejszego treningu tym zrobionym
      const { progressObj } = item;
      const helperobj = { ...item, seriesObj: progressObj };
      delete helperobj.progressObj;
      return helperobj;
    });
    const sendObj = {
      day,
      progressArr: arrToSend,
    };

    dispatch(loadingActions.loadingStatus({ status: "pending" }));
    const response = await fetch("/api/user/addProgress", {
      method: "PATCH",
      body: JSON.stringify(sendObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();

    if (res.MessageErr) {
      dispatch(disapearRequest("error"));
    } else {
      dispatch(
        disapearRequest({ status: "success", message: "zapisano zmiany" })
      );
      setResponseMsg("zapisano zmiany");
      refetch({});
      dispatch(afterSendData(arrToSend));
    }
  };

  const flag = dailyTreningProgressArr.map((item) => {
    const allFinished = item.seriesObj.every((obj) =>
      obj.hasOwnProperty("finished")
    );
    if (!allFinished) {
      return false;
    } else {
      return true;
    }
  });
  const finishedAllTask = flag.every((value) => value === true);

  if (active === "") {
    return (
      <FromConteiner>
        <TopHeader title="Nie usataliłeś treningu" edit={false} />
      </FromConteiner>
    );
  }

  if (active === "Nie") {
    return (
      <FromConteiner>
        <TopHeader title="Dzień przerwy" edit={false} />
      </FromConteiner>
    );
  }
  return (
    <FromConteiner onSubmit={onSubmitHandler} showBtn={finishedAllTask}>
      <TopHeader title={day} edit={false} />
      {dailyTreningProgressArr.map((item) => (
        <ExerciseCard
          key={item.id}
          itemId={item.id}
          title={item.title}
          seriesCounter={item.seriesCounter}
          seriesObj={item.seriesObj}
          time={item.time}
        />
      ))}
    </FromConteiner>
  );
}

export default DailyContainer;
