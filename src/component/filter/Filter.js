import * as S from "./Filter_style";

function Filter({
  FilterToggleButton,
  isFilterOpen,
  setFilterOpen,
  isChattoggleOpen,
}) {
  return (
    <S.Wrapper isOpen={isChattoggleOpen}>
      <S.FilterBox isOpen={isFilterOpen}>
        <S.Icon src="/icon/Search.svg"></S.Icon>
        <S.FilterInputWrapper>
          <S.FilterInput
            onFocus={setFilterOpen}
            isOpen={isFilterOpen}
            placeholder="Filter..."
          ></S.FilterInput>
          <S.ToggleButton
            onClick={FilterToggleButton}
            isOpen={isFilterOpen}
          ></S.ToggleButton>
        </S.FilterInputWrapper>
      </S.FilterBox>
    </S.Wrapper>
  );
}

export default Filter;
