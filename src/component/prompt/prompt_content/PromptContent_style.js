import styled from "styled-components";

export const Wrapper = styled.div``;

export const GridWrapper = styled.div`
  z-index: 200;
  position: fixed;
  right: 0;
  width: ${({ isSideToggle }) => (isSideToggle ? "48vw" : 0)};
  min-height: 90vh;
  padding: 2vh 0 1vh 0;
  transition: all ease 0.3s;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: inset 1px 0 2px 0 #888888;
  background-color: #cccccc;
`;
export const SideInnerToggle = styled.div`
  width: 2vw;
  height: 2vw;
  margin-left: 2%;
  border-radius: 0.5em;
  transition: all ease 0.3s;

  background-image: url(${(props) => props.path});
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
  transform: rotate(180deg);

  cursor: pointer;

  &:hover {
    background-color: #a9a9a9;
    box-shadow: 1px 1px 1px 0 #777777;
  }
`;
export const OuterToggleArea = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 2vh;
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
