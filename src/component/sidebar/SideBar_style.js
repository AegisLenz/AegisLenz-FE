import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  position: fixed;
  display: flex;
  width: 5vw;
  height: 92vh;
  background-color: #104f55;
  margin: 0;
  top: 8vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const IconWrapper = styled.div`
  display: flex;
  position: relative;
  top: -30%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  a {
    display: flex;
    margin: 0;
    padding: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;
export const Icon = styled.img`
  margin: 15%;
  width: 40%;
  transition: all ease 0.3s;
  &:hover {
    transform: scale(1.3);
  }
`;
