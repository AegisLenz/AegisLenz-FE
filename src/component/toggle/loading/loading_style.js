import styled, { keyframes } from "styled-components";

const SizeUpDown = keyframes`
  0% {
    transform:scale(1);
  }
  60% {
    transform:scale(1.5);
  }
  100%{
    transform:scale(1);
  }
`;

const SizeUpDown2 = keyframes`
  0% {
    transform:scale(1);
  }
  60% {
    transform:scale(2);
  }
  100%{
    transform:scale(1);
  }
`;

export const Wrapper = styled.div`
  width: 1vw;
  height: 1vw;
  border-radius: 100%;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BigBall = styled.div`
  width: 80%;
  height: 80%;
  opacity: 0.5;
  position: absolute;
  border-radius: 50%;

  background-color: white;
  animation: ${SizeUpDown} 1s infinite;
  animation-delay: 0.5s;
`;

export const SmallBall = styled.div`
  width: 50%;
  height: 50%;
  opacity: 0.8;
  border-radius: 50%;
  background-color: white;
  animation: ${SizeUpDown2} 1s infinite;
`;
