import styled, { keyframes } from "styled-components";

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
export const Wrapper = styled.div`
  width: 94%;
  padding: 3%;

  background-color: #fff;

  overflow: auto;

  box-shadow: 0px 0px 5px #aaa;

  animation: ${FadeIn} 0.3s ease;
`;

export const SubTitle = styled.h4`
  font-size: 1em;
  margin-bottom: 3%;
  padding: 0;

  p {
    margin-top: 0.2em;
    font-weight: 400;
  }
  ul {
    margin: 0;
  }
  li {
    margin-top: 0.2em;
    font-weight: 400;
  }
`;
