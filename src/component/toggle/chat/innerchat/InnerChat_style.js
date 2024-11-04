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
  top: ${({ isFull }) => (isFull ? "-79vh" : "0")};
  position: absolute;
  height: ${({ isOpen, isFull }) => (isFull ? "80vh" : isOpen ? "83vh" : "0")};
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

export const InnerWrapper = styled.div`
  width: 90%;
  min-height: 100%;
  display: flex;
  padding: 0 5% 0 5%;
  justify-content: flex-end;
  flex-direction: column;
`;

export const MessageBubble = styled.div`
  z-index: 204;

  opacity: ${({ isOpen, isFull }) => (isOpen || isFull ? "1" : "0")};
  background-color: ${({ isUser }) => (isUser ? "#f0f0f0" : "#104F55")};
  border-radius: ${({ isUser }) =>
    isUser ? "0.5em 0 0.5em 0.5em" : "0 0.5em 0.5em 0.5em"};
  position: relative;

  margin-bottom: 3%;
  margin-top: ${({ isFirst }) => (isFirst ? "2.5vw" : "0")};
  padding: 0.5%;

  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};

  max-width: 60%;

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
    right: -1vw;
    top: -4vh;
    width: 2vw;
    height: 2vw;
  }`
      : `  &::before {
    content: "";
    background-image: url("/icon/AI_Icon_Green.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

    position: absolute;
    display: block;
    left: -1vw;
    top: -4vh;
    width: 2vw;
    height: 2vw;
  }`};
`;

export const ExampleArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const Example = styled.div`
  width: 90%;
  height: 20%;

  display: flex;
  white-space: pre-wrap;
  word-wrap: break-word;
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
