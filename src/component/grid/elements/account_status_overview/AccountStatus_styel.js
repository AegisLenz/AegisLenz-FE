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
`;
export const Title = styled.h2`
  position: absolute;
  top: 0;
  color: #104f55;
  width: 100%;
  height: 19%;
  left: 0;
  font-size: 130%;
  padding: 0 3% 0 3%;
  margin: 1% 0 1% 0;
  align-items: left;
  align-content: center;
`;
export const TableWrapper = styled.div`
  position: absolute;
  top: 19%;
  width: 90%;
  height: 80%;
  overflow-y: auto;
  overflow-x: hidden;
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
    transform: scale(1.01);
    background-color: ${({ type }) => (type ? "#eeeeee" : "#F38A87")};
  }
`;
export const Td = styled.td`
  padding: 2%;
  text-align: center;
`;
export const StatusIcon = styled.div`
  width: 100%;
  height: 1.5em;
  background-image: url(${({ type }) => type ? "/icon/check.svg" : "/icon/alert.svg"});
  background-size: contain;
  background-position:center;
  background-repeat: no-repeat;
`;
export const TypeIconWrapper = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  width:100%;
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
