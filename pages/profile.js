// import { unstable_getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]";
import { getSession } from "next-auth/react";
import React from "react";
import UserProfile from "../components/profile/UserProfile";

function profile() {
  return <UserProfile />;
}

// export async function getServerSideProps(context) {
//   const session = await unstable_getServerSession(
//     context.req,
//     context.res,
//     authOptions
//   );
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: { session },
//   };
// }
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

export default profile;
