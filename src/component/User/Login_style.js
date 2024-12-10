import styled, { keyframes } from "styled-components";

export const From = styled.div`
  width: 100%;
  height: 100%;

  background-color: #104f55;

  box-shadow: -1px 0px 5px #333;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Title = styled.h1`
  color: white;
  margin-bottom: 10%;
`;
export const InputWrapper = styled.div`
  width: 80%;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Input = styled.div`
  width: 70%;
  height: 4vh;
  display: flex;
  justify-content: center;
  flex-direction: column;

  margin-bottom: 8%;
`;
export const HalfInput = styled.div`
  width: 48%;
  height: 4vh;
  display: flex;
  justify-content: center;
  flex-direction: column;

  margin-bottom: 8%;
`;
export const HalfInputWrapper = styled.div`
  width: 70%;
  height: 4vh;
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  margin-bottom: 8%;
`;
export const Label = styled.label`
  position: absolute;

  padding: 0;
  margin: 0%;

  color: #eee;
  opacity: 0.6;
  transition: all ease 0.3s;
`;

// 흔들리는 애니메이션 정의
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
`;

export const InputTag = styled.input`
  padding: 0 2%;
  margin: 0;
  border: 0;
  outline: 0;
  width: 96%;
  height: 100%;

  font-size: 1em;
  background-color: transparent;
  color: ${({ equal }) => (equal ? "white" : "red")};

  &:focus + label,
  &:valid + label {
    opacity: 1;
    transform: translate(0, -120%);
  }
  &.error {
    animation: ${shake} 0.3s ease-in-out;
    color: red;
  }
`;
export const UnderLine = styled.div`
  width: 100%;
  height: 2px;

  margin-top: -2%;

  background-color: white;

  box-shadow: 0 2px 3px #999;
`;
export const ForgetDiv = styled.div`
  width: 56%;
  height: 3%;

  margin-top: -5%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  p {
    color: white;
    font-size: 0.8em;
  }
  p:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
export const Button = styled.button`
  width: 40%;
  height: 3%;

  border-radius: 30em;
  border: 0;

  background-color: #689d8c;
  box-shadow: 1px 1px 5px #333;

  font-weight: 500;
  font-size: 1em;
  color: white;

  padding: 0;

  margin-top: 10%;

  transition: all ease 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;
export const DontHave = styled.p`
  margin-top: 2%;
  color: white;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
