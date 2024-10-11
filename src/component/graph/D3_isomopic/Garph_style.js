import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 300;
  position: fixed;
  right: 0;
  width: ${({ openIsometric }) => (openIsometric ? "50vw" : "0")};
  height: 92vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #aaaaaa;

  overflow: hidden;

  transition: width ease 0.6s;
  cursor: grab;

  box-shadow: -2px 0 1px 0 #999999;

  & > svg {
    transform: rotate(-30deg) skewX(30deg);
  }
`;
