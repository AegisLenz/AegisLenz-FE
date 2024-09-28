import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 100;
  position: absolute;
  left: 5vw;
  top: 8vh;
  width: 95vw;
  height: auto;
  min-height: 92vh;
  background-color: #e4e4e4;
  margin: 0;
`;

export const ChatArea = styled.div`
  z-index: 101;
  width: 46.3vw;
  height: ${({ isChattoggleOpen }) => (isChattoggleOpen ? "88vh" : "5vh")};
  margin-top: ${({ isChattoggleOpen }) => (isChattoggleOpen ? "1vh" : "3vh")};
  margin-left: ${({ isOpen }) => (isOpen ? "5.8vw" : "0.8vw")};
  background-color: red;
  transition: all ease 0.6s;
`;

export const ContentAreaInGrid = styled.div`
  z-index: 101;
  width: 100%;
  height: 3%;
  margin-bottom: 1%;
  transition: height ease 0.3s;
  background-color: #cccccc;
  &:hover {
    cursor: pointer;
    height: 20%;
  }
  &:active {
    cursor: move;
    height: 20%;
    transform: translate(0, -50%);
  }
`;

export const GridElement = styled.div`
  z-index: 102;
  transition: all ease 0.7s;
  border-radius: 1em;
  background-color: transparent;
  ${ContentAreaInGrid}:active ~ &:hover {
    cursor: move;
    user-select: none;
  }
`;
