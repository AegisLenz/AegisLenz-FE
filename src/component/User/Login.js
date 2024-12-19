import * as S from "./Login_style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginformHook from "../hook/users/LoginFetch";

const Login = ({ setSignIn }) => {
  const [userName, setUserName] = useState("");
  const [userPW, setUserPW] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const data = await LoginformHook(userName, userPW);
      if (data.user_id) {
        alert("Login successful!");
        localStorage.setItem("user_id", data.user_id);
        navigate("/");
      } else if (data.detail === "Failed 401: Invalid username or password") {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <S.From>
      <S.Title>Welcome!</S.Title>
      <S.InputWrapper>
        <S.Input>
          <S.InputTag
            id="LidInput"
            type="text"
            required
            equal={true}
            onChange={(e) => setUserName(e.target.value)}
          ></S.InputTag>
          <S.Label htmlFor="LidInput">ID: </S.Label>
          <S.UnderLine></S.UnderLine>
        </S.Input>
        <S.Input>
          <S.InputTag
            id="LpassInput"
            type="password"
            required
            equal={true}
            onChange={(e) => setUserPW(e.target.value)}
          ></S.InputTag>
          <S.Label htmlFor="LpassInput">PW: </S.Label>
          <S.UnderLine></S.UnderLine>
        </S.Input>
      </S.InputWrapper>
      <S.ForgetDiv>
        <p
          onClick={() => {
            alert("관리자에게 문의 바랍니다.");
          }}
        >
          Forget Password?
        </p>
      </S.ForgetDiv>
      <S.Button
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </S.Button>
      <S.DontHave
        onClick={() => {
          setSignIn();
        }}
      >
        Don't have an account?
      </S.DontHave>
    </S.From>
  );
};

export default Login;
