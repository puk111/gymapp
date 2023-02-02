import React from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { keyframes, css } from "styled-components";
import { createUser } from "../../helpers/db/createUser";
import { Wrapper } from "../../styles/style";
import Button from "../UI/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {
  validEmail,
  validPassword,
  namaValid,
} from "../../helpers/functions/validators";

function AuthForm() {
  const [logIn, setLogIn] = useState(true);
  const router = useRouter();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const password2InputRef = useRef();
  const nameInputRef = useRef();

  const [errorsCreateUser, setErrorsCreateUser] = useState({
    emailValid: false,
    passwordWalid: false,
    samePassword: false,
    name: false,
  });

  const [requestStatus, setRquestStatus] = useState();

  const [serverLoginError, setServerLoginError] = useState({
    hasError: false,
    msg: null,
  });

  //validacja for userEXPERIENCE CZY JAKOS TAK

  const submitHandler = async (e) => {
    e.preventDefault();
    const emailInputValue = emailInputRef.current.value;
    const passwordInputValue = passwordInputRef.current.value;

    if (logIn) {
      setRquestStatus("pending");
      const result = await signIn("credentials", {
        redirect: false,
        email: emailInputValue,
        password: passwordInputValue,
      });
      //const data = await result.json();
      console.log(result);
      //inny warunek
      if (result.ok === false) {
        setRquestStatus("error");
        setServerLoginError({ hasError: true, msg: result.error });
      }
      if (result.ok === true) {
        setRquestStatus("success");
        setServerLoginError({ hasError: false, msg: null });
        router.replace("/hero");
      }
    } else {
      const password2InputValue = password2InputRef.current.value;
      const nameInputValue = nameInputRef.current.value;

      //validacja maile

      if (validEmail(emailInputValue)) {
        setErrorsCreateUser((prev) => {
          return {
            ...prev,
            emailValid: false,
          };
        });
      } else {
        setErrorsCreateUser((prev) => {
          return {
            ...prev,
            emailValid: true,
          };
        });
        return;
      }

      //validacja sliły hasla
      if (validPassword(passwordInputValue)) {
        setErrorsCreateUser((prev) => {
          return {
            ...prev,
            passwordWalid: false,
          };
        });
      } else {
        setErrorsCreateUser((prev) => {
          return {
            ...prev,
            passwordWalid: true,
          };
        });
        return;
      }

      //sprawdznie czy hasla sa te same
      if (password2InputValue === passwordInputValue) {
        setErrorsCreateUser((prev) => {
          return {
            ...prev,
            samePassword: false,
          };
        });
      } else {
        setErrorsCreateUser((prev) => {
          return {
            ...prev,
            samePassword: true,
          };
        });
        return;
      }

      if (namaValid(nameInputValue)) {
        setErrorsCreateUser((prev) => {
          return {
            ...prev,
            name: false,
          };
        });
      } else {
        setErrorsCreateUser((prev) => {
          return {
            ...prev,
            name: true,
          };
        });
        return;
      }

      try {
        setRquestStatus("pending");
        setServerLoginError({ hasError: false, msg: null });
        const result = await createUser(
          emailInputValue,
          passwordInputValue,
          password2InputValue,
          nameInputValue
        );
        setRquestStatus("success");
        // const data = await result.json();
        console.log(result);
      } catch (error) {
        setRquestStatus("error");
        setServerLoginError({ hasError: true, msg: error.message });
        console.log(error, error.message);
      }
    }
  };

  const changeFormHandler = () => {
    setLogIn(!logIn);
    setRquestStatus(null);
    setServerLoginError({ hasError: false, msg: null });
    setErrorsCreateUser({
      emailValid: false,
      passwordWalid: false,
      samePassword: false,
      name: false,
    });
  };

  return (
    <Form onSubmit={submitHandler} requestStatus={requestStatus}>
      {requestStatus === "pending" && <Loader></Loader>}
      {requestStatus === "success" && !logIn && (
        <SuccessMsg>Utworzyłeś konto ! zaloguj się na nie</SuccessMsg>
      )}

      <Title>{logIn ? "Zaloguj się" : "Utwórz konto"}</Title>
      <Wrap>
        <Label htmlFor="email">Podaj adres email</Label>
        <Input type="email" id="email" required ref={emailInputRef} />
        {errorsCreateUser.emailValid && !logIn ? (
          <Error>
            <ErrorMsg>podaj poprawny emails</ErrorMsg>
          </Error>
        ) : (
          <></>
        )}
      </Wrap>
      <Wrap>
        <Label htmlFor="password">Podaj hasło</Label>
        <Input type="password" id="password" required ref={passwordInputRef} />
        {errorsCreateUser.passwordWalid && !logIn ? (
          <Error>
            <ErrorMsg>Minimum 5 characters,Capital letter,One nubmer</ErrorMsg>
          </Error>
        ) : (
          <></>
        )}
      </Wrap>
      {logIn ? (
        ""
      ) : (
        <>
          <Wrap>
            <Label htmlFor="password2">Powtórz hasło</Label>
            <Input
              type="password"
              id="password2"
              required
              ref={password2InputRef}
            />
            {errorsCreateUser.samePassword && (
              <Error>
                <ErrorMsg>Hasla sa inee</ErrorMsg>
              </Error>
            )}
          </Wrap>
          <Wrap>
            <Label htmlFor="name">Podaj imię</Label>
            <Input type="text" id="name" required ref={nameInputRef} />
            {errorsCreateUser.name && (
              <Error>
                <ErrorMsg>nick wymaga min 4 liter,bez cyfr </ErrorMsg>
              </Error>
            )}
          </Wrap>
        </>
      )}
      {serverLoginError.hasError && (
        <Error>
          <ErrorMsg>{serverLoginError.msg}</ErrorMsg>
        </Error>
      )}
      <Button type="Primary">
        <Text>{logIn ? "Zaloguj się" : "Utwórz konto"}</Text>
      </Button>
      <div>
        <BtnText>
          {logIn ? "Nie posiadasz konta ?" : "Posiadasz już konto ?"}
        </BtnText>
      </div>
      <Button onClick={changeFormHandler}>
        <BtnText requestStatus={requestStatus}>
          {" "}
          {logIn ? "Utwórz je" : "Zaloguj się na nie"}
        </BtnText>
      </Button>
    </Form>
  );
}

export default AuthForm;

const loading = keyframes`
0% {
    background-position:0 0;
  }
  100% {
    background-position:500% 0;
  }
`;

const Loader = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  background-color: #fff;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      #0000ff,
      #00ff00,
      #24248b,
      #124e12,
      #0000ff,
      #00ff00,
      #24248b,
      #124e12,
      #0000ff
    );
    animation: ${loading} 15s linear infinite;
    background-size: 500%;
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      #0000ff,
      #00ff00,
      #24248b,
      #124e12,
      #0000ff,
      #00ff00,
      #24248b,
      #124e12,
      #0000ff
    );
    animation: ${loading} 15s linear infinite;
    background-size: 500%;
    filter: blur(20px);
  }
`;

const Form = styled.form`
  ${Wrapper}
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--secondary-bg-color);
  border-color: ${(props) =>
    props.requestStatus === "error"
      ? "red"
      : props.requestStatus === "success"
      ? "green"
      : ""};
`;

const Title = styled.h1`
  font-size: 28px;
  margin: 20px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 3px 0px;
  font-size: 18px;
`;

const Input = styled.input`
  margin: 15px auto;
  width: 250px;
  border-radius: 5px;
  outline: none;
  font-size: 18px;
  padding: 4px 12px;
`;

const Text = styled.p`
  margin: 12px 0px;
  font-size: 24px;
`;

const BtnText = styled.p`
  margin: 2px 2px;
  font-size: 18px;
  color: ${(props) => (props.requestStatus === "success" ? "green" : "")};
`;

const Error = styled.div`
  width: 100%;
  padding: 5px 0;
`;

const ErrorMsg = styled.p`
  color: black;
  font-size: 14px;
`;

const SuccessMsg = styled.p`
  color: green;
  font-size: 18px;
  font-weight: 600;
`;
