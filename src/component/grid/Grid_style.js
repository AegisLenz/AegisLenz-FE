import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 100;
  position: absolute;
  left: 5vw;
  top: 10vh;
  width: 95vw;
  height: auto;
  min-height: 90vh;
  background-color: #e4e4e4;
  margin: 0;
`;

export const ChatArea = styled.div`
  z-index: 501;
  width: 46.3vw;
  height: ${({ isChattoggleOpen }) => (isChattoggleOpen ? "88vh" : "5vh")};
  margin-top: ${({ isChattoggleOpen }) => (isChattoggleOpen ? "1vh" : "3vh")};
  margin-left: ${({ isOpen }) => (isOpen ? "5.8vw" : "0.8vw")};
  background-color: red;
  transition: all ease 0.6s;
`;

export const GridElement = styled.div`
  transition: all ease 0.7s;
  /* background-color: pink; */
`;