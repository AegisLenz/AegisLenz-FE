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
  z-index: 202;
  top: 0;
  color: #104f55;
  width: 94%;
  height: 10%;
  left: 0;
  font-size: 130%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContentArea = styled.div`
  width: 96%;
  height: 98%;

  padding: 0 1%;

  overflow: auto;

  table {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
  }

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.5vw;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 30em;
    background-color: #104f55;
  }
`;
