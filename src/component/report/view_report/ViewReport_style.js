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
export const ContetnsDate = styled.h5`
  padding: 0;
  margin: 0;
  font-weight: 300;
`;
export const ContentsTitle = styled.h3`
  padding: 0.5%;
  font-weight: 600;
`;

export const ReportWrapper = styled.div`
  position: relative;
  width: 80%;
  height: 100%;

  overflow: auto;

  box-shadow: 0px 0px 3px #333;

  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const Report = styled.div`
  width: 39vw;
  height: 44.499vw;
  margin: 2%;

  background-color: white;
  box-shadow: 1px 1px 10px #333;
  overflow: hidden; /* 넘치는 내용 숨김 */
  padding: 0.5vw;

  /* 애니메이션 추가 */
  transform: translateY(20px);
  animation: fadeIn 0.5s ease forwards;

  @keyframes fadeIn {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const ToolBar = styled.div`
  position: fixed;
  width: 10vw;
  height: auto;
  border-radius: 2em;

  right: 2vw;
  top: 10vh;

  background-color: #c7c7c7;
  box-shadow: 1px 1px 5px #333;

  overflow: hidden;

  transition: all ease-out 0.5s;
`;
export const SvgContainer = styled.div`
  width: 100%;
  height: 5vh;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const DownTool = styled.svg`
  height: 100%;
  width: 40%;

  border-radius: 1em;

  background-image: url("/icon/download.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;

  transition: all ease 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
export const RefreshTool = styled.svg`
  height: 100%;
  width: 40%;

  border-radius: 1em;

  background-image: url("/icon/Refresh.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;

  transition: all ease 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const RefreshIndexWrapper = styled.div`
  width: 100%;
  max-height: ${({ isOpen }) => (isOpen ? "84vh" : 0)};

  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;

  transition: max-height ease-out 1.3s, padding-bottom ease 0.3s 0.3s;

  padding-bottom: ${({ isOpen }) => (isOpen ? "2vh" : 0)};

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.5vw;
    height: 0.9vh;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 30em;
    background-color: #104f55;
  }
`;
export const RefreshIndex = styled.div`
  width: 94%;
  min-height: 5vh;
  height: 5vh;

  padding: 1% 3% 1% 3%;

  border-top: solid 1px #121212;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: all ease 0.3s;

  &:hover {
    cursor: pointer;
    background-color: #aaa;
  }
`;
