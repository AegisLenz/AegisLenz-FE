import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  position: fixed;
`;

export const SideIndex = styled.div`
  position: relative;
  width: ${({ isSideToggle }) => (isSideToggle ? "20vw" : "0vw")};
  height: 92vh;
  transition: width ease 0.3s;
  overflow-x: hidden;
  overflow-y: inherit;
  background-color: #c7c7c7;
  box-shadow: inset -1px 0 2px 0 #888888;
`;
export const TopArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 2vh 0 1vh 3%;
  border-bottom: solid 1px #121212;
  box-shadow: 0 1px 1px 0 #999999;
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
  left: ${({ isSideToggle }) => (isSideToggle ? "-4vw" : "1vw")};
  transition: all ease 0.3s;
`;

export const SideOuterToggle = styled.div`
  width: 2vw;
  height: 2vw;
  background-color: transparent;
  border-radius: 0.5em;

  background-image: url(${(props) => props.path});
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
  transform: rotate(180deg);

  &:hover {
    background-color: #bbbbbb;
    box-shadow: -1px -1px 1px 0 #777777;
  }
`;
