import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  z-index: 300;
  width: 5vw;
  height: auto;
  bottom: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "Edit Dashboard";
    width: 5vw;
    transform: translateY(-100%);
    text-align: center;
    position: absolute;
    color: white;
    font-weight: 600;
    font-size: 80%;
  }
`;

export const Toggle = styled.div`
  position: relative;
  height: 3vh;
  width: 4vw;
  background-color: #9ec5ab;
  border-radius: 5em;
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    position: absolute;
    content: "";
    border-radius: 50%;
    width: 2.6vh;
    height: 2.6vh;
    background-color: #50735d;
    border: solid #689d8c 1px;
    transition: all ease 0.3s;
    transform: ${({ isEditOn }) =>
      isEditOn ? "translateX(1.1vw);" : "translateX(-1.1vw);"};
  }
`;
