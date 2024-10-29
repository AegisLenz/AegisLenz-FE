import * as S from "./SideBar_style";
import { Link } from "react-router-dom";
import ToggleEdit from "../toggle/edit/ToggleEdit";

const SideBar = ({ isEditOn, setEditOn }) => {
  const setEditOnOff = () => {
    setEditOn((prev) => !prev);
  };

  return (
    <S.Wrapper>
      <S.IconWrapper>
        <Link to="/">
          <S.Icon src="/icon/Frame.png" />
          <S.IconP>Dashboard</S.IconP>
        </Link>
        <Link to="/AI">
          <S.Icon src="/icon/AI_Icon.png" />
          <S.IconP>Question History</S.IconP>
        </Link>
        <Link to="/IAM">
          <S.Icon src="/icon/Network_Icon.png" />
          <S.IconP>IAM Data</S.IconP>
        </Link>
      </S.IconWrapper>
      <ToggleEdit isEditOn={isEditOn} setEditOnOff={setEditOnOff} />
    </S.Wrapper>
  );
};

export default SideBar;
