import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  flex-direction: column;
  border-radius: 1em;
  background-color: white;

  box-shadow: 1px 1px 5px #333;
`;

export const Title = styled.h1`
  top: 0;
  color: #104f55;
  height: 6vh;
  font-size: 130%;
  margin: 0% 0 1% 0;
  padding: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ContentWrapper = styled.div`
  top: 5vh;
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 90%;
`;
export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 2% 2% 5% 2%;

  width: 65%;
  height: auto;
  overflow-y: auto;
`;
export const Monthly = styled.div`
  width: 35%;
  height: 90%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #104f55;
  box-shadow: 1px 1px 3px #aaa;

  color: white;

  border-radius: 1em;

  h3 {
    text-align: center;
  }
  /* p {
    text-align: center;
  } */
`;
