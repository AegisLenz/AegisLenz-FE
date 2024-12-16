import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;

  border-radius: 1em;
  box-shadow: 1px 1px 5px #aaa;
`;
export const Title = styled.h2`
  z-index: 202;
  position: absolute;
  top: 0;
  color: #104f55;
  width: 94%;
  height: 6vh;
  left: 0;
  font-size: 130%;
  padding: 0 3% 0 3%;
  margin: 1% 0 1% 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const FilterWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const SearchInput = styled.input`
  box-shadow: none;
  border: none;

  font-size: 0.6em;

  height: 50%;
  width: 50%;

  margin-left: 1%;

  border-bottom: solid 1px #121212;

  transition: all ease 0.3s;

  &:invalid {
    border-bottom: solid 2px #121212;
  }
  &:focus {
    outline: none;
  }
`;
export const InitButton = styled.button`
  height: 50%;
  width: 20%;
  margin-left: 2%;

  font-size: 0.6em;
  font-weight: 500;

  border-radius: 10em;
  border: none;

  outline: none;

  box-shadow: none;
  color: white;
  background-color: #104f55;

  transition: all ease 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.08);
  }
`;
export const FilterDropdown = styled.div`
  position: relative;

  margin-left: 1%;
  height: 50%;
  width: 20%;
`;
export const TableWrapper = styled.div`
  z-index: 201;
  position: absolute;
  top: 19%;
  width: 96%;
  height: 80%;
  overflow: auto;
`;
export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
export const Thead = styled.thead`
  z-index: 201;
  border-bottom: solid 3px #104f55;
  font-size: 0.9em;
  font-weight: 500;
  text-align: center;
  position: sticky;
  top: 0;
  background-color: white;
`;
export const Tbody = styled.tbody`
  font-size: 0.8em;
`;
export const Tr = styled.tr`
  border-bottom: solid 1px #104f55;
  transition: all ease 0.3s;
  background-color: ${({ type }) => (type ? "transparent" : "#F38A87")};
  font-weight: ${({ type }) => (type ? "" : "600")};

  &:hover {
    cursor: pointer;
    background-color: ${({ type }) => (type ? "#eeeeee" : "#F38A87")};
  }
`;
export const Td = styled.td`
  padding: 1.5%;
  text-align: center;
  white-space: nowrap;
  overflow-x: visible;

  p {
    white-space: pre-wrap;
  }
`;
export const StatusIcon = styled.div`
  width: 100%;
  height: 1.5em;
  background-image: url(${({ type }) =>
    type ? "/icon/check.svg" : "/icon/alert.svg"});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
export const TypeIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const TypeIcon = styled.div`
  width: 5em;
  height: 1.5em;
  background-color: ${({ color }) => color};
  border-radius: 40em;
  box-shadow: 1px 1px 2px #666666;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 95%;
`;
