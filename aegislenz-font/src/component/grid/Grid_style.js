import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 100;
  position: relative;
  display: flex;
  left: 5vw;
  top: 10vh;
  width: 95vw;
  height: auto;
  min-height: 90vh;
  background-color: #e4e4e4;
  margin: 0;
  flex-direction: row;
`;

export const Ldiv = styled.div`
  min-height: 90vh;
  width: 46.3vw;
  margin: 0 0 0 0.8vw;
  display: flex;
  flex-direction: column;
`;
export const Rdiv = styled.div`
  min-height: 90vh;
  width: 46.3vw;
  margin: 0 0 0 0.8vw;
  background-color: pink;
  display: flex;
  flex-direction: column;
`;

export const Rdiv_scroll = styled.div`
  height: 90vh;
  width: 46.3vw;
  margin: 0 0 0 0.8vw;
  background-color: purple;
  overflow-y: scroll;
`;

export const ChatAreaDiv = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ chatToggleOpen }) => (chatToggleOpen ? "84vh" : "5vh")};
  margin: ${({ chatToggleOpen }) =>
    chatToggleOpen ? "1vh 0 1% 0" : "3vh 0 1% 0"};
  background-color: aqua;
`;

//(예정)왼쪽에서 아래로 밀리면 오른쪽 위에서 튀어나오고 밀어내기 효과
export const BasicItenDiv = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  margin: 1% 0 1% 0;
  /* height: auto; */
  background-color: skyblue;
`;
