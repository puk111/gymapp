import React from "react";
import { useState } from "react";
import Loader from "../UI/Loader";
import PasswordForm from "./userSettings/PasswordForm";
import styled from "styled-components";

function UserProfile() {
  const [requestStatus, setRquestStatus] = useState();

  const changePasswordHandler = async (passwordData) => {
    setRquestStatus("pending");
    const response = await fetch("/api/user/changePassword", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    if (data.ErrMessage) {
      setRquestStatus("error");
    } else {
      setRquestStatus("success");
    }
  };
  return (
    <section>
      {requestStatus === "pending" && <Loader />}
      {requestStatus === "success" && <SuccessMsg>zmieniono haslo</SuccessMsg>}
      {requestStatus === "error" && <ErrorMsg>error</ErrorMsg>}
      <div>
        <PasswordForm onChangePassword={changePasswordHandler} />
      </div>
    </section>
  );
}

export default UserProfile;

const SuccessMsg = styled.p`
  color: green;
  font-size: 18px;
  font-weight: 600;
`;
const ErrorMsg = styled.p`
  color: black;
  font-size: 14px;
`;
