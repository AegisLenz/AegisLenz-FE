import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;

  margin: 0 0.5%;

  width: 99%;
  height: ${({ isOpen }) => (isOpen ? "99%" : "80%")};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChatBox = styled.div`
  z-index: 201;
  position: relative;
  border-radius: 2em;

  height: 99%;
  width: 100%;

  overflow: hidden;
  transition: margin-top 0.6s ease,
    ${({ isOpen }) =>
      isOpen
        ? "height 0.6s ease" // Oppen
        : "height 0.6s ease, border-radius 0.3s ease 0.6s"}; // Close

  background-color: #cccccc;
  box-shadow: 1px 1px 3px #888;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`;

export const ChatInputWrapper = styled.div`
  z-index: 202;

  width: 96%;
  transition: all ease 0.7s;
  height: ${({ isOpen }) => (isOpen ? "4%" : "100%")};

  padding: ${({ isOpen }) => (isOpen ? "1%" : "0")} 2%;

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

export const Input = styled.div`
  z-index: 203;
  height: 100%;
  width: ${({ isFull }) => (isFull ? "90%" : "86%")};
  max-width: 88%;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;
export const ChatInput = styled.input`
  z-index: 203;
  font-size: 110%;

  height: 100%;
  width: 100%;

  border: none;

  padding: ${({ isFull }) => (isFull ? "0" : "0 0 0 2%")};
  background-color: transparent;

  &:focus {
    outline: none;
  }
  &:focus + label,
  &:valid + label {
    opacity: 1;
    transform: translate(0, -120%);
  }
`;
export const InputUnderbar = styled.div`
  width: 100%;
  height: 2px;
  margin-left: ${({ isFull }) => (isFull ? "0" : "1%")};
  transition: all ease 0.3s;
  background-color: ${({ isOpen }) => (isOpen ? "#104f55" : "")};
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
