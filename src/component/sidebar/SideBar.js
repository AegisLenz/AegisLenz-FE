import * as S from "./SideBar_style";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <S.Wrapper>
      <S.IconWrapper>
        <Link to="/">
          <S.Icon src="/icon/Frame.png"></S.Icon>
        </Link>
        <Link to="/AI">
          <S.Icon src="/icon/AI_Icon.png"></S.Icon>
        </Link>
        <Link to="/Network">
          <S.Icon src="/icon/Network_Icon.png"></S.Icon>
        </Link>
      </S.IconWrapper>
    </S.Wrapper>
  );
}

export default SideBar;
