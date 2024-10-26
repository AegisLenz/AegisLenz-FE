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

export const Title = styled.h1`
  position: absolute;
  top: 0;
  color: #104f55;
  height: 15%;
  font-size: 130%;
  margin: 0% 0 1% 0;
  align-items: center;
  align-content: center;
`;

export const ContentArea = styled.div`
  position: absolute;
  bottom: 0;
  height: 85%;
  width: 100%;
  display: flex;
  justify-content: left;
`;

export const Content = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const SubTitle = styled.h3`
  color: #104f55;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  bottom: 0;
`;
