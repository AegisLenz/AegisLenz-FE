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
  width: 100%;
  height: 20%;
  left: 0;
  font-size: 130%;
  padding: 0 3% 0 3%;
  margin: 0 0 1% 0;
  align-items: left;
  align-content: center;
`;
export const ContentArea = styled.div`
  position: absolute;
  height: 80%;
  width: 100%;
  top: 20%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
`;

export const Content = styled.div`
  margin: 2% 0 2% 20%;
  white-space: pre-wrap;
  word-wrap: break-word;
  height: ${({ NeedCheckStatus }) => (NeedCheckStatus ? "auto" : "100%")};
  width: 70%;
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
  background-color: #104f55;
  padding: 15% 2% 15% 2%;
  color: white;
  font-size: 90%;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;

  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 3vw;
    height: 3vh;
    background-color: #ff9900;
    border-radius: 0.5em;
    transform: translate(-130%, -150%);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  }
`;
