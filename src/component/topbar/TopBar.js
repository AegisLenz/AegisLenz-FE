import { useNavigate } from "react-router-dom";
import * as S from "./TopBar_style";

const Top = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", { state: { isChatOpen: false } }); // 강제로 상태 전달
  };

  return (
    <S.Wrapper>
      <S.Title onClick={handleClick}>AegisLenz</S.Title>
    </S.Wrapper>
  );
};

export default Top;
