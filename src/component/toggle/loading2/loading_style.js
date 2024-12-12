import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingContainer = styled.div`
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: none;
`;

export const Spinner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;

  div {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transform: translate(80px, 80px) scale(1);
    background: #104f55;
    animation: spin 2.78s infinite cubic-bezier(0, 0.5, 0.5, 1);
  }

  div:nth-child(1) {
    background: #9ec5ab;
    transform: translate(148px, 80px) scale(1);
    animation: disappear 0.69s infinite cubic-bezier(0, 0.5, 0.5, 1),
      colorChange 2.78s infinite step-start;
  }

  div:nth-child(2) {
    animation-delay: -0.69s;
    background: #104f55;
  }

  div:nth-child(3) {
    animation-delay: -1.39s;
    background: #9ec5ab;
  }

  div:nth-child(4) {
    animation-delay: -2.08s;
    background: #2d3c7d;
  }

  div:nth-child(5) {
    animation-delay: -2.78s;
    background: #cd62b0;
  }

  @keyframes spin {
    0% {
      transform: translate(12px, 80px) scale(0);
    }
    25% {
      transform: translate(12px, 80px) scale(0);
    }
    50% {
      transform: translate(12px, 80px) scale(1);
    }
    75% {
      transform: translate(80px, 80px) scale(1);
    }
    100% {
      transform: translate(148px, 80px) scale(1);
    }
  }

  @keyframes disappear {
    0% {
      transform: translate(148px, 80px) scale(1);
    }
    100% {
      transform: translate(148px, 80px) scale(0);
    }
  }

  @keyframes colorChange {
    0% {
      background: #104f55;
    }
    25% {
      background: #cd62b0;
    }
    50% {
      background: #2d3c7d;
    }
    75% {
      background: #9ec5ab;
    }
    100% {
      background: #104f55;
    }
  }
`;
