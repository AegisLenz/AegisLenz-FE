import TopBar from "../component/topbar/TopBar";
import SideBar from "../component/sidebar/SideBar";
import { useState } from "react";
import * as S from "./pagestyle/Iam_style";
import AccountIndex from "../component/grid/elements/account_status_overview/AccountStatus";
import AccountCount from "../component/grid/elements/account_count/AccountCount";
import Inneriam from "../component/innerIam/InnerIam";

function Main() {
  const [openIsometric, setIamIsometric] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isIsometric, setIsometric] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [IsometricData, setIsometricData] = useState();

  return (
    <>
      <TopBar />
      <SideBar />
      <S.Wrapper>
        <S.InnerWrapper>
          <S.CountWrapper>
            <AccountCount />
          </S.CountWrapper>
          <S.IndexWrapper>
            <AccountIndex />
          </S.IndexWrapper>
        </S.InnerWrapper>
        <S.GraphWrapper>
          <S.IsometricToggle
            openIsometric={openIsometric}
            isIsometric={isIsometric}
            onClick={() => setIamIsometric((prev) => !prev)}
          />
          <S.SideWrapper openIsometric={openIsometric}>
            <Inneriam />
          </S.SideWrapper>
        </S.GraphWrapper>
      </S.Wrapper>
    </>
  );
}

export default Main;
