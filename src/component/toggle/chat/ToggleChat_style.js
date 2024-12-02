import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  position: ${({ isOpen }) => (isOpen ? "fixed" : "absolute")};
  width: ${({ sizeFull }) => (sizeFull ? "100%" : "46.3vw")};
  height: auto;
  top: ${({ isOpen }) => (isOpen ? "9vh" : "0")};
  left: ${({ isOpen, sizeFull }) =>
    sizeFull ? "0" : isOpen ? "5.8vw" : "0.8vw"};
`;

export const ChatBox = styled.div`
  z-index: 201;
  position: relative;
  background-color: #cccccc;
  margin-top: ${({ isOpen }) => (isOpen ? "1vh" : "1.5vh")};
  border-radius: ${({ isOpen }) => (isOpen ? "2em" : "20em")};
  height: ${({ isOpen }) => (isOpen ? "88vh" : "5vh")};
  overflow: hidden;
  transition: margin-top 0.6s ease,
    ${({ isOpen }) =>
      isOpen
        ? "height 0.6s ease" // Oppen
        : "height 0.6s ease, border-radius 0.3s ease 0.6s"}; // Close
  box-shadow: 1px 1px 3px 1px #999999;
`;

export const ChatInputWrapper = styled.div`
  z-index: 202;
  position: absolute;
  bottom: 0.5vh;
  width: 96%;
  height: 100%;
  max-height: 4vh;
  margin-left: 2%;
  display: flex;
  justify-content: space-between;
`;

export const AiIcon = styled.button`
  z-index: 203;
  background-color: transparent;
  background-image: url("/icon/AI_Icon_Green.svg");
  background-size: contain;
  background-position: center;

  background-repeat: no-repeat;
  width: 3%;

  border: none;
  transition: all ease 0.3s;
`;

export const ChatInput = styled.input`
  z-index: 203;
  font-size: 110%;
  border-radius: ${({ isFull }) => (isFull ? "0" : "10em")};
  height: 100%;
  width: ${({ isFull }) => (isFull ? "90%" : "86%")};
  max-width: 88%;
  border: none;
  overflow: hidden;
  transition: all ease 0.3s;
  padding: ${({ isFull }) => (isFull ? "0" : "0 0 0 2%")};
  background-color: ${({ isOpen }) => (isOpen ? "#D9D9D9" : "transparent")};
  box-shadow: ${({ isOpen }) => (isOpen ? "1px 1px 2px 1px #999999" : "none")};

  &:focus {
    outline: none;
  }
  &::placeholder {
    font-weight: 700;
  }
`;

export const ToggleButton = styled.button`
  z-index: 204;
  display: ${({ sizeFull }) => (sizeFull ? "none" : "block")};
  cursor: pointer;
  background-color: transparent;

  background-image: url("/icon/BottomArrow.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  width: 3%;
  border: none;
  margin-right: 1%;
  transition: all ease 0.3s;
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0")});

  &:hover {
    transform: scale(1.3) rotate(${({ isOpen }) => (isOpen ? "180deg" : "0")});
  }
`;

export const SendButton = styled.button`
  z-index: 204;

  display: ${({ isOpen, sizeFull }) =>
    sizeFull ? "block" : isOpen ? "block" : "none"};
  cursor: pointer;

  background-color: transparent;
  background-image: url("/icon/Send.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  width: 3%;

  border: none;
  transition: all ease 0.3s;

  &:hover {
    transform: scale(1.3);
  }
`;
