import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 100;
  margin: 0;
  height: 92vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

export const ChatArea = styled.div`
  z-index: 101;
  width: 46.3vw;
  height: ${({ isChattoggleOpen }) => (isChattoggleOpen ? "88vh" : "5vh")};
  margin-top: ${({ isChattoggleOpen }) => (isChattoggleOpen ? "1vh" : "3vh")};
  margin-left: ${({ isOpen }) => (isOpen ? "5.8vw" : "0.8vw")};
  transition: all ease 0.6s;
`;

export const MoveAreaInGrid = styled.div`
  z-index: 101;
  width: 100%;
  height: 3%;
  margin-bottom: 1%;
  background-color: ${({ isEditOn }) => (isEditOn ? "#cccccc" : "transparent")};
  border-radius: 1em;
  transition: background-color ease 0.3s, height ease 0.3s;
  ${({ isEditOn }) =>
    isEditOn &&
    `
      &:hover {
        cursor: pointer;
        height: 20%;
      }

      &:active {
        cursor: move;
        height: 20%;
        transform: translate(0, -50%);
      }
    `}
`;

export const GridElement = styled.div`
  z-index: 102;
  transition: all ease 0.7s;
  border-radius: 1em;

  overflow: hidden;

  ${MoveAreaInGrid}:active ~ &:hover {
    cursor: move;
    user-select: none;
  }
`;
