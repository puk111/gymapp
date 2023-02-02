import AuthForm from "../components/FormAuth/AuthForm";
import styled from "styled-components";
import { GloablTitle } from "../styles/style";
// import { unstable_getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      console.log(session);
      if (session) {
        router.replace("/hero");
      } else {
        setIsLoading(false);
      }
    });
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <AuthForm />
    </>
  );
}
//nie dziala czemus xd
// export async function getServerSideProps(context) {
//   const session = await unstable_getServerSession(context.req, context.res);
//   if (session) {
//     return {
//       redirect: {
//         destination: "/hero",
//         permanent: false,
//       },
//     };
//   }
//   return { props: { session } };
// }
export default Home;

// const Title = styled.h2`
//   ${GloablTitle}
// `;
