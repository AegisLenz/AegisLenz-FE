import SideBar from "../component/sidebar/SideBar";
import TopBar from "../component/topbar/TopBar";
import * as S from "./pagestyle/Policy_style";

const Policy = () => {
  return (
    <S.Wrapper>
      <TopBar />
      <SideBar />
    </S.Wrapper>
  );
};

export default Policy;
