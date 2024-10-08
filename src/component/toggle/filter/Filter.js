import * as S from "./Filter_style";

const Filter = ({
  FilterToggleButton,
  isFilterOpen,
  setFilterOpen,
  isChattoggleOpen,
  ismarkData,
}) => {
  return (
    <S.Wrapper isOpen={isChattoggleOpen}>
      <S.FilterBox isOpen={isFilterOpen} ismarkData={ismarkData}>
        <S.Icon src="/icon/Search.svg" ismarkData={ismarkData}></S.Icon>
        <S.FilterInputWrapper ismarkData={ismarkData}>
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
};

export default Filter;
