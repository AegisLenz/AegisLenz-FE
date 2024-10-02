import { Link } from "react-router-dom";
import * as S from "./TopBar_style";

const Top = () => {
  return (
    <S.Wrapper>
      <Link to="/">
        <S.Title>AegisLenz</S.Title>
      </Link>
    </S.Wrapper>
  );
};

export default Top;
