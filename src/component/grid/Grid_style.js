import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 100;
  margin: 0;
  height: 92vh;
  width: 100%;

  position: relative;
`;

export const GridElement = styled.div`
  z-index: 102;
  transition: all ease 0.7s;
  border-radius: 1em;

  position: fixed;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`;
