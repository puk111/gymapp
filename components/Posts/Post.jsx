import React from "react";
import { useState } from "react";
import styled from "styled-components";

function Post({ title, text }) {
  const [show, setShow] = useState(false);
  return (
    <Card>
      <h2>{title}</h2>
      <Ptag show={show} className="cut-text">
        {text}
      </Ptag>
      <Btn onClick={() => setShow(!show)}>{show ? "zwiń" : "rozwiń"}</Btn>
    </Card>
  );
}

export default Post;

const Card = styled.article`
  margin: 2rem auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  color: black;
  background-color: #ccc;
  border-radius: 3rem;
  padding: 2rem 1.5rem;
  h2 {
    margin-bottom: 0.5rem;
  }
`;
const Ptag = styled.p`
  &.cut-text {
    --max-lines: 4;
    --line-height: 1.8;
    line-height: var(--line-height);
    overflow: hidden;
    position: relative;
    max-height: ${(props) =>
      props.show === false
        ? "calc(var(--max-lines) * 1em * var(--line-height))"
        : "none"};
  }
`;

const Btn = styled.button`
  padding: 0.4rem 1.8rem;
  border-radius: 0.5rem;
  border: none;
  transition: all 0.5s ease;
  &:hover {
    background-color: var(--secondary-font-color);
    transform: scale(1.1);
  }
`;
