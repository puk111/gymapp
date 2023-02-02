import Link from "next/link";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import { css } from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const logoutHandler = async () => {
    await signOut();
  };

  return (
    <header>
      <Nav>
        <Logo>GyM</Logo>

        {!isMenuOpen && session && (
          <Hamburger onClick={() => setIsMenuOpen(true)}>
            <GiHamburgerMenu />
          </Hamburger>
        )}

        {session ? (
          <NavWhite className={isMenuOpen && "visible"}>
            <NavBlue className={isMenuOpen && "visible"}>
              <NavBlack className={isMenuOpen && "visible"}>
                <Close onClick={() => setIsMenuOpen(false)}>
                  <MdClose />
                </Close>
                <Ul onClick={() => setIsMenuOpen(false)}>
                  <li>
                    <Link href="/hero">Hero</Link>
                  </li>
                  <li>
                    <Link href="/trening-dayli">Trening na dziś</Link>
                  </li>
                  <li>
                    <Link href="/set-training">Ułuż plan treningowy</Link>
                  </li>
                  <li>
                    <Link href="/profile">Mój profil</Link>
                  </li>
                  <li>
                    <p onClick={logoutHandler}>Wyloguj</p>
                  </li>
                </Ul>
              </NavBlack>
            </NavBlue>
          </NavWhite>
        ) : (
          <></>
        )}
      </Nav>
    </header>
  );
}

export default MainNav;

const Logo = styled.h1`
  width: 200px;
  text-align: center;
  font-size: 32px;
  letter-spacing: 5px;
`;

const Nav = styled.nav`
  height: 80px;
  background-color: var(--secondary-bg-color);
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const btn = css`
  border: none;
  background-color: transparent;
  font-size: 32px;
  cursor: pointer;
  svg {
    fill: white;
    &:hover {
      fill: var(--secondary-font-color);
    }
  }
`;

const nav = css`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 100;
  &.visible {
    transform: translateX(0);
  }
`;
const Hamburger = styled.button`
  ${btn};
  position: fixed;
  top: 20px;
  right: 20px;
`;

const NavWhite = styled.div`
  ${nav};
  background-color: var(--main-font-color);
  width: 60%;
  max-width: 480px;
  min-width: 320px;
  transition-delay: 0.5s;
  &.visible {
    transition-delay: 0s;
  }
`;
const NavBlue = styled.div`
  ${nav};
  background-color: var(--secondary-font-color);
  width: 98%;
  transition-delay: 0.2s;
  &.visible {
    transition-delay: 0.2s;
  }
`;
const NavBlack = styled.div`
  ${nav};
  background-color: var(--main-bg-color);
  width: 98%;
  padding: 40px;
  transition-delay: 0s;
  &.visible {
    transition-delay: 0.4s;
  }
`;

const Close = styled.button`
  ${btn};
  position: fixed;
  top: 20px;
  right: 30px;
`;

const Ul = styled.ul`
  margin-top: 100px;
  li {
    list-style-type: none;
    margin: 20px 0;
    text-align: right;
    a,
    p {
      color: var(--main-font-color);
      text-decoration: none;
      cursor: pointer;
      &:hover {
        color: var(--secondary-font-color);
      }
    }
  }
`;
