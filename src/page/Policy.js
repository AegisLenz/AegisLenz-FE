import SideBar from "../component/sidebar/SideBar";
import TopBar from "../component/topbar/TopBar";
import * as S from "./pagestyle/Policy_style";
import Markdiff from "../component/policydiff/MarkDiff";

const Policy = () => {
  return (
    <S.Wrapper>
      <TopBar />
      <SideBar />
      <Markdiff />
    </S.Wrapper>
  );
};

export default Policy;
