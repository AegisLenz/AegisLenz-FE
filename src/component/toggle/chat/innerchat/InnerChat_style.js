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
  width: 90%;
  top: ${({ isFull }) => (isFull ? "-83vh" : "0")};
  position: absolute;
  height: ${({ isOpen, isFull }) => (isFull ? "85vh" : isOpen ? "83vh" : "0")};
  padding: 0 5% 2vh 5%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  overflow-y: ${({ isFull, isOpen }) => (isOpen || isFull ? "auto" : "hidden")};
`;

export const MessageBubble = styled.div`
  opacity: ${({ isOpen, isFull }) => (isOpen || isFull ? "1" : "0")};
  position: relative;
  background-color: ${({ isUser }) => (isUser ? "#f0f0f0" : "#104F55")};
  color: ${({ isUser }) => (isUser ? "#121212" : "#ffffff")};
  font-weight: 500;
  padding: 10px;
  border-radius: ${({ isUser }) =>
    isUser ? "0.5em 0 0.5em 0.5em" : "0 0.5em 0.5em 0.5em"};
  margin-bottom: 1%;
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  max-width: 60%;
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
    right:-1vw;
    top:-4vh;
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
    left:-1vw;
    top:-4vh;
    width: 2vw;
    height: 2vw;
  }`};
`;
