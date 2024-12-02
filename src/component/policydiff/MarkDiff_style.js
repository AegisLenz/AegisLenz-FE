import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  z-index: 200;

  top: 8vh;
  left: 5vw;
  width: 95vw;
  height: 91vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h2`
  color: #104f55;
  width: 100%;
  height: 8%;
  font-size: 130%;
  padding: 0 0 0 10%;
  margin: 2% 0 0 0;

  align-items: left;
  align-content: center;
`;

export const IndexWrapper = styled.div`
  width: 84%;
  height: 30%;

  padding: 1%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IndexArea = styled.div`
  width: 47.5%;
  height: 98%;

  background-color: white;
  border-radius: 1em;

  padding: 1%;

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

export const ContentArea = styled.div`
  position: relative;

  width: 84%;
  height: 68%;

  padding: 1% 0;

  overflow: auto;

  background-color: white;
  border-radius: 1em;

  table {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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

export const Policy_index = styled.div`
  width: 100%;
  height: 15%;
  background-color: #eee;
  border-bottom: 1px solid #aaa;

  margin-bottom: 1%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
