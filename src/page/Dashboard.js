import TopBar from "../component/topbar/TopBar";
import SideBar from "../component/sidebar/SideBar";
import Grid from "../component/grid/GridWrapper";
import { useState } from "react";

function Dashboard() {
  const [isEditOn, setEditOn] = useState(false);

  return (
    <div>
      <TopBar />
      <SideBar isEditOn={isEditOn} setEditOn={setEditOn} />
      <Grid isEditOn={isEditOn} />
    </div>
  );
}

export default Dashboard;
