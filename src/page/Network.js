import TopBar from "../component/topbar/TopBar";
import SideBar from "../component/sidebar/SideBar";
import GraphComponent from "../component/graph/D3_isomopic/GraphComponent";
import { useState } from "react";
import * as S from "./Network_style";

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
      <S.GraphWrapper>
        <S.IsometricToggle
          openIsometric={openIsometric}
          isIsometric={isIsometric}
          onClick={() => setIamIsometric((prev) => !prev)}
        />
        <GraphComponent openIsometric={openIsometric} />
      </S.GraphWrapper>
    </>
  );
}

export default Main;
