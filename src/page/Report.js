import SideBar from "../component/sidebar/SideBar";
import TopBar from "../component/topbar/TopBar";
import Report from "../component/report/Report";
import * as S from "./pagestyle/Report_style";

const Policy = () => {
  return (
    <S.Wrapper>
      <TopBar />
      <SideBar />
      <Report />
    </S.Wrapper>
  );
};

export default Policy;
