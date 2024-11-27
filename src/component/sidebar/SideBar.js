import * as S from "./SideBar_style";
import { Link } from "react-router-dom";
// import ToggleEdit from "../toggle/edit/ToggleEdit";

const SideBar = ({ isEditOn, setEditOn }) => {
  // const setEditOnOff = () => {
  //   setEditOn((prev) => !prev);
  // };

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
        <Link to="/Policy">
          <S.Icon src="/icon/policy.png" scale="1.3" />
          <S.IconP>Policy</S.IconP>
        </Link>
        <Link to="/Report">
          <S.Icon src="/icon/Report.png" />
          <S.IconP>Report</S.IconP>
        </Link>
        <Link to="/Asset">
          <S.Icon src="/icon/Network_Icon.png" />
          <S.IconP>Asset Data</S.IconP>
        </Link>
      </S.IconWrapper>
      {/* <ToggleEdit isEditOn={isEditOn} setEditOnOff={setEditOnOff} /> */}
    </S.Wrapper>
  );
};

export default SideBar;
