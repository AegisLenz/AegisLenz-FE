import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  position: relative;
  left: 5vw;
  top: 8vh;
  width: 95vw;
  height: auto;
  min-height: 92vh;
  margin: 0;

  display:flex;
  align-items:center;
`;
export const IndexWrapper = styled.div`
  margin: 2%;
  width: 50vw;
  height: 80vh;
`;

export const GraphWrapper = styled.div``;

export const IsometricToggle = styled.div`
  position: absolute;
  z-index: 300;
  width: ${({ isIsometric }) => (isIsometric ? "2vw" : "0")};
  height: 2vw;

  right: ${({ openIsometric }) => (openIsometric ? "50vw" : "0")};
  top : ${({ openIsometric }) => (openIsometric ? "1vh" : "46vh")};
  border-radius: 0.5em;
  transition: all ease 0.6s;

  background-image: url("/icon/double_arrow.svg");
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
  transform: rotate(${({ openIsometric }) => (openIsometric ? "180deg" : "0")});

  cursor: pointer;

  &:hover {
    background-color: #a9a9a9;
    box-shadow: 1px 1px 1px 0 #777777;
  }
`;
