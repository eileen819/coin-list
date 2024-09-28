import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IHeaderProps } from "../interface";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

// styled-components

const Wrapper = styled.header`
  max-width: 480px;
  margin: 10px auto 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HomeBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  padding: 7px;
  outline: none;
  color: ${(props) => props.theme.accentColor};
  cursor: pointer;
`;

const ModeTabs = styled.div<{ $isActive: boolean }>`
  position: relative;
  width: 55px;
  height: 30px;
  padding: 0px 5px;
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 20px;
  cursor: pointer;
`;

const ModeBtn = styled.div<{ $isActive: boolean }>`
  position: absolute;
  margin: 4px 5px;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.accentColor};
  transform: translateX(${(props) => (props.$isActive ? "115%" : "0px")});
  transition: transform 0.3s ease-in;
`;

const ModeSunIcon = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 5px;
  right: 4px;
  width: 18px;
  height: 18px;
  opacity: ${(props) => (props.$isActive ? 0 : 1)};
  visibility: ${(props) => (props.$isActive ? "hidden" : "visible")};
  transition: opacity 0.3s ease-in, visibility 0.5s ease-in;
`;

const ModeMoonIcon = styled(ModeSunIcon)`
  left: 4px;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  visibility: ${(props) => (props.$isActive ? "visible" : "hidden")};
`;

function Header() {
  const navigate = useNavigate();
  const onGoHome = () => {
    navigate("/");
  };
  const setIsDark = useSetRecoilState(isDarkAtom);
  const [toggle, setToggle] = useState(false);
  const onToggle = () => {
    setToggle((prev) => !prev);
    setIsDark((prev) => !prev);
  };

  return (
    <Wrapper>
      <HomeBtn onClick={onGoHome}>
        <svg
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </HomeBtn>

      <ModeTabs $isActive={toggle} onClick={onToggle}>
        <ModeBtn $isActive={toggle}></ModeBtn>
        <ModeMoonIcon $isActive={toggle}>
          <svg
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </ModeMoonIcon>
        <ModeSunIcon $isActive={toggle}>
          <svg
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        </ModeSunIcon>
      </ModeTabs>
    </Wrapper>
  );
}

export default Header;
