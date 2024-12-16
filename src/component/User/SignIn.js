import * as S from "./Login_style";
import { useState, useRef } from "react";

const Sign = ({ unsetSignIn }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [equal, setEqual] = useState(false);

  const confirmPasswordRef = useRef(null);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setEqual(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setEqual(password === e.target.value);
  };

  const handleSubmit = () => {
    if (!equal && confirmPasswordRef.current) {
      confirmPasswordRef.current.classList.add("error");

      // 애니메이션 종료 후 에러 클래스 제거
      setTimeout(() => {
        if (confirmPasswordRef.current) {
          confirmPasswordRef.current.classList.remove("error");
        }
      }, 300);
    }
  };

  return (
    <S.From>
      <S.Title>Welcome!</S.Title>
      <S.InputWrapper>
        <S.Input>
          <S.InputTag
            id="SidInput"
            type="text"
            required
            equal={true}
          ></S.InputTag>
          <S.Label htmlFor="SidInput">ID: </S.Label>
          <S.UnderLine></S.UnderLine>
        </S.Input>

        <S.HalfInputWrapper>
          <S.HalfInput>
            <S.InputTag
              id="SpasswordInput"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              equal={true}
              required
            />
            <S.Label htmlFor="SpasswordInput">PW:</S.Label>
            <S.UnderLine />
          </S.HalfInput>
          <S.HalfInput>
            <S.InputTag
              id="SpasswordInputCheck"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              ref={confirmPasswordRef}
              equal={equal}
              required
            />
            <S.Label htmlFor="SpasswordInputCheck">PW Check:</S.Label>
            <S.UnderLine />
          </S.HalfInput>
        </S.HalfInputWrapper>

        <S.Input>
          <S.InputTag
            id="emailInput"
            type="text"
            required
            equal={true}
          ></S.InputTag>
          <S.Label htmlFor="emailInput">email: </S.Label>
          <S.UnderLine></S.UnderLine>
        </S.Input>

        <S.HalfInputWrapper>
          <S.HalfInput>
            <S.InputTag
              id="PKInput"
              type="text"
              required
              equal={true}
            ></S.InputTag>
            <S.Label htmlFor="PKInput">AWS Public Key: </S.Label>
            <S.UnderLine></S.UnderLine>
          </S.HalfInput>
          <S.HalfInput>
            <S.InputTag
              id="PVKInput"
              type="password"
              required
              equal={true}
            ></S.InputTag>
            <S.Label htmlFor="PVKInput">AWS Private Key: </S.Label>
            <S.UnderLine></S.UnderLine>
          </S.HalfInput>
        </S.HalfInputWrapper>

        <S.Input>
          <S.InputTag
            id="GPTInput"
            type="password"
            required
            equal={true}
          ></S.InputTag>
          <S.Label htmlFor="GPTInput">ChatGPT Token: </S.Label>
          <S.UnderLine></S.UnderLine>
        </S.Input>
      </S.InputWrapper>
      <S.Button onClick={handleSubmit}>Sign In</S.Button>
      <S.DontHave onClick={unsetSignIn}>Already have an account?</S.DontHave>
    </S.From>
  );
};

export default Sign;
