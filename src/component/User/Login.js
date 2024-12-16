import * as S from "./Login_style";

const Login = ({ setSignIn }) => {
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
      <S.Button>Login</S.Button>
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
