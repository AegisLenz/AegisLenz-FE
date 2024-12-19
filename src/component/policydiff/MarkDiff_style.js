import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  z-index: 200;

  top: 8vh;
  left: 5vw;
  width: 95vw;
  height: 91vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h2`
  color: #104f55;
  width: 100%;
  height: 3%;
  font-size: 130%;
  padding: 0 0 0 3%;
  margin: 1% 0 0 0;

  align-items: left;
  align-content: center;
`;
export const Wrapper2 = styled.div`
  width: 100%;
  height: 97%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const IndexWrapper = styled.div`
  width: 25%;
  height: 94%;

  margin: 1%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IndexArea = styled.div`
  width: 49.5%;
  height: 100%;
`;
export const IndexArea2 = styled.div`
  width: 100%;
  height: 88%;
  box-shadow: 0px 0px 5px #999;
  border-radius: 0.5em;

  padding-top: 2%;
  background-color: white;

  overflow: auto;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.5vw;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 30em;
    background-color: #104f55;
  }
`;
export const IndexArea3 = styled.div`
  width: 100%;
  height: 88%;
  border-radius: 0.5em;

  padding-top: 2%;

  h1 {
    height: 6%;
    width: 100%;
    margin: 0;
    padding: 0 0 3% 0;
    overflow: hidden;

    font-size: 1.5em;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
`;
export const IndexArea4 = styled.div`
  width: 100%;
  height: 42.5%;
  box-shadow: 0px 0px 5px #999;
  border-radius: 0.5em;

  padding-top: 2%;
  background-color: white;

  overflow-y: auto;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.5vw;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 30em;
    background-color: #104f55;
  }
`;
export const IndexAreaTitle = styled.div`
  height: 10%;
  width: 100%;

  padding-bottom: 10%;

  /* background-color: pink;  */

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;

  h1 {
    padding: 0.3vh 0 0 0.2vh;
    margin: 0;
    font-size: 1.8em;
    white-space: pre-line;
    text-align: center;
  }
`;
export const Policy_index = styled.div`
  width: 90%;
  min-height: 3vh;
  background-color: #eee;
  border-bottom: 1px solid #aaa;
  font-size: 0.9em;

  margin-left: 1.5%;

  padding: 0 3%;

  border-radius: 0.5em;

  color: white;
  background-color: #104f55;
  box-shadow: 0px 0px 2px #999;

  margin-bottom: 3%;
  white-space: normal; /* 줄바꿈을 허용 */
  word-wrap: break-word; /* 단어를 강제로 줄바꿈 */
  word-break: break-word; /* 단어가 길 경우 줄바꿈 */
  overflow-wrap: break-word; /* 현대 브라우저 호환성을 위해 사용 */

  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ViLine = styled.div`
  width: 1px;
  height: 50%;
  background-color: #333;

  box-shadow: 0px 0px 3px #444;
`;
export const ContentAreaWrapperWrapper = styled.div`
  position: relative;

  width: 75%;
  height: 97%;
`;

export const ContentAreaTitle = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
  height: 14%;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;

  h1 {
    margin: 0;
  }
`;
export const ContentArea = styled.div`
  width: 98%;
  height: 85.7%;

  margin: 0 1%;
  overflow: auto;

  background-color: white;
  border-radius: 0.5em;

  box-shadow: 0px 0px 5px #999;

  table {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.5vw;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 30em;
    background-color: #104f55;
  }
`;
