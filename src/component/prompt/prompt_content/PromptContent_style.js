import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  position: fixed;
  right: 0;
  width: ${({ isSideToggle }) => (isSideToggle ? "50vw" : 0)};
  background-color: pink;
  min-height: 92vh;
  transition: all ease 0.3s;
`;
