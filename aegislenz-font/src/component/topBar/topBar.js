import { Link } from "react-router-dom";
import * as S from "./TopBar_style";

function Top() {
  return (
    <S.Wrapper>
      <div>
        <Link to="/">
          <S.Title>AegisLenz</S.Title>
        </Link>
      </div>
    </S.Wrapper>
  );
}

export default Top;
