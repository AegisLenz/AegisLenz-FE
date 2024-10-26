import * as S from "./InnerIam_style";

let Data = ["User1", "AWS", "2024-10-15", "SE", 1];

const Inneriam = () => {
  return (
    <S.Wrapper>
      <S.InnerTop>
        <S.InnerTitleArea>
          <S.InnerTitleIcon src="/icon/AI_Icon.png" />
          <S.InnerTitle service={Data[3]}>{Data[0]}</S.InnerTitle>
          <S.InnerTopInfo>
            <S.InfoLink to="#">{Data[1]}</S.InfoLink>
            <S.InfoLink to="#">{Data[2]}</S.InfoLink>
          </S.InnerTopInfo>
        </S.InnerTitleArea>
      </S.InnerTop>
      <S.InnerCategorWrapper></S.InnerCategorWrapper>
    </S.Wrapper>
  );
};

export default Inneriam;
