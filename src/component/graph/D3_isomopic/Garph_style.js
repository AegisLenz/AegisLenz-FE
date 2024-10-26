import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 300;
  right: 0;
  top: 8vh;
  width: 100%;
  height: 92vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

  overflow: hidden;

  transition: width ease 0.6s;
  cursor: grab;

  /* & > svg {
    transform: rotate(-30deg) skewX(30deg);
  } */
`;
