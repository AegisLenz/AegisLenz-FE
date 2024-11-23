import * as S from "./pagestyle/Asset_style";
import { useState } from "react";
import TopBar from "../component/topbar/TopBar";
import SideBar from "../component/sidebar/SideBar";
import AccountIndex from "../component/grid/elements/account_status_overview/AccountStatus";
import EC2Index from "../component/grid/elements/ec2_status_overview/EC2Status";
import AccountCount from "../component/grid/elements/account_count/AccountCount";
import Asset from "../component/asset/AssetDetail";
const testAccount = [
  {
    UserName: "Hyunjun_Park",
    UserId: "AIDA2MNVLVQT4YD7QRMBR",
    CreateDate: "2024-10-01T05:45:15.000Z",
    UserPolicies: [],
    AttachedPolicies: [
      "Aegislenz-s3-queue",
      "AmazonEC2FullAccess",
      "AdministratorAccess",
      "IAMUserChangePassword",
      "AmazonS3FullAccess",
    ],
    Groups: [],
    AccessKeysLastUsed: [],
    LastUpdated: "2024-10-31T15:22:50.969Z",
  },
  {
    UserName: "Jiyun_Kim",
    UserId: "AIDA2MNVLVQTRDIWKGAC5",
    CreateDate: "2024-09-30T08:23:21.000Z",
    UserPolicies: [],
    AttachedPolicies: [
      "Aegislenz-s3-queue",
      "AmazonEC2FullAccess",
      "AdministratorAccess",
      "IAMUserChangePassword",
      "AmazonS3FullAccess",
    ],
    Groups: [],
    AccessKeysLastUsed: [],
    LastUpdated: "2024-10-31T15:22:52.075Z",
  },
  {
    UserName: "Taeyang_Kim",
    UserId: "AIDA2MNVLVQTWUUAMZCZE",
    CreateDate: "2024-09-30T08:19:35.000Z",
    UserPolicies: [],
    AttachedPolicies: [
      "Aegislenz-s3-queue",
      "AmazonEC2FullAccess",
      "AdministratorAccess",
      "IAMUserChangePassword",
      "AmazonS3FullAccess",
    ],
    Groups: [],
    AccessKeysLastUsed: [],
    LastUpdated: "2024-10-31T15:22:53.895Z",
  },
  {
    UserName: "Wonje_Cha",
    UserId: "AIDA2MNVLVQT5TARLHOZP",
    CreateDate: "2024-10-01T04:11:48.000Z",
    UserPolicies: [],
    AttachedPolicies: ["AmazonEC2FullAccess", "AdministratorAccess"],
    Groups: [],
    AccessKeysLastUsed: [
      {
        AccessKeyId: "AKIA2MNVLVQT53CDZV4V",
        Status: "Active",
        LastUsedDate: "2024-10-31T15:10:00.000Z",
      },
    ],
    LastUpdated: "2024-10-31T15:22:55.125Z",
  },
  {
    UserName: "Yeji_Shin",
    UserId: "AIDA2MNVLVQTSEX5JPOM3",
    CreateDate: "2024-09-30T08:21:28.000Z",
    UserPolicies: [],
    AttachedPolicies: [
      "AmazonEC2FullAccess",
      "AdministratorAccess",
      "IAMUserChangePassword",
    ],
    Groups: [],
    AccessKeysLastUsed: [],
    LastUpdated: "2024-10-31T15:22:56.459Z",
  },
  {
    UserName: "Yujeong_Choi",
    UserId: "AIDA2MNVLVQT6H4YW2SMB",
    CreateDate: "2024-10-01T05:47:18.000Z",
    UserPolicies: [],
    AttachedPolicies: [
      "AmazonEC2FullAccess",
      "AdministratorAccess",
      "IAMUserChangePassword",
    ],
    Groups: [],
    AccessKeysLastUsed: [],
    LastUpdated: "2024-10-31T15:22:57.687Z",
  },
];
function Main() {
  const [openDetail, setDetail] = useState(false);
  const [isDetailData, setDetailData] = useState({});
  const [DataType, setDataType] = useState("");

  const GenDetailData = (data, type) => {
    setDetailData(data);
    setDataType(type);
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
              <AccountIndex GenDetailData={GenDetailData} data={testAccount} />
            </S.Indexdiv>
            <S.Indexdiv>
              <EC2Index GenDetailData={GenDetailData} data={[]} />
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
            {openDetail ? (
              <Asset data={isDetailData} DataType={DataType} />
            ) : (
              ""
            )}
          </S.SideWrapper>
        </S.DetailWrapper>
      </S.Wrapper>
    </>
  );
}

export default Main;
