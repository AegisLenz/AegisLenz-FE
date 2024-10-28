import * as S from "./InnerIam_style";

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
  return (
    <S.Wrapper>
      <S.InnerTop>
        <S.InnerTitleArea>
          <S.InnerTitleIcon src="/icon/AI_Icon.png" />
          <S.InnerTitle UserId={"UserId: " + Data.UserId}>
            {Data.UserName}
          </S.InnerTitle>
        </S.InnerTitleArea>
        <S.InnerTopInfo>
          <S.InfoLink to="#">{"AWS"}</S.InfoLink>
          <S.InfoLink to="#">{Data.CreateDate}</S.InfoLink>
        </S.InnerTopInfo>
      </S.InnerTop>
      <S.InnerCategorWrapper></S.InnerCategorWrapper>
    </S.Wrapper>
  );
};

export default Inneriam;
