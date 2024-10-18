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
  align-items:center;
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

export const OuterToggleArea = styled.div`
  position:absolute;
  right: ${({ isSideToggle }) => (isSideToggle ? "0" : "1vw")};
  transition: all ease 0.3s;
`;

export const SideOuterToggle = styled.div`
  width: 2vw;
  height: 2vw;
  background-color: transparent;
  border-radius: 0.5em;

  cursor: pointer;

  background-image: url(${(props) => props.path});
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;

  &:hover {
    background-color: #bbbbbb;
    box-shadow: -1px -1px 1px 0 #777777;
  }
`;
