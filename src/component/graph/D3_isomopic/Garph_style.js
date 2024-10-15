import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 300;
  position: fixed;
  right: 0;
  top:8vh;
  width: ${({ openIsometric }) => (openIsometric ? "50vw" : "0")};
  height: 92vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

  overflow: hidden;

  transition: width ease 0.6s;
  cursor: grab;

  box-shadow: inset 0 0 10px #ddd;
  
  & > svg {
    transform: rotate(-30deg) skewX(30deg);
  }
`;
