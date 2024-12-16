import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Wrapper = styled.div`
  z-index: 203;
  width: 100%;

  top: ${({ isFull }) => (isFull ? "5%" : "1vw")};
  position: absolute;
  height: ${({ isOpen, isFull }) => (isOpen || isFull ? "82vh" : "0")};
  overflow: hidden;
`;

export const InnerWrapper = styled.div`
  position: absolute;

  width: 90%;
  height: 97%;

  bottom: 0vh;

  border-radius: 1em;
  padding: 5% 5% 0 5%;

  display: flex;
  flex-direction: column;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.5vw;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 30em;
    background-color: #104f55;
  }
`;
export const Bookmark = styled.svg`
  background-image: url("/icon/bookmark.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 60%;

  top: 0;
  right: 100%;

  width: 2vw;
  height: 100%;
  position: absolute;

  transition: all ease 0.3s;
  opacity: ${(props) => (props.isBookmarked ? "1" : "0.2")};
  border-radius: 1em;
  background-color: ${(props) => (props.isBookmarked ? "#ccc" : "")};

  &:hover {
    cursor: pointer;
    opacity: ${(props) => (props.isBookmarked ? "1" : "0.5")};
  }
`;
export const CancleBookMark = styled.svg`
  background-image: url("/icon/cancle.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 60%;

  right: 0;

  width: 2vw;
  height: 2vh;

  opacity: 0.5;

  transition: all ease 0.3s;

  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }
`;
export const MessageBubble = styled.div`
  z-index: 204;

  opacity: ${({ isOpen, isFull }) => (isOpen || isFull ? "1" : "0")};
  background-color: ${({ isUser }) => (isUser ? "#f0f0f0" : "#104F55")};
  border-radius: ${({ isUser }) =>
    isUser ? "0.5em 0 0.5em 0.5em" : "0 0.5em 0.5em 0.5em"};
  position: relative;

  margin-bottom: 4%;
  margin-top: ${({ isFirst }) => (isFirst ? "2.5vw" : "0")};
  padding: 1%;

  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};

  max-width: 60%;
  min-width: ${({ isStart, isBookmark }) =>
    isStart || isBookmark ? "40%" : ""};

  font-weight: 500;
  color: ${({ isUser }) => (isUser ? "#121212" : "#ffffff")};
  white-space: pre-wrap;
  word-wrap: break-word;
  box-shadow: 1px 1px 1px 0 #aaaaaa;

  animation: ${slideUp} 0.3s ease;
  transition: ${({ isOpen }) =>
    isOpen ? "opacity ease 0.6s 0.6s" : "opacity ease 0.6s"};

  ${({ isUser }) =>
    isUser
      ? `  &::after {
    content: "";
    background-image: url("/icon/user_Icon.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

    position: absolute;
    display: block;
    right: -1.5vw;
    top: -2vh;
    width: 1.5vw;
    height: 1.5vw;
  }`
      : `  &::before {
    content: "";
    background-image: url("/icon/AI_Icon_Green.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

    position: absolute;
    display: block;
    left: -1.5vw;
    top: -2vh;
    width: 1.5vw;
    height: 1.5vw;
  }`};
`;

export const ExampleArea = styled.div`
  width: 100%;
  display: flex;
  margin: 3% 0;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  p {
    margin: 3% 0 0 0;
    font-weight: 600;
    padding: 1%;
  }
`;
export const Example = styled.div`
  width: 90%;
  height: 20%;

  position: relative;

  display: flex;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word; // 긴 단어 줄바꿈
  overflow-wrap: break-word; // 긴 단어 줄바꿈
  text-align: center;
  justify-content: center;
  align-items: center;

  margin: 1% 0 0 0;
  padding: 2%;

  box-shadow: 1px 1px 1px 0 #333333;
  background-color: #32746d;

  transition: all ease 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #9ec5ab;
  }
`;
export const QueryWrapper = styled.div`
  z-index: 205;
  width: 92%;
  height: auto;

  transition: all ease 0.3s;

  white-space: pre-wrap;
  word-wrap: break-word;

  padding: 2%;
  margin: 1%;
  margin-bottom: 0;
  color: white;
`;

export const Query = styled.div`
  width: 100%;
  height: ${({ Open }) => (Open ? "auto" : "0")};
  margin-top: 2%;
  padding: ${({ Open }) => (Open ? "2% 1% 2% 1%" : "0")};
  font-size: ${({ Open }) => (Open ? "100%" : "0")};

  transition: all ease 0.3s;
  background-color: #186168;
`;

export const QueryToggleWrapper = styled.div`
  width: 102%;
  height: 2vh;

  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const QueryToggle = styled.svg`
  z-index: 207;

  width: 7%;
  height: 50%;

  background-image: url("/icon/Arrow_fill_in_down.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  transform: ${({ Open }) => (Open ? "rotate(180deg)" : "")};

  transition: all ease 0.3s;

  &:hover {
    cursor: pointer;
  }
`;
