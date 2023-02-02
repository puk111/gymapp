import React from "react";
import styled from "styled-components";
import Button from "../../UI/Button";
import { Wrapper } from "../../../styles/style";
import { useRef } from "react";
import { validPassword } from "../../../helpers/functions/validators";
import { useState } from "react";

function PasswordForm({ onChangePassword }) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const [error, setError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const oldPasswordValue = oldPasswordRef.current.value;
    const newPasswordValue = newPasswordRef.current.value;
    //valid for client
    if (validPassword(newPasswordValue)) {
      setError(false);
    } else {
      setError(true);
      return;
    }
    onChangePassword({
      oldPassword: oldPasswordValue,
      newPassword: newPasswordValue,
    });
  };

  return (
    <Form onSubmit={submitHandler}>
      <Title>Ustawienia konta</Title>
      <Wrap>
        <Label htmlFor="oldPassword">Podaj stare haslo</Label>
        <Input type="password" id="oldPassword" required ref={oldPasswordRef} />
      </Wrap>
      <Wrap>
        <Label htmlFor="newPassword">Podaj nowe haslo</Label>
        <Input type="password" id="newPassword" required ref={newPasswordRef} />
      </Wrap>
      <Button type="Primary">Wyślij</Button>
    </Form>
  );
}

export default PasswordForm;

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
`;

const Title = styled.h1`
  font-size: 32px;
  margin: 20px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 3px 0px;
  font-size: 24px;
`;

const Input = styled.input`
  margin: 10px 0px;
  width: 250px;
  border-radius: 5px;
  outline: none;
  font-size: 24px;
  padding: 4px 12px;
`;

const Text = styled.p`
  margin: 12px 0px;
  font-size: 24px;
`;
