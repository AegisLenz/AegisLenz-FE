import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  background-color: white;
  flex-direction: column;
  border-radius: 1em;
  box-shadow: 1px 1px 5px #333;

  overflow-y: auto;
`;

export const Title = styled.h2`
  position: absolute;
  top: 0;
  color: #104f55;
  width: 97%;
  height: 6vh;
  left: 0;
  font-size: 130%;
  padding-left: 3%;
  margin: 0;
  align-items: left;
  align-content: center;
`;
export const ContentWrapper = styled.div`
  position: absolute;
  top: 6vh;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const IndexWrapper = styled.div`
  width: 95%;
  height: 13vh;

  border-top: 1px solid #333;
  margin-left: 3%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

export const CountWrapper = styled.div`
  position: relative;
  width: 8vw;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;

  /* background-color: #104f55; */

  h1 {
    width: 2vw;
    color: black;
    padding: 0;
    text-align: center;
  }
  p {
    width: calc(6vw - 20%);
    color: black;

    padding: 0 10%;
    margin: 0;

    border-right: 1px solid #333;
    border-left: 1px solid #333;

    word-wrap: break-word; /* 긴 단어를 줄바꿈 */
    word-break: break-word; /* 단어 단위 줄바꿈 */
    white-space: normal; /* 텍스트가 넘칠 경우 줄바꿈 */
  }
`;
export const Index = styled.div`
  width: 7vw;
  min-height: 100%;
  overflow-y: auto;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
export const Label = styled.div`
  display: inline-block;
  padding: 5px 10px;
  margin: 3px;
  border-radius: 4px;
  color: white;
  background-color: ${({ color }) => color || "#104f55"};
  font-size: 0.9em;
  text-align: center;
`;
