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
  background-color: white;

  box-shadow: 1px 1px 5px #333;
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

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85%;
`;
