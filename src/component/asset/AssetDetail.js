import * as S from "./AssetDetail_style";
import { useState } from "react";
import { IamInfo, Ec2Info } from "./contents/index";

const Inneriam = ({ data, DataType }) => {
  const [selectedCategory, setSelectedCategory] = useState("info");

  const renderContent = () => {
    switch (selectedCategory) {
      case "info":
        return DataType === "iam" ? (
          <IamInfo data={data} />
        ) : (
          <Ec2Info data={data} />
        );
      case "Checklist":
        return <IamInfo data={data} />;
      case "Configuration Log":
        return <IamInfo data={data} />;
      case "Policies":
        return <IamInfo data={data} />;
      case "Resource Permissions":
        return <IamInfo data={data} />;
      default:
        return null;
    }
  };

  return (
    <S.Wrapper>
      <S.InnerTop>
        <S.InnerTitleArea>
          <S.Icon
            url={DataType === "iam" ? "/icon/user_Icon.svg" : "/icon/EC2.svg"}
          />
          <S.InnerTitle
            UserId={
              DataType === "iam"
                ? "UserId: " + data.UserId
                : "EC2Id: " + data.InstanceId
            }
          >
            {DataType === "iam" ? data.UserName : data.Tags[0].Value}
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
