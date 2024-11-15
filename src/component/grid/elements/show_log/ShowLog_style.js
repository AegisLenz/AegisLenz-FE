import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: white;

  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  border-radius: 1em;
`;
export const Title = styled.h2`
  z-index: 202;
  top: 0;
  color: #104f55;
  width: 94%;
  left: 0;
  font-size: 130%;
  padding: 0 3% 0 3%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const TableWrapper = styled.div`
  width: 96%;
  height: 80%;
  overflow: auto;
`;
export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  table-layout: auto;
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
  background-color: "transparent";

  &:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }
`;
export const Td = styled.td`
  padding: 1.5%;
  text-align: center;
  white-space: nowrap;
  overflow-x: visible;
`;
export const StatusIcon = styled.div`
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: ${(props) => props.color};

  transform: translateX(100%);
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
