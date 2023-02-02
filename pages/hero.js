import React from "react";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import PostContainer from "../components/Posts/PostContainer";
import styled from "styled-components";

function hero() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    getSession().then((session) => {
      const { user } = session;
      setCurrentUser(user);
    });
  }, []);

  return (
    <Container>
      <h2>Witaj {currentUser?.name}! </h2>
      <p className="info">
        Aplikacja umożliwia utworzenie plany treningowego, oraz zapisywać
        postępy treningowe, rozwiń menu i spróbuj.{" "}
      </p>
      <p>Te artykuły wygenerowane przez AI mogą Cie zainteresować.</p>
      <PostContainer />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default hero;

const Container = styled.section`
  //color: var(--secondary-font-color);
  text-align: center;
  padding: 2rem 1rem;
  h2 {
    margin: 2rem 0;
  }
  p {
    &.info {
      margin-bottom: 1rem;
    }
  }
`;
