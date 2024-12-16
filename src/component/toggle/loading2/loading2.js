import * as S from "./loading_style";

const Loading = () => {
  return (
    <S.Wrapper>
      <S.LoadingContainer>
        <S.Spinner>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </S.Spinner>
      </S.LoadingContainer>
    </S.Wrapper>
  );
};

export default Loading;
