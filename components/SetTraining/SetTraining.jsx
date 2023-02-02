import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import days from "../../helpers/data/days";
import { useFetch } from "../../helpers/functions/useFetch";
import { disapearRequest, loadingActions } from "../../store/loading-slice";
import FromConteiner from "../UI/formUI/FromConteiner";
import ExercisesCard from "./Exercises/ExercisesCard";
import ExercisesCounter from "./ExercisesCounter";
import TrainingDay from "./TrainingDay";
import TrainOrNot from "./TrainOrNot";

function SetTraining() {
  const [day, setDay] = useState(0);
  const [radioVal, setRadioVal] = useState("Tak");
  const [exerciseCounter, setExerciseCounter] = useState(1);
  const [exercises, setExercises] = useState([
    {
      id: 0,
      title: "",
      seriesCounter: 1,
      seriesObj: [{ id: 0, val: "1" }],
      time: { min: "5", sec: "00" },
    },
  ]);
  const [responseMsg, setResponseMsg] = useState();
  const [trainingDayIsAllredySet, setTrainingDayIsAllredySet] = useState();

  const stateReq = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();
  const { trainingPlan, refetch } = useFetch(responseMsg);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let dataToSend = {
      day: days[day],
      active: radioVal,
      exerciseCounter: exerciseCounter,
      seriesArr: exercises,
    };

    if (!trainingDayIsAllredySet) {
      dispatch(loadingActions.loadingStatus({ status: "pending" }));
      const response = await fetch("api/user/addTrainDay", {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (res.ErrMessage) {
        dispatch(disapearRequest("error"));
      } else {
        dispatch(
          disapearRequest({ status: "success", message: "zapisano zmiany" })
        );
        setResponseMsg("zapisano zmiany");
        refetch({});
      }
    } else {
      dispatch(loadingActions.loadingStatus({ status: "pending" }));
      const response = await fetch("api/user/editTrainDay", {
        method: "PATCH",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      console.log(res);
      if (res.ErrMessage) {
        dispatch(disapearRequest("error"));
      } else {
        dispatch(
          disapearRequest({ status: "success", message: "zapisano zmiany" })
        );
        setResponseMsg("zapisano zmiany");
        refetch({});
      }
    }
  };

  const renderComponent = Array.from(
    { length: exerciseCounter },
    (_, index) => index
  );
  //nazwa nie funkcji mocno mylna handlerDayChange
  const handlerCounterChange = (newDay) => {
    setDay(newDay);
    resetState();
  };

  const handlerRadioChange = (radio) => {
    setRadioVal(radio);
    resetState();
  };

  const handlerExerciseCounterChange = (val, sign, obj) => {
    setExerciseCounter(val);
    if (sign === "+") {
      setExercises((prev) => {
        return [...prev, obj];
      });
    }
    if (sign === "-") {
      const newArr = exercises.slice(0, -1);
      setExercises([...newArr]);
    }
  };

  const handlerExerciseTitleChange = (title, id) => {
    setExercises((prev) =>
      prev.map((exercise) => {
        if (exercise.id === id) {
          exercise.title = title;
        }
        return exercise;
      })
    );
  };

  const handlerExerciseSeriesCounterChange = (val, sign, id, obj) => {
    if (sign === "+") {
      setExercises((prev) =>
        prev.map((exercise) => {
          if (exercise.id === id) {
            exercise.seriesCounter = val;
            exercise.seriesObj = obj;
          }
          return exercise;
        })
      );
    }
    if (sign === "-") {
      const newArr = exercises[id].seriesObj.slice(0, -1);
      setExercises((prev) =>
        prev.map((exercise) => {
          if (exercise.id === id) {
            exercise.seriesCounter = val;
            exercise.seriesObj = newArr;
          }
          return exercise;
        })
      );
    }
  };

  const handlerExerciseSeriesObjectChange = (obj, id) => {
    console.log(obj, id);
    setExercises((prev) =>
      prev.map((exercise) => {
        if (exercise.id === id) {
          exercise.seriesObj = obj;
        }
        return exercise;
      })
    );
  };
  const handlerTimeChange = (time, operand, id) => {
    if (operand === "min") {
      setExercises((prev) =>
        prev.map((exercise) => {
          if (exercise.id === id) {
            exercise.time.min = time;
          }
          return exercise;
        })
      );
    } else if (operand === "sec") {
      setExercises((prev) =>
        prev.map((exercise) => {
          if (exercise.id === id) {
            exercise.time.sec = time;
          }
          return exercise;
        })
      );
    }
  };

  const resetState = () => {
    setExerciseCounter(1);
    setExercises([
      {
        id: 0,
        title: "",
        seriesCounter: 1,
        seriesObj: [{ id: 0, val: "1" }],
        time: { min: "5", sec: "00" },
      },
    ]);
  };

  useEffect(() => {
    const obj = trainingPlan?.find((item) => item.day === days[day]);
    setTrainingDayIsAllredySet(obj);

    if (obj) {
      setDay(days.indexOf(obj.day));
      setRadioVal(obj.active);
      setExerciseCounter(obj.exerciseCounter);
      setExercises(obj.seriesArr);
    } else {
      resetState();
    }
  }, [day, stateReq]);

  return (
    <FromConteiner showBtn={true} onSubmit={onSubmitHandler}>
      <TrainingDay onChangeDay={handlerCounterChange} day={day} />
      <TrainOrNot onChangeRadio={handlerRadioChange} radioVal={radioVal} />
      {radioVal === "Tak" && (
        <ExercisesCounter
          onChangeExerciseCounter={handlerExerciseCounterChange}
          exerciseCounter={exerciseCounter}
        />
      )}

      {radioVal === "Tak" &&
        renderComponent.map((index) => (
          <ExercisesCard
            key={index}
            id={index}
            onExerciseTitleChange={handlerExerciseTitleChange}
            onExerciseSeriesCounterChange={handlerExerciseSeriesCounterChange}
            onExerciseSeriesObjectChange={handlerExerciseSeriesObjectChange}
            onExerciseTimeChange={handlerTimeChange}
            exercises={exercises}
          />
        ))}
    </FromConteiner>
  );
}

export default SetTraining;
