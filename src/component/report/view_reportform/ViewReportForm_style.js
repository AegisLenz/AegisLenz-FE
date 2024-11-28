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
export const ContentWrapper = styled.div`
  width: 80%;
  height: 100%;
  box-shadow: 0px 0px 3px #333;
`;
export const ContentSelectWrapper = styled.div`
  width: 100%;
  height: 54%;
`;
export const ContentSelectTitle = styled.div`
  margin: 1% 0 0 1%;

  width: 98%;
  height: 10%;
`;
export const ContentSelect = styled.div`
  width: 96%;
  height: 76%;

  padding: 2%;

  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  input {
    margin: 1%;
  }
`;
export const RadioButtonWrapper = styled.label`
  display: flex;
  align-items: center;

  cursor: pointer;

  input {
    margin: 1%;
  }

  &:hover {
    color: #104f55;
  }
`;

export const ContentPromptWrapper = styled.div`
  position: absolute;

  width: 80%;
  height: 40%;

  bottom: 6%;
`;
export const ContentPromptTitle = styled.div`
  margin: 1% 0 1% 1%;

  width: 98%;
  height: 10%;
`;
export const ContentPromptInnerText = styled.textarea`
  margin: 0 1%;

  width: calc(98% - 2em);
  height: calc(79% - 2em);

  background-color: white;

  border-radius: 1em;
  padding: 1em;
  border: none;

  font-size: 1em;
`;
export const SaveButton = styled.button`
  height: 10%;
  width: 98%;
  margin: 1%;

  border: 0;
  border-radius: 1em;

  color: white;
  font-size: 1.1em;
  font-weight: 600;

  background-color: #104f55;
  box-shadow: 1px 1px 3px #333;

  transition: all ease 0.3s;

  &:hover {
    font-size: 1.2em;
    cursor: pointer;
  }
`;
