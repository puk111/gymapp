import React from "react";
import Daily from "../../components/DailyTrening/Daily";
import { getSession } from "next-auth/react";

function index() {
  return <Daily />;
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
