import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  position: relative;
  top: 8vh;
  width: 95vw;
  height: 92vh;

  margin-left: 5vw;
  overflow: hidden;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ContentDiv = styled.div`
  position: absolute;
  width: 55%;
  height: 80%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transition: right ease 0.7s;
  right: ${({ Sign }) => (Sign ? "0%" : "45%")};

  h1 {
    font-size: 3em;
    padding: 3% 10%;
  }
  div {
    width: 50%;
    height: 2px;

    margin-top: -5%;

    background-color: #104f55;

    box-shadow: 1px 1px 3px #444;
  }
  p {
    margin-top: 5%;
    width: 30%;
    text-align: center;
    white-space: pre-wrap;

    /* text-shadow: 1px 1px 5px #444; */
  }
`;
export const CloudIcon = styled.svg`
  width: 30%;
  height: 20%;

  background-image: url("/icon/Cloud.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;
export const LoginForm = styled.div`
  position: absolute;

  width: 45%;
  height: 100%;

  right: ${({ Sign }) => (Sign ? "-100%" : 0)};

  transition: all ease 0.7s;
`;
export const SignInForm = styled.div`
  position: absolute;

  width: 45%;
  height: 100%;

  right: ${({ Sign }) => (Sign ? "55%" : "100%")};

  transition: all ease 0.7s;
`;
