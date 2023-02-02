import { useDispatch } from "react-redux";
import { loadingActions, disapearRequest } from "../../store/loading-slice";
import { useState, useEffect } from "react";

export function useFetch(msg) {
  const dispatch = useDispatch();
  const [trainingPlan, setTrainingPlan] = useState();
  const [shouldRefetch, refetch] = useState({});
  console.log(msg);
  useEffect(() => {
    dispatch(
      loadingActions.loadingStatus({
        status: "pending",
        message: "pobieranie danych",
      })
    );
    fetch("/api/user/getTrainDays")
      .then((response) => response.json())
      .then((data) => {
        setTrainingPlan(data.trainDays);
        //trzeba bedzie zmienic message w store
        if (msg) {
          dispatch(disapearRequest({ status: "success", message: msg }));
        } else {
          dispatch(
            disapearRequest({ status: "success", message: "pobrano dane" })
          );
        }
      });
  }, [shouldRefetch]);
  return { trainingPlan, refetch };
}
