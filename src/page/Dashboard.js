import TopBar from "../component/topbar/TopBar";
import SideBar from "../component/sidebar/SideBar";
import Grid from "../component/grid/GridWrapper";
import * as S from "./pagestyle/Dashboard_style";
import { useState } from "react";

const Dashboard = () => {
  const [isEditOn, setEditOn] = useState(false);
  const [MarkData, setMarkData] = useState([]);
  const setMarkDataFunc = (value) => {
    setMarkData(value);
  };

  return (
    <div>
      <TopBar />
      <SideBar isEditOn={isEditOn} setEditOn={setEditOn} />
      <S.Wrapper>
        <Grid
          isEditOn={isEditOn}
          MarkData={MarkData}
          setMarkDataFunc={setMarkDataFunc}
        />
      </S.Wrapper>
    </div>
  );
};

export default Dashboard;
