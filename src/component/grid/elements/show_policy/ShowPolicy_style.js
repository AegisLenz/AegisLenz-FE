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
  color: #104f55;
  width: 100%;
  height: 8%;
  font-size: 130%;
  padding: 0 0 0 10%;
  margin: 2% 0 1% 0;
  align-items: left;
  align-content: center;
`;

export const ContentArea = styled.div`
  width: 96%;
  height: 98%;

  padding: 0 1%;

  overflow: auto;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.5vw;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 30em;
    background-color: #104f55;
  }
`;
