import { useNavigate } from "react-router-dom";
import * as S from "./TopBar_style";

const Top = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", { state: { isChatOpen: false } }); // 강제로 상태 전달
  };

  const LoginHandleClick = () => {
    navigate("/User", { state: { Sign: false } }); // 강제로 상태 전달
  };
  const SignUpHandleClick = () => {
    navigate("/User", { state: { Sign: true } }); // 강제로 상태 전달
  };

  return (
    <S.Wrapper>
      <S.Title onClick={handleClick}>AegisLenz</S.Title>
      <S.Icon></S.Icon>
      <S.Login onClick={LoginHandleClick}>Login</S.Login>
      <S.Login onClick={SignUpHandleClick}>Sign in</S.Login>
    </S.Wrapper>
  );
};

export default Top;
