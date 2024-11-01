import * as S from "./AssetDetail_style";
import { useState } from "react";
import { IamInfo } from "./contents/index";

const Inneriam = ({data}) => {
  const [selectedCategory, setSelectedCategory] = useState("info");

  const renderContent = () => {
    switch (selectedCategory) {
      case "info":
        return <IamInfo data={data} />;
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
          <S.InnerTitle UserId={"UserId: " + data.UserId}>
            {data.UserName}
          </S.InnerTitle>
        </S.InnerTitleArea>
        <S.InnerTopInfo>
          <S.InfoLink to="#">{"AWS"}</S.InfoLink>
          <S.InfoLink to="#">{data.CreateDate}</S.InfoLink>
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
