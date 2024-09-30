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
    transform: translateY(-100%);
    text-align: center;
    position: absolute;
    color: white;
    font-weight: 600;
    font-size: 90%;
  }
`;

export const Toggle = styled.div`
  position: relative;
  height: 3vh;
  width: 4vw;
  background-color: #9ec5ab;
  border-radius: 5em;

  &::after {
    position: absolute;
    content: "";
    border-radius: 50%;
    width: 1.4vw;
    height: 1.4vw;
    margin: 0.15vh 0.1vw 0.35vh 0.1vw;
    background-color: #50735d;
    border: solid #689d8c 1px;
    transition: all ease 0.3s;
    transform: ${({ isEditOn }) => (isEditOn ? "translateX(2.1vw);" : "")};
  }
`;
