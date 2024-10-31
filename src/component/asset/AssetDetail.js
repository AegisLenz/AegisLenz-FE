import * as S from "./AssetDetail_style";
import { useState } from "react";
import { IamInfo } from "./contents/index";

let Data = {
  UserName: "Wonje_Cha",
  UserId: "AIDA2MNVLVQT5TARLHOZP",
  CreateDate: "2024-10-01T04:11:48+00:00",
  UserPolicies: [],
  AttachedPolicies: ["AmazonEC2FullAccess", "AdministratorAccess"],
  Groups: [],
  AccessKeysLastUsed: [
    {
      AccessKeyId: "AKIA2MNVLVQT53CDZV4V",
      Status: "Active",
      LastUsedDate: "2024-10-26T09:24:00+00:00",
    },
  ],
  LastUpdated: "2024-10-26T20:11:27.101264",
};

const Inneriam = () => {
  const [selectedCategory, setSelectedCategory] = useState("info");

  const renderContent = () => {
    switch (selectedCategory) {
      case "info":
        return <IamInfo data={Data} />;
      case "Checklist":
        return <div>Checklist</div>;
      case "Configuration Log":
        return <div>Log</div>;
      case "Policies":
        return <div>policies</div>;
      case "Resource Permissions":
        return <div>Permissions</div>;
      default:
        return null;
    }
  };

  return (
    <S.Wrapper>
      <S.InnerTop>
        <S.InnerTitleArea>
          <img src="/icon/AI_Icon.png" alt="Icon" />
          <S.InnerTitle UserId={"UserId: " + Data.UserId}>
            {Data.UserName}
          </S.InnerTitle>
        </S.InnerTitleArea>
        <S.InnerTopInfo>
          <S.InfoLink to="#">{"AWS"}</S.InfoLink>
          <S.InfoLink to="#">{Data.CreateDate}</S.InfoLink>
        </S.InnerTopInfo>
      </S.InnerTop>
      <S.InnerCategorWrapper>
        {[
          "info",
          "Checklist",
          "Configuration Log",
          "Policies",
          "Resource Permissions",
        ].map((category) => (
          <S.InnerCategory
            key={category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </S.InnerCategory>
        ))}
      </S.InnerCategorWrapper>
      <S.InnerContentArea>{renderContent()}</S.InnerContentArea>
    </S.Wrapper>
  );
};

export default Inneriam;
