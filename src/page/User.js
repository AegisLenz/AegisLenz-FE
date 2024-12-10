import { useLocation } from "react-router-dom";
import SideBar from "../component/sidebar/SideBar";
import TopBar from "../component/topbar/TopBar";
import LoginForm from "../component/User/Login";
import SignForm from "../component/User/SignIn";
import * as S from "./pagestyle/User_style";
import { useState, useEffect } from "react";

const User = () => {
  const location = useLocation(); // useLocation을 사용하여 state를 받음
  const [Sign, setSign] = useState(location.state.Sign || false);

  useEffect(() => {
    setSign(location.state.Sign);
  }, [location.state.Sign]);

  const setSignIn = () => {
    setSign(true);
  };
  const unsetSignIn = () => {
    setSign(false);
  };

  return (
    <>
      <TopBar />
      <SideBar />
      <S.Wrapper>
        <S.ContentDiv Sign={Sign}>
          <S.CloudIcon />
          <h1>AegisLenz</h1>
          <div></div>
          <p>{`We are AegisLenz\n\nWe do our best to detect and protect risks to our assets`}</p>
        </S.ContentDiv>
        <S.LoginForm Sign={Sign}>
          <LoginForm setSignIn={setSignIn} />
        </S.LoginForm>
        <S.SignInForm Sign={Sign}>
          <SignForm unsetSignIn={unsetSignIn} />
        </S.SignInForm>
      </S.Wrapper>
    </>
  );
};

export default User;
