import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  position: fixed;
  right: 0;
  width: ${({ isSideToggle }) => (isSideToggle ? "50vw" : 0)};
  min-height: 92vh;
  transition: all ease 0.3s;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: inset 1px 0 2px 0 #888888;
  background-color: #cccccc;
`;
