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
  margin: 1% 0 1% 0;
  align-items: left;
  align-content: center;
`;
export const BarContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
`;
export const ScoreBar = styled.div`
  position: absolute;
  right: 5%;
  top: 20%;
  display: flex;
  width: 75%;
  height: 30%;
  flex-direction: row;
  &::before {
    content: "100";
    display: block;
    position: absolute;
    transform: translate(0, -100%);
    color: #104f55;
    font-size: 80%;
  }
  &::after {
    content: "0";
    display: block;
    position: absolute;
    right: 1%;
    transform: translate(0, -100%);
    color: #ff758f;
    font-size: 80%;
  }
`;
export const ColorBlock = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
`;
export const Score = styled.div`
  position: absolute;
  left: 5%;
  bottom: 15%;
  font-size: 100%;
`;
export const MarkBar = styled.div`
  position: absolute;
  left: 5%;
  width: ${(props) => `${props.MarkPosition}%`};
  height: 5%;
  background-color: ${(props) => `${props.background_color}`};
  bottom: 10%;
`;

export const Mark = styled.div`
  position: absolute;
  width: 1%;
  height: 15%;
  background-color: ${(props) => `${props.background_color}`};
  border-top-right-radius: 100%;
  bottom: 10%;
  left: ${(props) => `${props.MarkPosition}%`};
  transition: all ease 0.3s;
`;
