import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  position: ${({ isOpen }) => (isOpen ? "fixed" : "absolute")};
  width: 46.3vw;
  height: auto;
  top: ${({ isOpen }) => (isOpen ? "9vh" : "0")};
  left: ${({ isOpen }) => (isOpen ? "5.8vw" : "0.8vw")};
`;

export const ChatBox = styled.div`
  z-index: 201;
  background-color: #cccccc;
  margin-top: ${({ isOpen }) => (isOpen ? "1vh" : "3vh")};
  border-radius: ${({ isOpen }) => (isOpen ? "2em" : "20em")};
  height: ${({ isOpen }) => (isOpen ? "88vh" : "5vh")};
  overflow: hidden;
  transition: margin-top 0.6s ease,
    ${({ isOpen }) =>
      isOpen
        ? "height 0.6s ease" // Oppen
        : "height 0.6s ease, border-radius 0.3s ease 0.6s"}; // Close
  display: flex;
  justify-content: center;
  box-shadow: 1px 1px 3px 1px #999999;
`;

export const AI_Icon = styled.img`
  z-index: 202;
  position: absolute;
  bottom: 0.5vh;
  width: 7%;
  left: 2%;
  height: 4vh;
  background-size: contain;
  background-position: center;
`;

export const ChatInputWrapper = styled.div`
  z-index: 202;
  position: absolute;
  bottom: 0.5vh;
  width: 89%;
  height: 4vh;
  margin-left: 7%;
  display: flex;
  justify-content: center;
`;

export const ChatInput = styled.input`
  z-index: 203;
  font-size: 110%;
  border-radius: 10em;
  height: 100%;
  width: 100%;
  border: none;
  padding: 0 0 0 2%;
  transition: all ease 0.3s;
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
  cursor: pointer;
  background-color: transparent;
  position: absolute;
  background-image: url("/icon/BottomArrow.svg");
  background-repeat: no-repeat;
  width: 3%;
  height: 100%;
  border: none;
  right: 5%;
  transition: all ease 0.3s;
  background-size: contain;
  background-position: center;
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0")});
`;
