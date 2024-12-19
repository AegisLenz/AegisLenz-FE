import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  flex-direction: column;
  border-radius: 1em;
  box-shadow: 1px 1px 5px #333;
`;

export const Title = styled.h2`
  position: absolute;
  top: 0;
  color: #104f55;
  width: 97%;
  height: 6vh;
  left: 0;
  font-size: 130%;
  padding-left: 3%;
  margin: 0;
  align-items: left;
  align-content: center;
`;

export const ContentArea = styled.div`
  position: absolute;
  top: 6vh;
  width: 100%;
  height: calc(98% - 6vh);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubContent = styled.div`
  height: 100%;
  width: 96%;
  background: linear-gradient(to right, #2f878f, #2d3c7d);
  border-radius: 1em;
  font-size: 0.9em;

  overflow-y: auto;
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.5vw;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 30em;
    background-color: #cbd1ff;
  }
`;
