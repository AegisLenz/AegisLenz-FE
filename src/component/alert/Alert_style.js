import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

export const FixedWrapper = styled.div`
  z-index: 1000;
  position: fixed;

  width: 20vw;
  height: 100vh;
  right: ${(props) => (props.isHovered ? "0" : "-20vw")};
  transition: right 0.3s ease;

  box-shadow: 1px 0 5px #333;

  background-color: #eee;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
export const AlertIconWrapper = styled.div`
  position: absolute;

  border-radius: 1.5em 0 0 1.5em;

  left: -7vw;
  top: 1vh;
  width: 7vw;
  height: 6vh;

  background: linear-gradient(to right, #680000, #e93d42);
`;
export const AlertIcon = styled.svg`
  height: 100%;
  width: 3vw;

  background-image: url("/icon/alert1.svg");
  background-repeat: no-repeat;
  background-position: center;

  animation: heartbeat 0.7s infinite ease-in-out;

  @keyframes heartbeat {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
`;
export const AlertBubble = styled.div`
  width: 87%;
  position: relative;

  border-radius: 1em;
  margin-top: 1vh;
  padding: 0.5vw;

  color: white;
  box-shadow: 1px 1px 3px #aaa;
  background: linear-gradient(to right, #e93d42, #680000);

  animation: ${(props) => (props.isRemoving ? fadeOut : fadeIn)} 0.3s ease
    forwards;

  overflow: visible;

  h3 {
    font-size: 1em;
  }
`;
export const CancleToggle = styled.svg`
  position: absolute;

  right: 1vw;
  width: 2vw;
  height: 2vh;

  background-image: url("/icon/cancle.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70%;
  &:hover {
    cursor: pointer;
  }
`;
