import React from "react";
import SetTraining from "../../components/SetTraining/SetTraining";
import { getSession } from "next-auth/react";

function index() {
  return <SetTraining />;
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

export default index;
