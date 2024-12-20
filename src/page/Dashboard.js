import TopBar from "../component/topbar/TopBar";
import SideBar from "../component/sidebar/SideBar";
import Grid from "../component/grid/GridWrapper";
import Alert from "../component/alert/Alert";
import * as S from "./pagestyle/Dashboard_style";
import { useState } from "react";

const Dashboard = () => {
  const [isEditOn, setEditOn] = useState(false);
  const [MarkData, setMarkData] = useState([]);
  const [promptSession, setPromptSession] = useState("");
  const setMarkDataFunc = (value) => {
    setMarkData(value);
  };

  const getPromptSession = (value) => {
    setPromptSession(value);
    console.log("getPromptSession" + value);
  };

  return (
    <div>
      <TopBar />
      <SideBar isEditOn={isEditOn} setEditOn={setEditOn} />
      <S.Wrapper>
        <Alert getPromptSession={getPromptSession} />
        <Grid
          isEditOn={isEditOn}
          MarkData={MarkData}
          setMarkDataFunc={setMarkDataFunc}
          AlertSession={promptSession}
        />
      </S.Wrapper>
    </div>
  );
};

export default Dashboard;
