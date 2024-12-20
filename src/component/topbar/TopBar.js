import { useNavigate } from "react-router-dom";
import * as S from "./TopBar_style";
import { useEffect, useState } from "react";

const Top = () => {
  const [isUser, setisUser] = useState("");
  useEffect(() => {
    const userId = localStorage.getItem("user_id"); // 저장된 user_id 가져오기
    if (userId) {
      setisUser(userId); // 사용자 로그인 상태 업데이트
    }
  }, []);

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
      {isUser !== "" ? (
        <S.Login
          onClick={() => {
            localStorage.removeItem("user_id");
            window.location.reload();
            navigate("/", { state: { isChatOpen: false } });
          }}
        >
          Log Out
        </S.Login>
      ) : (
        <>
          <S.Login onClick={LoginHandleClick}>Login</S.Login>
          <S.Login onClick={SignUpHandleClick}>Sign in</S.Login>
        </>
      )}
    </S.Wrapper>
  );
};

export default Top;
