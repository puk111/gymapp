import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LoaderBar from "../UI/LoaderBar";
import MainNav from "./MainNav";

function Layout({ children }) {
  const stateReq = useSelector((state) => state.loading.loading);
  return (
    <>
      <MainNav />
      <LoaderBar status={stateReq?.status} message={stateReq?.message} />
      <Main>{children}</Main>
    </>
  );
}

export default Layout;

const Main = styled.main`
  padding: 30px 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
