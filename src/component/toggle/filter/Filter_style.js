import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  position: absolute;
  width: 46.3vw;
  height: auto;
  top: ${({ isOpen }) => (isOpen ? "3vh" : "9vh")};
  left: ${({ isOpen }) => (isOpen ? "47.9vw" : "0.8vw")};
  transition: all ease 0.6s;
`;

export const FilterBox = styled.div`
  z-index: 201;
  background-color: #cccccc;
  border-radius: 1em;
  height: 15vh;
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

export const Icon = styled.img`
  z-index: 202;
  position: absolute;
  top: 0.5vh;
  width: 7%;
  left: 2%;
  height: 4vh;
  background-size: contain;
  background-position: center;
`;

export const FilterInputWrapper = styled.div`
  z-index: 202;
  position: absolute;
  top: 0.5vh;
  width: 89%;
  height: 4vh;
  margin-left: 7%;
  display: flex;
  justify-content: center;
`;

export const FilterInput = styled.input`
  z-index: 203;
  font-size: 110%;
  border-radius: 10em;
  height: 100%;
  width: 100%;
  border: none;
  padding: 0 0 0 2%;
  transition: all ease 0.3s;
  background-color: transparent;
  box-shadow: none;
  outline: none;
  &:focus {
    background-color: #d9d9d9;
    box-shadow: 1px 1px 2px 1px #999999;
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
  width: 1.5vw;
  height: 100%;
  border: none;
  right: 5%;
  transition: all ease 0.3s;
  background-size: contain;
  background-position: center;
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0")});
`;
