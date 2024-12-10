import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 100;
  margin: 0;
  height: auto;
  position: relative;
`;
export const MoveAreaInGrid = styled.div`
  z-index: 101;
  width: 100%;
  height: 3%;
  margin-bottom: 1%;
  background-color: ${({ isEditOn }) => (isEditOn ? "#cccccc" : "transparent")};
  border-radius: 1em;
  transition: background-color ease 0.3s, height ease 0.3s;
  ${({ isEditOn }) =>
    isEditOn &&
    `
      &:hover {
        cursor: pointer;
        height: 20%;
      }

      &:active {
        cursor: move;
        height: 20%;
        transform: translate(0, -50%);
      }
    `}
`;

export const GridElement = styled.div`
  z-index: 102;
  transition: all ease 0.7s;
  border-radius: 1em;

  overflow: hidden;

  ${MoveAreaInGrid}:active ~ &:hover {
    cursor: move;
    user-select: none;
  }
`;
