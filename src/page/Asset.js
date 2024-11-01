import * as S from "./pagestyle/Asset_style";
import { useState } from "react";
import TopBar from "../component/topbar/TopBar";
import SideBar from "../component/sidebar/SideBar";
import AccountIndex from "../component/grid/elements/account_status_overview/AccountStatus";
import EC2Index from "../component/grid/elements/ec2_status_overview/EC2Status";
import AccountCount from "../component/grid/elements/account_count/AccountCount";
import Asset from "../component/asset/AssetDetail";

function Main() {
  const [openDetail, setDetail] = useState(false);
  const [isDetailData, setDetailData] = useState({});

  const GenDetailData = (data) => {
    setDetailData(data);
    setDetail(true);
  };

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
            <S.Indexdiv>
              <AccountIndex GenDetailData={GenDetailData} />
            </S.Indexdiv>
            <S.Indexdiv>
              <EC2Index GenDetailData={GenDetailData} />
            </S.Indexdiv>
          </S.IndexWrapper>
        </S.InnerWrapper>
        <S.DetailWrapper>
          <S.IsometricToggle
            openDetail={openDetail}
            isDetailData={Object.keys(isDetailData).length > 0}
            onClick={() => {
              setDetail((prev) => !prev);
              setDetailData({});
            }}
          />
          <S.SideWrapper openDetail={openDetail}>
            {openDetail ? <Asset data={isDetailData} /> : ""}
          </S.SideWrapper>
        </S.DetailWrapper>
      </S.Wrapper>
    </>
  );
}

export default Main;
