import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 100;
  position: absolute;
  left: 5vw;
  top: 8vh;
  width: 95vw;
  height: auto;
  min-height: 92vh;
  margin: 0;
  display: flex;
  flex-direction: row;
`;
export const ChatAreaWrapper = styled.div`
  position: absolute;
  left: ${(props) => props.Chatleft};
  width: ${(props) => props.ChatWidth};
  transition: all ease 0.3s;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
`;
export const ChatArea = styled.div`
  position: relative;
  z-index: 200;
  width: ${({ isSideOpen, isSideContent }) =>
    isSideOpen ? "90%" : isSideContent ? "80%" : "50%"};
  bottom: 10%;
  transition: all ease 0.3s;
`;
