import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  flex-direction: column;
  border-radius: 1em;
`;
export const Title = styled.h2`
  position: absolute;
  top: 0;
  color: #104f55;
  width: 94%;
  height: 6vh;
  font-size: 130%;
  padding: 0 3% 0 3%;
  margin: 0 0 1% 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ContentArea = styled.div`
  position: absolute;
  height: 80%;
  top: 20%;
  overflow-y: scroll;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  cursor: pointer;
`;

export const Content = styled.div`
  margin: 2% 0 2% 20%;
  display: flex;
  align-items: center;
  white-space: pre-wrap;
  word-wrap: break-word;
  height: 90%;
  width: 70%;
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
  background-color: #104f55;
  padding: 5% 2% 5% 2%;
  color: white;
  font-size: 90%;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  transition: all ease 0.6s;

  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 3vw;
    height: 3vh;
    background-color: #ff9900;
    border-radius: 0.5em;
    transform: translate(-130%, -100%);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    transition: all ease 0.6s;
  }
`;
