import TopBar from "../component/topbar/TopBar";
import SideBar from "../component/sidebar/SideBar";
import GraphComponent from "../component/graph/D3_isomopic/GraphComponent";
import { useState } from "react";
import * as S from "./pagestyle/Network_style";
import AccountStatus from "../component/grid/elements/account_status_overview/AccountStatus";

function Main() {
  const [openIsometric, setIamIsometric] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [isIsometric, setIsometric] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [IsometricData, setIsometricData] = useState();

  return (
    <>
      <TopBar />
      <SideBar />
      <S.Wrapper>
        <S.IndexWrapper>
          <AccountStatus />
        </S.IndexWrapper>
        <S.GraphWrapper>
          <S.IsometricToggle
            openIsometric={openIsometric}
            isIsometric={isIsometric}
            onClick={() => setIamIsometric((prev) => !prev)}
          />
          <GraphComponent openIsometric={openIsometric} />
        </S.GraphWrapper>
      </S.Wrapper>
    </>
  );
}

export default Main;
