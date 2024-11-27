import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
`;

export const IndexWrapper = styled.div`
  height: 100%;
  width: 20%;

  box-shadow: 0px 0px 3px #333;
  display: flex;
  flex-direction: column;

  background-color: #c7c7c7;

  overflow-x: hidden;
  overflow-y: auto;
`;
export const IndexHead = styled.div`
  height: 5%;
  width: 100%;

  padding-bottom: 5%;
  border-bottom: solid 1px #121212;

  background-color: #e4e4e4;

  h1 {
    margin-left: 5%;
    font-size: 1.5em;
  }
`;
export const IndexBubble = styled.div`
  height: auto;
  width: 100%;
  padding: 1% 1% 0 1%;
  border-bottom: solid 1px #121212;

  transition: all ease 0.3s;
  &:hover {
    cursor: pointer;
    background-color: #aaa;
  }
`;
export const IndexDate = styled.h5`
  padding: 0;
  margin: 0;
  font-weight: 300;
`;
export const IndexTitle = styled.h3`
  padding: 0.5%;
  font-weight: 600;
`;

export const ContetnWrapper = styled.div`
  width: 80%;
  height: 100%;
  box-shadow: 0px 0px 3px #333;
`;
