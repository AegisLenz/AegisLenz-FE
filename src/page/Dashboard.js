import TopBar from "../component/topbar/TopBar";
import SideBar from "../component/sidebar/SideBar";
import Grid from "../component/grid/GridWrapper";
import * as S from "./Dashboard_style";
import { useState } from "react";

const Dashboard = () => {
  const [isEditOn, setEditOn] = useState(false);
  const [MarkData, setMarkData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isSideContent, setSideContent] = useState(false);
  const setMarkDataFunc = (value) => {
    setMarkData(value);
  };
  const SideContent = () => {
    setSideContent(true);
  };
  return (
    <div>
      <TopBar />
      <SideBar isEditOn={isEditOn} setEditOn={setEditOn} />
      <S.Wrapper>
        <Grid
          isEditOn={isEditOn}
          MarkData={MarkData}
          isChatOFF={false}
          isFillterOFF={false}
          SideContent={SideContent}
          setMarkDataFunc={setMarkDataFunc}
        />
      </S.Wrapper>
    </div>
  );
};

export default Dashboard;
